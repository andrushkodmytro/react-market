import { useEffect, useState, useContext, useMemo, useRef } from 'react';
import Filters from './components//Filters';
import ProductCard from './components/ProductCard';
import { CartContext } from '../../contexts/cartContext';
import services from 'api/services';
import Pagination from 'components/ui/Pagination';
import './styles.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('asc');
  const [category, setCategory] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [total, setTotal] = useState(0);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      setIsProductLoading(true);

      try {
        services
          .get('/products', { page, limit })
          .then(function ({ data }) {
            console.log(JSON.parse(data));

            if (data) {
              const resData = JSON.parse(data);
              setProducts(resData.data);

              setTotal(resData.totalPages);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
      } finally {
        setIsProductLoading(false);
      }
    }

    mounted.current = true;
  }, [page, limit]);

  // useEffect(() => {
  //   if (category) {
  //     const url = `https://fakestoreapi.com/products/category/${category}`;

  //     axios
  //       .get(url)
  //       .then(function ({ data }) {
  //         if (data) {
  //           // setProducts(data);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }, [category]);

  const onPageChange = (e) => {
    setPage(+e.target.dataset.page);
  };

  const onLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const memoizedProducts = useMemo(() => {
    return products.map((item) => {
      const isOnCart = !!(cart.products || []).find((item2) => item2.productId === item.id);
      return { ...item, isOnCart };
    });
  }, [products, cart]);

  return (
    <>
      <Filters sort={sort} setSort={setSort} category={category} setCategory={setCategory} />

      {isProductLoading ? (
        <h3 style={{ textAlign: 'center' }}>Loading ...</h3>
      ) : (
        <div className='product-list'>
          {memoizedProducts.map((product) => {
            return <ProductCard key={product._id} {...product} isOnCart={product.isOnCart} addToCart={addToCart} />;
          })}
        </div>
      )}
      <Pagination page={page} limit={limit} total={total} onPageChange={onPageChange} onLimitChange={onLimitChange} />
    </>
  );
};

export default Products;

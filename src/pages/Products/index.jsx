import { useEffect, useState, useContext, useMemo, useRef } from 'react';
import Filters from './components//Filters';
import ProductCard from './components/ProductCard';
import { CartContext } from '../../contexts/cartContext';
import services from 'api/services';
import Pagination from 'components/ui/Pagination';
import Loader from 'components/ui/Loader';
import './styles.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('asc');
  const [category, setCategory] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(0);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const mounted = useRef(false);

  const getProducts = async () => {
    try {
      setIsProductLoading(true);
      const { data } = await services.get('/products', { page, limit });

      if (data) {
        const resData = data;
        setProducts(resData.data);

        setTotal(resData.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProductLoading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) {
      getProducts();
    }

    mounted.current = true;
  }, [page, limit]);

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
    <div className='inner-container'>
      <Filters sort={sort} setSort={setSort} category={category} setCategory={setCategory} />

      <div className='product-list'>
        {isProductLoading && <Loader />}
        {memoizedProducts.map((product) => {
          return <ProductCard key={product._id} {...product} isOnCart={product.isOnCart} addToCart={addToCart} />;
        })}
      </div>

      <Pagination page={page} limit={limit} total={total} onPageChange={onPageChange} onLimitChange={onLimitChange} />
    </div>
  );
};

export default Products;

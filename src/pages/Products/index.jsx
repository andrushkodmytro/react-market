import { useEffect, useState, useContext, useMemo, useRef } from 'react';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import { CartContext } from '../../contexts/cartContext';
import services from 'api/services';
import Pagination from 'components/ui/Pagination';
import Loader from 'components/ui/Loader';
import Skeleton from 'components/ui/Skeleton';
import './styles.scss';

export const sortOptions = [
  { label: 'Asc', value: 'asc' },
  { label: 'Desc', value: 'desc' },
];
export const categoryOptions = [{ label: 'Jewelry', value: 'jewelry' }];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const { cart, addToCart } = useContext(CartContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(0);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const mounted = useRef(false);

  const getProducts = async () => {
    try {
      setIsProductLoading(true);
      const { data } = await services.get('/products', { page, limit, sortBy: 'name', orderBy: sort?.value });

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

  // useEffect(() => {
  //   if (mounted.current) {
  //     if(page ===1){
  //       getProducts();
  //     } else {
  //       setPage(1)
  //     }
  //   }

  //   mounted.current = true;
  // }, [sort]);

  const onPageChange = (e) => {
    setPage(+e.target.dataset.page);
  };

  const onLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const onSortChange = (selected) => {
    setSort(selected);
  };

  const onCategoryChange = (selected) => {
    setCategory(selected);
  };

  const memoizedProducts = useMemo(() => {
    return products.map((item) => {
      const isOnCart = !!(cart.products || []).find((item2) => item2.productId._id === item._id);
      return { ...item, isOnCart };
    });
  }, [products, cart]);

  return (
    <div className='inner-container'>
      <Filters
        sort={sort}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
        category={category}
        categoryOptions={categoryOptions}
        onCategoryChange={onCategoryChange}
      />

      <div className='product-list'>
        {isProductLoading && (
          <>
            {Array.of(1, 2, 3, 4).map((item) => (
              <Skeleton style={{ height: '415px' }} />
            ))}
          </>
        )}
        {memoizedProducts.map((product) => {
          return <ProductCard key={product._id} {...product} isOnCart={product.isOnCart} addToCart={addToCart} />;
        })}
      </div>

      <Pagination page={page} limit={limit} total={total} onPageChange={onPageChange} onLimitChange={onLimitChange} />
    </div>
  );
};

export default Products;

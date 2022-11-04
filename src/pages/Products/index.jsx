import { useEffect, useState, useContext, useMemo } from 'react';
import Filters from './components//Filters';
import ProductCard from './components/ProductCard';
import { CartContext } from '../../contexts/cartContext';
import axios from 'axios';
import './styles.scss';

const REACT_APP_API_URL = 'http://localhost:8081/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('asc');
  const [category, setCategory] = useState(null);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/products`)
      .then(function ({ data }) {
        console.log(data);
        // if (data) {
        //   setProducts(data);
        // }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const url = `https://fakestoreapi.com/products?sort=${sort}`;

    axios
      .get(url)
      .then(function ({ data }) {
        if (data) {
          setProducts(data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [sort]);

  useEffect(() => {
    if (category) {
      const url = `https://fakestoreapi.com/products/category/${category}`;

      axios
        .get(url)
        .then(function ({ data }) {
          if (data) {
            setProducts(data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [category]);

  const memoizedProducts = useMemo(() => {
    return products.map((item) => {
      const isOnCart = !!(cart.products || []).find((item2) => item2.productId === item.id);
      return { ...item, isOnCart };
    });
  }, [products, cart]);

  return (
    <>
      <Filters sort={sort} setSort={setSort} category={category} setCategory={setCategory} />
      <div className='product-list'>
        {memoizedProducts.map((product) => {
          return <ProductCard key={product.id} {...product} isOnCart={product.isOnCart} addToCart={addToCart} />;
        })}
      </div>
    </>
  );
};

export default Products;

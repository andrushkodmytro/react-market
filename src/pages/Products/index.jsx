import { useEffect, useState } from 'react';
import Filters from './components//Filters';
import ProductCard from './components/ProductCard';
import axios from 'axios';
import './styles.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('asc');
  const [category, setCategory] = useState(null);

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

  return (
    <>
      <Filters sort={sort} setSort={setSort} category={category} setCategory={setCategory} />
      <div className='product-list'>
        {products.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </>
  );
};

export default Products;

import { useEffect } from 'react';
import ProductCard from './components/ProductCard';
import axios from 'axios';
import { allProducts } from './utils';
import './styles.scss';

const Products = () => {
  // useEffect(() => {
  //   axios
  //     .get('https://fakestoreapi.com/products')
  //     .then(function (response) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className='product-list'>
      {allProducts.map((product) => {
        return <ProductCard {...product} />;
      })}
    </div>
  );
};

export default Products;

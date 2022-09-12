import { useEffect, useState } from 'react';
import axios from 'axios';
import { productData as initProductData } from './utils';
import './styles.scss';

const ProductDetails = () => {
  const [productData, setProductData] = useState(initProductData);
  // useEffect(() => {
  //   axios
  //     .get('https://fakestoreapi.com/products/1')
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
    <div className='product-details'>
      <div className='product-details-img-container'>
        <img src={productData.image} alt='Product' />
      </div>
      <h3>{productData.title}</h3>
      <p>{productData.description}</p>
    </div>
  );
};

export default ProductDetails;

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
      <div className='product-details-content'>
        <h3 className='product-details-title'>{productData.title}</h3>
        <p className='product-details-description'> {productData.description}</p>
        <p className='product-details-price'>{productData.price}$</p>
        <p>
          {productData.rating.rate} <span>{productData.rating.count}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

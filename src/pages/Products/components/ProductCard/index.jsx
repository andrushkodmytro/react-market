import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import './styles.scss';

const ProductCard = ({ id, title, description, price, image, rating }) => {
  const addToCartHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Link className='product-card' to={`/products/${id}`}>
      <div className='product-card-img'>
        <img src={image} alt='product' />
      </div>
      <Rating rate={rating.rate} />
      <h3>{title}</h3>

      <p className='product-card-price'> {price}$</p>
      <button className='add-to-cart-btn' onClick={addToCartHandler}>
        Add to cart
      </button>
    </Link>
  );
};

export default ProductCard;

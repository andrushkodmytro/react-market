import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import { ReactComponent as CheckIcon } from 'assets/icons/check-mark.svg';
import './styles.scss';

const ProductCard = ({ id, title, description, price, image, rating, isOnCart, addToCart }) => {
  const addToCartHandler = (e) => {
    e.preventDefault();
    addToCart(id);
  };
  return (
    <Link className='product-card' to={`/products/${id}`}>
      <div className='product-card-img'>
        <img src={image} alt='product' />
      </div>
      <Rating rate={rating.rate} />
      <h3>{title}</h3>

      <p className='product-card-price'> {price}$</p>
      <button className='add-to-cart-btn' onClick={addToCartHandler} disabled={isOnCart}>
        {isOnCart ? <CheckIcon /> : 'Add to cart'}
      </button>
    </Link>
  );
};

export default ProductCard;

import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const ProductCard = ({ id, title, description, price }) => {
  return (
    <Link className='product-card' to={`/products/${id}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{price}</p>
    </Link>
  );
};

export default ProductCard;

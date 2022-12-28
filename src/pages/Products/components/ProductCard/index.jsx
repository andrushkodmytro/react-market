import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import Button from 'components/ui/Button';
import Typography from 'components/ui/Typography';
import { ReactComponent as AddCartIcon } from 'assets/icons/add-cart.svg';
import { ReactComponent as SpinnerIcon } from 'assets/icons/spiner2.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check-mark.svg';
import './styles.scss';

const ProductCard = ({ _id, name, description, price, image, rating = { rate: 12 }, isOnCart, addToCart }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOnCart && isLoading) {
      setIsLoading(false);
    }
  }, [isOnCart, isLoading]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (isOnCart) {
      return;
    }
    addToCart(_id);
  };

  return (
    <Link className='product-card' to={`/products/${_id}`}>
      <div className='product-card-img'>
        <img src={image} alt='product' />
      </div>
      <Rating rate={rating.rate} />
      <h3>{name}</h3>

      <div className='bottom-row'>
        <Typography variant='h5' component='span'>
          {price}$
        </Typography>
        {isOnCart ? (
          <Button color='secondary' onClick={addToCartHandler}>
            <CheckIcon style={{ width: 20, height: 20, fill: '#5285cc' }} />
          </Button>
        ) : (
          <Button
            color='primary'
            onClick={(e) => {
              addToCartHandler(e);
              setIsLoading(true);
            }}
          >
            {isLoading ? (
              <SpinnerIcon style={{ width: 20, height: 20, fill: 'white' }} />
            ) : (
              <AddCartIcon style={{ width: 20, height: 20, fill: 'white' }} />
            )}
          </Button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;

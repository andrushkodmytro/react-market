import React from 'react';
import { ReactComponent as StarIcon } from 'assets/icons/star.svg';
import './styles.scss';

const rateInit = [1, 2, 3, 4, 5];

const Rating = ({ rate }) => {
  // console.log(rate);
  return (
    <div className='rating-container'>
      {rateInit.map((item, index) => (
        <StarIcon key={index} className={rate > item ? 'active' : ''} />
      ))}
    </div>
  );
};

export default Rating;

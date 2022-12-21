import React from 'react';
import './styles.scss';

const Button = ({ className, variant = 'contained', color = 'primary', ...rest }) => {
  return (
    <button
      className={`button ${variant ? variant : ''} ${color ? color : ''} ${className ? className : ''}`}
      {...rest}
    />
  );
};

export default Button;

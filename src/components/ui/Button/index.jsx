import React from 'react';
import './styles.scss';

const Button = ({ className, ...rest }) => {
  return <button className={`button ${className ? className : ''}`} {...rest} />;
};

export default Button;

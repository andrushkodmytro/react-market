import React from 'react';
import './styles.scss';

const IconButton = ({ className, variant = 'contained', color = 'primary', size = 'medium', ...rest }) => {
  return (
    <button
      className={`icon-button ${variant ? variant : ''} ${color ? color : ''} ${className ? className : ''} ${
        size ? size : ''
      }`}
      {...rest}
    />
  );
};

export default IconButton;

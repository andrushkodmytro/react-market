import React from 'react';
import './styles.scss';

const Button = ({ className, children, variant = 'contained', color = 'primary', startIcon: StartIcon, ...rest }) => {
  return (
    <button
      className={`button ${variant ? variant : ''} ${color ? color : ''} ${className ? className : ''}`}
      {...rest}
    >
      {StartIcon && (
        <>
          <span className='start-icon'>
            <StartIcon />
          </span>
        </>
      )}
      {children}
    </button>
  );
};

export default Button;

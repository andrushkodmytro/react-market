import React from 'react';
import './styles.scss';

const Container = ({ children, className, ...rest }) => {
  return (
    <div className={className ? `app-container ${className}` : 'app-container'} {...rest}>
      {children}
    </div>
  );
};

export default Container;

import React from 'react';
import styles from './styles.module.scss';

const Paper = ({ children, className, component = 'div', ...rest }) => {
  const CustomTag = `${component}`;
  return (
    <CustomTag className={`${styles.paper} ${className ? className : ''}`} {...rest}>
      {children}
    </CustomTag>
  );
};

export default Paper;

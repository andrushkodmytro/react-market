import React from 'react';
import './styles.scss';

const Skeleton = ({ className, variant = 'text', component = 'span', ...rest }) => {
  const CustomTag = `${component}`;
  return <CustomTag className={`skeleton ${variant ? variant : ''} ${className ? className : ''}`} {...rest} />;
};

export default Skeleton;

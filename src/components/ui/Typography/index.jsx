import React from 'react';
import './styles.scss';

const Typography = ({ className, variant = 'body1', component = 'p', ...rest }) => {
  const CustomTag = `${component}`;
  return (
    <CustomTag
      className={`typography ${variant ? variant : ''} ${component ? component : ''} ${className ? className : ''}`}
      {...rest}
    />
  );
};

export default Typography;

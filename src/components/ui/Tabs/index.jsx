import React from 'react';
import './styles.scss';

const Tabs = ({ className, children, onChange, ...rest }) => {
  const onChangeHandler = (e) => {
    if (e.target.tagName === 'BUTTON') {
      onChange(+e.target.value);
    }
  };

  return (
    <div className={`tabs  ${className ? className : ''}`} onClick={onChangeHandler} {...rest}>
      {children}
    </div>
  );
};

export default Tabs;

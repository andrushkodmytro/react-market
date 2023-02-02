import React from 'react';
import './styles.scss';

const Tab = ({ className, children, label, current, value, ...rest }) => {
  return (
    <button
      className={`tab ${current === value ? 'tab-selected' : ''} ${className ? className : ''}`}
      value={value}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Tab;

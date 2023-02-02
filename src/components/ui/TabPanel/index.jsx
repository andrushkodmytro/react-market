import React from 'react';
import './styles.scss';

const TabPanel = ({ className, children, value = 0, index, label, ...rest }) => {
  return (
    <div className={`tab-panel ${className ? className : ''}`} {...rest}>
      {value === index ? children : null}
    </div>
  );
};

export default TabPanel;

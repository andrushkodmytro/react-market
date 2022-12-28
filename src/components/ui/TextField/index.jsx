import React from 'react';
import './styles.scss';

const TextField = ({ className, label, children, value, ...rest }) => {
  return (
    <div className={`text-field ${className}`} {...rest}>
      <label className='label'>{label} </label>
      <input
        className={` `}
        value={value}
        //  {...rest}
      />

      {children}
    </div>
  );
};

export default TextField;

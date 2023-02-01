import React from 'react';
import './styles.scss';

const TextField = ({ className, label, children, value, fullWidth, name, ...rest }) => {
  return (
    <div className={`text-field ${className ? className : ''}  ${fullWidth ? 'fullWidth' : ''}`} {...rest}>
      <label className='label'>{label} </label>
      <input
        className={` `}
        value={value}
        name={name}
        //  {...rest}
      />

      {children}
    </div>
  );
};

export default TextField;

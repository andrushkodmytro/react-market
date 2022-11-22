import React from 'react';
import './styles.scss';
import { ReactComponent as SpinnerIcon } from 'assets/icons/spinner.svg';

const Loader = () => {
  return (
    <div className='loader-container'>
      <SpinnerIcon />
    </div>
  );
};

export default Loader;

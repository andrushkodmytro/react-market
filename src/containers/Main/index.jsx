import React from 'react';
import Container from '../Container';
import { Routes, Route } from 'react-router-dom';
import Landing from '../../pages/Landing';
import Products from '../../pages/Products';
import ProductDetails from '../../pages/ProductDetails';
import './styles.scss';

const Main = () => {
  return (
    <div className='app-main'>
      <Container>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/:productId' element={<ProductDetails />}></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default Main;

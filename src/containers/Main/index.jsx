import React from 'react';
import Container from '../Container';
import { Routes, Route } from 'react-router-dom';
import CategoryList from '../../pages/CategoryList';
import Products from '../../pages/Products';
import ProductDetails from '../../pages/ProductDetails';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';

import './styles.scss';

const Main = () => {
  return (
    <div className='app-main'>
      <Container>
        <Routes>
          <Route path='/' element={<CategoryList />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/:productId' element={<ProductDetails />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<SignUp />}></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default Main;

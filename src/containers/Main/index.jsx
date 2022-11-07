import React from 'react';
import Container from '../Container';
import { Routes, Route } from 'react-router-dom';
import CategoryList from '../../pages/CategoryList';
import Products from '../../pages/Products';
import ProductAdd from 'pages/ProductAdd';
import ProductDetails from '../../pages/ProductDetails';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import Account from '../../pages/Account';
import NotFound from '../../pages/NotFound';

import './styles.scss';

const Main = () => {
  return (
    <div className='app-main'>
      <Container>
        <Routes>
          <Route path='/' element={<CategoryList />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/add' element={<ProductAdd />}></Route>
          <Route path='/products/:productId' element={<ProductDetails />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<SignUp />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default Main;

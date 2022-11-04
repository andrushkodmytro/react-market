import React, { useContext, useState } from 'react';
import Container from '../Container';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cartContext';
import CartDialog from './components/CartDialog';
import auth from 'utils/auth';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as CartIcon } from 'assets/icons/cart.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import './styles.scss';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { date, id, products, userId } = cart;

  const [open, setOpen] = useState(false);
  console.log(open);
  const onCloseHandler = () => {
    setOpen(false);
  };

  const onOpenHandler = () => {
    setOpen(true);
  };

  return (
    <div className='app-header'>
      <Container className='app-header-container'>
        <div className='app-header-logo'>
          <LogoIcon />
        </div>
        <ul className='app-nav-menu'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>

          {auth.isAuthenticated() ? (
            <div>
              <LikeIcon />
            </div>
          ) : (
            <div>
              <UserIcon />
            </div>
          )}

          <div className='cart-container' onClick={onOpenHandler}>
            <span>{products?.length}</span>
            <CartIcon />
          </div>
        </ul>

        <CartDialog cart={cart} open={open} onClose={onCloseHandler} />
      </Container>
    </div>
  );
};

export default Header;

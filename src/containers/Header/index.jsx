import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cartContext';
import CartDialog from './components/CartDialog';
import auth from 'utils/auth';
import { UserContext } from 'contexts/userContext';
import Menu from 'components/ui/Menu';
import MenuItem from 'components/ui/MenuItem';
import Button from 'components/ui/Button';
import IconButton from 'components/ui/IconButton';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as CartIcon } from 'assets/icons/cart.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
// import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import './styles.scss';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const { products = [] } = cart;

  const [open, setOpen] = useState(false);

  const [openAccount, setOpenAccount] = useState(false);
  const navigate = useNavigate();

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onOpenHandler = () => {
    setOpen(true);
  };

  const openAccountHandler = () => {
    setOpenAccount((prev) => !prev);
  };

  const onCloseAccountHandler = () => {
    setOpenAccount((prev) => !prev);
  };

  const onAccountHandler = () => {
    navigate('/account');
    setOpenAccount(false);
  };

  const onLogoutHandler = () => {
    auth.removeSession();
    setUser();
    setOpenAccount(false);
  };

  const onLoginHandler = () => {
    navigate('/login');
    setOpenAccount(false);
  };

  const cartTotalCount = products.reduce((acc, curr) => {
    return (acc += curr.quantity);
  }, 0);

  const roles = user?.roles || [];

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

          {roles.includes('admin') && (
            <>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/orders'>Orders</Link>
              </li>
            </>
          )}

          <li>
            <IconButton className='cart-container' size='large' onClick={onOpenHandler}>
              {!!cartTotalCount && <span>{cartTotalCount}</span>}
              <CartIcon style={{}} />
            </IconButton>
          </li>

          <li>
            <div className='user-container'>
              {user ? (
                <>
                  <IconButton size='large' onClick={openAccountHandler}>
                    <UserIcon />
                  </IconButton>
                  <Menu open={openAccount} onClose={onCloseAccountHandler}>
                    <MenuItem onClick={onAccountHandler}>Account</MenuItem>
                    <MenuItem onClick={onLogoutHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <IconButton onClick={openAccountHandler}>
                    <UserIcon styles={{ color: 'white' }} />
                  </IconButton>
                  <Menu open={openAccount} onClose={onCloseAccountHandler}>
                    <MenuItem onClick={onLoginHandler}>Login</MenuItem>
                  </Menu>
                </>
              )}
            </div>
          </li>
        </ul>

        <CartDialog cart={cart} open={open} onClose={onCloseHandler} />
      </Container>
    </div>
  );
};

export default Header;

import React from 'react';
import Container from '../Container';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import './styles.scss';

const Header = () => {
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
          {/* <li>Menu 3</li> */}
        </ul>
      </Container>
    </div>
  );
};

export default Header;

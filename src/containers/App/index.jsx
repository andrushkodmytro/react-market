import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import Main from '../Main';
import Footer from '../Footer';
import { UserProvider } from '../../contexts/userContext';
import { CartProvider } from '../../contexts/cartContext';

import './styles.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <UserProvider>
          <CartProvider>
            <Header />
            <Main />
            <Footer />
          </CartProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

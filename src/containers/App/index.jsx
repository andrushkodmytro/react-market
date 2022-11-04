import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import Main from '../Main';
import Footer from '../Footer';
import { CartProvider } from '../../contexts/cartContext';

import './styles.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <CartProvider>
          <Header />
          <Main />
          <Footer />
        </CartProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

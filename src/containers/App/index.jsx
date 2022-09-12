import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import Main from '../Main';
import Footer from '../Footer';

import './styles.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

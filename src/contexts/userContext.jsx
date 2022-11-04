import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const getCart = async () => {
    axios
      .get('https://fakestoreapi.com/carts/1')
      .then(function (response) {
        setCart(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  const contextValue = { cart };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

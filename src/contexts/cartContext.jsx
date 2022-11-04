import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = async (productId) => {
    axios
      .put('https://fakestoreapi.com/carts/1', {
        userId: 1,
        date: '2022 - 09 - 20',
        products: [...cart.products, { productId, quantity: 1 }],
      })
      .then(function (response) {
        setCart(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  const contextValue = { cart, addToCart };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

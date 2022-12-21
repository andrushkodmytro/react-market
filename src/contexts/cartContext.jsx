import { useEffect, useState, createContext, useContext, useRef } from 'react';
import { UserContext } from 'contexts/userContext';
import services from 'api/services';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const mounted = useRef(false);

  const { user } = useContext(UserContext);

  const addToCart = async (productId) => {
    try {
      const { data } = await services.post('/carts', { productId, quantity: 1, price: 500 });

      setCart(data.data);
    } catch (error) {
    } finally {
    }
  };

  const getCart = async () => {
    const { data } = await services.get('/carts');
    setCart(data.data);
  };

  const userBool = Boolean(user);

  // useEffect(() => {
  //   if (userBool) {
  //     getCart();
  //   } else {
  //     setCart({});
  //   }
  // }, [userBool]);

  useEffect(() => {
    if (mounted.current) {
      getCart();
    }
    mounted.current = true;
  }, []);

  const contextValue = { cart, addToCart, getCart };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

import { useEffect, useState, createContext, useRef } from 'react';
import services from 'api/services';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const mounted = useRef(false);

  const addToCart = async (productId) => {
    try {
      const { data } = await services.post('/carts', { productId, quantity: 1, price: 500 });

      setCart(data.data);
    } catch (error) {
    } finally {
    }
  };

  const removeFromCart = async ({ id, qty = 1 }) => {
    try {
      const { data } = await services.post('/carts/remove', { productId: id, quantity: qty });

      setCart(data.data);
    } catch (error) {
    } finally {
    }
  };

  const getCart = async () => {
    const { data } = await services.get('/carts');
    setCart(data.data);
  };

  const clearCart = async () => {
    setCart({});
  };

  useEffect(() => {
    if (mounted.current) {
      getCart();
    }
    mounted.current = true;
  }, []);

  const contextValue = { cart, addToCart, getCart, removeFromCart, clearCart };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

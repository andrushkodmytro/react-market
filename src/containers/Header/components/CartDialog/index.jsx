import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const x = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
    productId: 1,
    quantity: 4,
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 4.1,
      count: 259,
    },
    productId: 2,
    quantity: 1,
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4.7,
      count: 500,
    },
    productId: 3,
    quantity: 6,
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 15.99,
    description:
      'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: {
      rate: 2.1,
      count: 430,
    },
    productId: 4,
    quantity: 1,
  },
];

const CartDialog = ({ cart, open, onClose }) => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [open]);

  const checkoutHandler = () => {
    navigate('/checkout');
    onClose();
  };

  if (!open) return null;

  const total = (x || []).reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);

  return (
    <div className='dialog-container'>
      <dialog open={open} className='cart-dialog'>
        <div className='dialog-header'>
          Shopping Cart
          <button className='close-btn' onClick={onClose}>
            x
          </button>
        </div>
        <div className='dialog-content'>
          <div>
            {(cart?.products || []).map(({ id, title, image, quantity, price }) => (
              <div key={id} className='cart-product-row'>
                <div className='cart-product-row-remove-btn'>
                  <button>X</button>
                </div>
                <div className='cart-product-row-img'>
                  <img src={image} alt='product' />
                </div>
                <div className='cart-product-row-name'>{title}</div>
                <div className='cart-product-row-count'>
                  <button>-</button>
                  <span>{quantity}</span>
                  <button>+</button>
                </div>
                <div className='cart-product-row-price'>{price}$</div>
              </div>
            ))}
          </div>
        </div>
        <div className='dialog-actions'>
          <span>Total: {total}</span>
          <button onClick={checkoutHandler}>Buy</button>
        </div>
      </dialog>
    </div>
  );
};

export default CartDialog;

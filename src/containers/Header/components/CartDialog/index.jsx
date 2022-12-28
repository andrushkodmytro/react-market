import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import IconButton from 'components/ui/IconButton';
import Typography from 'components/ui/Typography';
import { CartContext } from 'contexts/cartContext';
import { intlOption } from 'utils/constants.js';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as MinusIcon } from 'assets/icons/minus.svg';
import './styles.scss';

const CartDialog = ({ cart, open, onClose }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.classList.add('dialog-show');
    } else {
      document.body.classList.remove('dialog-show');
    }

    return () => {
      document.body.classList.remove('dialog-show');
    };
  }, [open]);

  const checkoutHandler = () => {
    navigate('/checkout');
    onClose();
  };

  if (!open) return null;

  const total = (cart?.products || []).reduce((acc, cur) => {
    return acc + cur.quantity * cur.productId.price;
  }, 0);

  const addToCartHandler = (id) => {
    addToCart(id);
  };

  const removeFromCartHandler = (data) => {
    removeFromCart(data);
  };

  const totalFormated = intlOption.format(total);

  return (
    <div className='dialog-container'>
      <dialog open={open} className='cart-dialog'>
        <div className='dialog-header'>
          <Typography variant='h5'> Shopping Cart</Typography>

          <IconButton className='close-btn' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='dialog-content'>
          <div>
            {(cart?.products || []).map(({ id, title, image, quantity, price, productId }) => (
              <div key={id} className='cart-product-row'>
                <div className='cart-product-row-remove-btn'>
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div className='cart-product-row-img'>
                  <img src={productId.image} alt='product' />
                </div>
                <Typography variant='body1' className='cart-product-row-name'>
                  {productId.name}
                </Typography>
                <div className='cart-product-row-count'>
                  <IconButton onClick={() => removeFromCartHandler({ id: productId._id, qty: 1 })}>
                    <MinusIcon />
                  </IconButton>
                  <span>{quantity}</span>
                  <IconButton onClick={() => addToCartHandler(productId._id)}>
                    <PlusIcon />
                  </IconButton>
                </div>
                <div className='cart-product-row-price'>{intlOption.format(quantity * productId.price)}$</div>
              </div>
            ))}
          </div>
        </div>
        <div className='dialog-actions'>
          <Typography variant='h6' component='span'>
            {' '}
            Total: {totalFormated} $
          </Typography>

          <Button onClick={checkoutHandler}>Buy</Button>
        </div>
      </dialog>
    </div>
  );
};

export default CartDialog;

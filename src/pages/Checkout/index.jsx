import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from 'contexts/cartContext';
import Paper from 'components/ui/Paper';
import services from 'api/services';
import useToast from 'hooks/useToast';
import Button from 'components/ui/Button';
import './styles.scss';

const Checkout = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { getCart } = useContext(CartContext);

  const { addToast } = useToast();

  const mounted = useRef(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) {
      // getUsers();
    }

    mounted.current = true;
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      phone,
      email,
      city,
      address,
      // billing_first_name,
      // billing_last_name,
      // billing_phone,
      // billing_email,
      // billing_city,
      // billing_address,
    } = e.target;

    const data = {
      first_name: first_name.value,
      last_name: last_name.value,
      phone: phone.value,
      email: email.value,
      city: city.value,
      address: address.value,
    };

    services
      .post('/orders', data)
      .then(function ({ data }) {
        getCart();
        addToast({ message: data.message, type: 'success' });
        navigate('/login');
      })
      .catch(function (error) {
        // handle error
        addToast({ message: data.message, type: 'error' });
      });
  };

  return (
    <div className='checkout-page'>
      <h1>Checkout</h1>
      <form onSubmit={onSubmit}>
        <Paper>
          <h2>Contact data</h2>
          <div className='form'>
            <input type='text' name='first_name' placeholder='First name' value='Jon' />
            <input type='text' name='last_name' placeholder='Last name' value='Dou' />
            <input type='text' name='phone' placeholder='Phone' value='1234567890' />
            <input type='text' name='email' placeholder='Email' value='test@test.com' />
            <input type='text' name='city' placeholder='City' value='New-York' />
            <input type='text' name='address' placeholder='Address' value='Street' />
          </div>
        </Paper>

        {/* <Paper>
          <h2>Billing data</h2>
          <div className='form'>
            <input type='text' name='billing_first_name' placeholder='First name' value='Jon'/>
            <input type='text' name='billing_last_name' placeholder='Last name' value='Dou'/>
            <input type='text' name='billing_phone' placeholder='Phone' value='1234567890'/>
            <input type='text' name='billing_email' placeholder='Email' value='test@test.com'/>
            <input type='text' name='billing_city' placeholder='City' value='New-York'/>
            <input type='text' name='billing_address' placeholder='Address' value='Street'/>
          </div>
        </Paper> */}

        <Button type='submit'>Order</Button>
      </form>
    </div>
  );
};

export default Checkout;

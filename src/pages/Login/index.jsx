import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import service from '../../api/services';
import store from 'store2';
import { UserContext } from 'contexts/userContext';
import { CartContext } from 'contexts/cartContext';
import Paper from 'components/ui/Paper';
import TextField from 'components/ui/TextField';
import Typography from 'components/ui/Typography';
import Button from 'components/ui/Button';
import auth from '../../utils/auth';
import { ReactComponent as SpinnerIcon } from 'assets/icons/spiner2.svg';
import styles from './styles.module.scss';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const { getCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const { email, password } = e.target;

    const data = { email: email.value, password: password.value };

    try {
      const { data: resData } = await service.post('/users/login', data);
      const auth = {
        user: resData.user,
        token: resData.token,
        expiresIn: resData.expiresIn,
      };

      store.set('auth', auth);

      setUser(resData.user);
      getCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(auth.isAuthenticated());
  if (auth.isAuthenticated()) {
    return <Navigate replace to='/' />;
  }

  return (
    <div className={styles.loginPage}>
      <Paper component='form' onSubmit={onSubmit}>
        {isLoading && (
          <SpinnerIcon
            style={{
              height: '50px',
              width: '50px',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1100,
            }}
          />
        )}

        <Typography variant='h5'> Login</Typography>

        <TextField label='Email' placeholder='Email' name='email' autoFocus fullWidth disabled={isLoading} />
        <TextField label='Password' placeholder='Password' name='password' fullWidth disabled={isLoading} />

        {/* <FormControlLabel control={<Checkbox value='remember' name='remember' color='primary' />} label='Remember me' /> */}

        <Button variant='contained' color='primary' size='large' type='submit' disabled={isLoading}>
          Login
        </Button>

        <div className={styles.loginLinks}>
          <Link to='/forgot-password' variant='body2'>
            Forgot password?
          </Link>

          <Link to='/register' variant='body2'>
            Don't have an account? Sign Up
          </Link>
        </div>
      </Paper>
    </div>
  );
}

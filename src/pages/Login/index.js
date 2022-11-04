import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import service from '../../api/services';
import store from 'store2';
import auth from '../../utils/auth';
import './styles.scss';

export default function Login() {
  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    const data = { email: email.value, password: password.value };

    service
      .post('/auth/login', data)
      .then(function ({ data }) {
        console.log(data);

        const auth = {
          user: data.user,
          token: data.token,
        };

        store.set('auth', auth);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (auth.isAuthenticated()) {
    return <Navigate replace to='/' />;
  }

  return (
    <div className='login-page'>
      <form onSubmit={onSubmit}>
        <input label='Email' placeholder='Email' name='email' autoFocus />
        <input label='Password' placeholder='Password' name='password' />

        {/* <FormControlLabel control={<Checkbox value='remember' name='remember' color='primary' />} label='Remember me' /> */}
        <button type='submit' fullWidth variant='contained' color='primary' size='large'>
          Submit
        </button>

        <div className='login-page-links'>
          <Link to='/forgot-password' variant='body2'>
            Forgot password?
          </Link>

          <Link to='/register' variant='body2'>
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

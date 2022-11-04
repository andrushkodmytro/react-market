import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import auth from '../../utils/auth';
import './styles.scss';

export default function SignUp() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = e.target;

    const data = { email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value };

    axios
      .post('/auth/register', data)
      .then(function ({ data }) {
        console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  if (auth.isAuthenticated()) {
    return <Navigate replace to='/' />;
  }

  return (
    <div className='sign-up'>
      <form onSubmit={onSubmit}>
        <input name='firstName' required id='firstName' placeholder='First Name' autoFocus />

        <input variant='outlined' required id='lastName' placeholder='Last Name' name='lastName' autoComplete='lname' />

        <input required placeholder='Email Address' name='email' autoComplete='email' />

        <input
          required
          name='password'
          placeholder='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />

        {/* <div item xs={12}> */}
        {/* <FormControlLabel
              control={<Checkbox value='allowExtraEmails' color='primary' />}
              label='I want to receive inspiration, marketing promotions and updates via email.'
            /> */}
        {/* </div> */}

        <button type='submit' fullWidth variant='contained' color='primary' size='large'>
          Sign Up
        </button>
        <div className='sign-up-page-links'>
          <Link
            // className={classes.navLink}
            to='/login'
            variant='body2'
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

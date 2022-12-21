import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useToast from 'hooks/useToast';
import services from 'api/services';
import auth from '../../utils/auth';
import './styles.scss';

export default function SignUp() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = e.target;

    const newUserData = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    };

    try {
      const data = await services.post('/auth/register', newUserData);

      if (data.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      addToast({ message: error?.message || 'Error', type: 'error' });
    }
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

        <button type='submit' variant='contained' color='primary' size='large'>
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

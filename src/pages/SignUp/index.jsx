import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useToast from 'hooks/useToast';
import Paper from 'components/ui/Paper';
import TextField from 'components/ui/TextField';
import Typography from 'components/ui/Typography';
import Button from 'components/ui/Button';
import services from 'api/services';
import auth from '../../utils/auth';
import styles from './styles.module.scss';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

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
      setIsLoading(false);
      addToast({ message: error?.message || 'Error', type: 'error' });
    }
  };

  if (auth.isAuthenticated()) {
    return <Navigate replace to='/' />;
  }

  return (
    <div className={styles.signUp}>
      <Paper component='form' onSubmit={onSubmit}>
        {isLoading ? '' : ''}
        <Typography variant='h5'> Sign up</Typography>
        <TextField label='First Name' name='firstName' autoFocus fullWidth disabled={isLoading} />
        <TextField label='Last Name' name='lastName' fullWidth disabled={isLoading} />
        <TextField label='Email' name='email' fullWidth disabled={isLoading} />
        <TextField label='Password' name='password' fullWidth disabled={isLoading} />

        <Button variant='contained' color='primary' size='large' type='submit' disabled={isLoading}>
          Sign Up
        </Button>

        <div className={styles.links}>
          <Link to='/login' variant='body2'>
            Already have an account? Sign in
          </Link>
        </div>
      </Paper>
    </div>
  );
}

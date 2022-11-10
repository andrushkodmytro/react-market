import React, { useContext } from 'react';
import Paper from 'components/ui/Paper';
import { UserContext } from 'contexts/userContext';
import services from 'api/services';
import auth from 'utils/auth';
import useToast from 'hooks/useToast';
import './styles.scss';

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const { addToast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, firstName, lastName } = e.target;

    const data = { firstName: firstName.value, lastName: lastName.value, email: email.value };

    services
      .post('/account', data)
      .then(function ({ data }) {
        auth.setUser(data.user);
        setUser((prev) => ({ ...prev, ...data.user }));

        addToast({ message: data.message, type: 'success' });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const onSubmit2 = async (e) => {
    e.preventDefault();

    addToast({
      message: 'Message ' + +new Date(),
      type: 'success',
      // action: hideToast,
    });
  };

  return (
    <div className='account-page'>
      <Paper>
        <form onSubmit={onSubmit}>
          <input
            name='firstName'
            required
            id='firstName'
            placeholder='First Name'
            autoFocus
            defaultValue={user?.firstName || ''}
          />

          <input
            variant='outlined'
            required
            id='lastName'
            placeholder='Last Name'
            name='lastName'
            autoComplete='lname'
            defaultValue={user?.lastName || ''}
          />

          <input
            required
            placeholder='Email Address'
            name='email'
            autoComplete='email'
            defaultValue={user?.email || ''}
          />

          <button type='submit' variant='contained' color='primary' size='large'>
            Save
          </button>
        </form>

        <form onSubmit={onSubmit2}>
          <input
            type='password'
            required
            id='lastName'
            placeholder='New Password'
            name='lastName'
            autoComplete='lname'
          />

          <input type='password' required placeholder='Confirm new password' name='email' autoComplete='email' />

          <button type='submit' variant='contained' color='primary' size='large'>
            Change password
          </button>
        </form>
      </Paper>
    </div>
  );
};

export default Account;

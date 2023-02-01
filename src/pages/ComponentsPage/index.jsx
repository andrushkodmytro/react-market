import React from 'react';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import Select from 'components/ui/Select';
import Paper from 'components/ui/Paper';
import styles from './styles.module.scss';

const options = [
  { label: 'Account', value: 'account' },
  { label: 'Log in', value: 'log_in' },
  { label: 'Products', value: 'products' },
];

const ComponentsPage = () => {
  return (
    <div className={styles.page}>
      <Paper className={styles.paper}>
        <h2>Buttons</h2>

        <Button variant='contained' color='primary' size='large'>
          Button
        </Button>
        <Button variant='contained' color='secondary' size='large'>
          Button
        </Button>
        <Button variant='contained' color='primary' size='large'>
          Button
        </Button>

        <TextField label='Text field' />
        <Select style={{ marginTop: '20px' }} label='Select' options={options} />
      </Paper>
    </div>
  );
};

export default ComponentsPage;

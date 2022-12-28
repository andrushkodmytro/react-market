import React from 'react';
import Button from 'components/ui/Button';
// import TextField from 'components/ui/TextField';
import Select from 'components/ui/Select';

const options = [
  { label: 'Account', value: 'account' },
  { label: 'Log in', value: 'log_in' },
  { label: 'Products', value: 'products' },
];

const ComponentsPage = () => {
  return (
    <div>
      <h2>Buttons</h2>

      {/* <Button variant='contained' color='primary' size='large'>
        Button
      </Button>
      <Button variant='contained' color='secondary' size='large'>
        Button
      </Button>
      <Button variant='contained' color='primary' size='large'>
        Button
      </Button> */}

      <Select style={{ marginTop: '20px' }} label='Select' options={options} />
    </div>
  );
};

export default ComponentsPage;

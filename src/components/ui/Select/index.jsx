import React, { useState } from 'react';
import TextField from 'components/ui/TextField';
import Menu from 'components/ui/Menu';
import MenuItem from 'components/ui/MenuItem';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron.svg';
import './styles.scss';

const Select = ({ className, label, value: initValue, options, onChange, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initValue || {});

  const setOpenHandler = () => {
    setOpen((prev) => !prev);
  };

  const onChangeHandler = (e) => {
    const newValue = e.target.dataset['value'];

    const selectedOptions = options.find(({ value }) => value === newValue);
    setValue(selectedOptions);
    onChange(selectedOptions);
  };

  return (
    <TextField
      className='select-field'
      style={{ marginTop: '20px', position: 'relative' }}
      label={label}
      onClick={setOpenHandler}
      value={value.label}
    >
      <ChevronIcon />
      <Menu open={open} onClose={setOpenHandler} style={{ zIndex: 1000, position: 'relative' }}>
        {options.map(({ label, value }) => (
          <MenuItem data-value={value} onClick={onChangeHandler}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </TextField>
  );
};

export default Select;

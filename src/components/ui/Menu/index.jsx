import React from 'react';
import useOutsideClick from 'hooks/useOutsideClick';
import './styles.scss';

export default function Menu({ children, open, onClose }) {
  const ref = useOutsideClick(onClose);

  return (
    <div className='dropdown-menu'>
      {open ? (
        <ul className='menu' ref={ref}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              // onClick: onClose,
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}

import React from 'react';
import Button from 'components/ui/Button';
import './styles.scss';

export default function Toast({ toasts }) {
  return (
    <div className='toast'>
      <div className='toast-container'>
        {toasts.map(({ id, type, message, action, removeTimer }) => {
          return (
            <div
              className={`toast-container-item ${type ? type : ''} ${removeTimer ? 'toast-container-item-close' : ''}`}
              key={id}
            >
              {message}
              {action && (
                <Button className={'toast-close-btn'} onClick={() => action(id)}>
                  x
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

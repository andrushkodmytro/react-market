import React from 'react';
import {} from './styles.scss';

const LIMIT = [2, 4, 8];

export default function Pagination({ page, limit, total, onPageChange, onLimitChange }) {
  const pages = Math.ceil(total / limit);

  return (
    <div className='pagination'>
      <button>{'<'}</button>
      {[...new Array(pages).keys()].map((item, index) => {
        return (
          <button
            key={index}
            disabled={page === item + 1}
            className={page === item + 1 ? 'page-active' : ''}
            data-page={item + 1}
            onClick={onPageChange}
          >
            {item + 1}
          </button>
        );
      })}
      <button>{'>'}</button>

      <select defaultValue={limit} onChange={onLimitChange}>
        {LIMIT.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

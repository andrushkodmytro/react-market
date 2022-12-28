import { useEffect, useState } from 'react';
import Select from 'components/ui/Select';
import axios from 'axios';
import './styles.scss';

const Filters = ({ sort, sortOptions, onSortChange, category, categoryOptions, onCategoryChange }) => {
  const [categoryList, setCategoryList] = useState([]);

  return (
    <div className='product-list-filters'>
      <Select label='Category' value={category} options={categoryOptions} onCahnge={onCategoryChange} />
      <Select label='Order' value={sort} options={sortOptions} onChange={onSortChange} />
    </div>
  );
};

export default Filters;

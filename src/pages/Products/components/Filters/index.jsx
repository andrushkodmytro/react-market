import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.scss';

const Filters = ({ sort, setSort, category, setCategory }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products/categories')
      .then(function ({ data }) {
        setCategoryList(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div className='product-list-filters'>
      <select
        value={category || ''}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value={null}>All</option>
        {categoryList.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>

      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value='asc'>asc</option>
        <option value='desc'>desc</option>
      </select>
    </div>
  );
};

export default Filters;

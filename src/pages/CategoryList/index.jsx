import { useEffect } from 'react';
import CategoryCard from './components/CategoryCard';
import axios from 'axios';
import { categoryList } from './utils';
import './styles.scss';

const CategoryList = () => {
  // useEffect(() => {
  //   axios
  //     .get('https://fakestoreapi.com/products/categories')
  //     .then(function (response) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div className='category-list'>
      {categoryList.map((item, index) => {
        return <CategoryCard key={index} name={item} />;
      })}
    </div>
  );
};

export default CategoryList;

import React, { useState, useEffect, useRef } from 'react';
import services from 'api/services';
import './styles.scss';

export default function ProductAdd() {
  const [categories, setCategories] = useState([]);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      services.get('/products/new').then(({ data }) => {
        Array.isArray(JSON.parse(data)) && setCategories(JSON.parse(data));
      });
    }

    mounted.current = true;
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, description, category, price, image } = e.target;

    const data = {
      name: name.value,
      description: description.value,
      categoryId: category.value,
      price: price.value,
      image: image.value,
    };

    services.post('/products', data);
  };
  console.log(categories);
  return (
    <div className='product-add-page'>
      <form onSubmit={onSubmit}>
        <input name='name' placeholder='Product Name' />
        <textarea name='description' placeholder='Description' row='3' />
        <select name='category'>
          <option value={''}>Select category</option>
          {categories.map(({ _id, name }, index) => {
            return (
              <option key={index} value={_id}>
                {name}
              </option>
            );
          })}
        </select>

        <input name='price' placeholder='Price' />
        <input name='image' placeholder='Image' />
        <div className='action-btn-block'>
          <button variant='contained' color='secondary' size='large'>
            Cancel
          </button>

          <button type='submit' variant='contained' color='primary' size='large'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

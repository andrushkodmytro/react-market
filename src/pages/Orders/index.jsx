import React, { useState, useEffect, useRef } from 'react';
import services from 'api/services';
import useToast from 'hooks/useToast';
import './styles.scss';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const mounted = useRef(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await services.get('/orders', { page, limit });
      console.log(data);
      if (data) {
        const resData = data;
        setOrders(resData.data);

        setTotal(resData.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) {
      getUsers();
    }

    mounted.current = true;
  }, []);

  console.log(orders);
  return (
    <div className='orders-list-page'>
      <h1>Users list page</h1>
      <div>
        <table>
          <thead>
            <th>Date</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Role</th>
          </thead>
          <tbody>
            {orders.map(({ _id, createdAt, orderItems, status, lastName, email }) => {
              return (
                <tr key={_id}>
                  <td>{createdAt}</td>
                  <td>{lastName}</td>
                  <td>{orderItems?.length || 0}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

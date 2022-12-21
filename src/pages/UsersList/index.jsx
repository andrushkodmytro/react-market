import React, { useState, useEffect, useRef } from 'react';
import services from 'api/services';
import useToast from 'hooks/useToast';
import './styles.scss';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await services.get('/account/all', { page, limit });

      if (data) {
        const resData = data;
        setUsers(resData.data);

        setTotal(resData.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  return (
    <div className='users-list-page'>
      <h1>Users list page</h1>
      <div>
        <table>
          <thead>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Role</th>
          </thead>
          <tbody>
            {users.map(({ _id, firstName, lastName, email }) => {
              return (
                <tr key={_id}>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>role</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

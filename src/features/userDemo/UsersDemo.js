import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchUsers } from './usersSliceDemo';

const UsersDemo = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchUsers());
    }, []);
    return (
      <div>
        <h2>List Of Users</h2>
        {user.loading && <div>...loading</div>}
        {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
        {!user.loading && user.users.length ? (
          <ul>
            {user.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
}

export default UsersDemo


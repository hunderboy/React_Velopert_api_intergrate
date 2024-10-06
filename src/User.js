// 커스컴 hook 방식
// import React from 'react';
// import axios from 'axios';
// import useAsync from './useAsync';

// async function getUser(id) {
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return response.data;
// }

// function User({ id }) {
//   // id 값이 바뀔때마다, getUser(id) 를 호출하겠다는 의미
//   const [state] = useAsync(() => getUser(id), [id]);
//   const { loading, data: user, error } = state;

//   if (loading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!user) return null;

//   return (
//     <div>
//       <h2>{user.username}</h2>
//       <p>
//         <b>Email:</b> {user.email}
//       </p>
//     </div>
//   );
// }

// export default User;

// react-async 방식
// import React from 'react';
// import axios from 'axios';
// import { useAsync } from 'react-async';

// async function getUser({ id }) {
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return response.data;
// }

// function User({ id }) {
//   const {
//     data: user,
//     error,
//     isLoading,
//   } = useAsync({
//     promiseFn: getUser,
//     id,
//     watch: id,
//   });

//   if (isLoading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!user) return null;

//   return (
//     <div>
//       <h2>{user.username}</h2>
//       <p>
//         <b>Email:</b> {user.email}
//       </p>
//     </div>
//   );
// }

// export default User;

import React, { useEffect } from 'react';
import { useUsersState, useUsersDispatch, getUser } from './UsersContext';

function User({ id }) {
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  const { data: user, loading, error } = state.user;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;
  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;

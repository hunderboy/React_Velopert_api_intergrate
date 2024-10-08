// 커스컴 hook 방식

// import React, { useState } from 'react';
// import axios from 'axios';
// import useAsync from './useAsync';
// import User from './User';

// // useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// // 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
// async function getUsers() {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users'
//   );
//   return response.data;
// }

// function Users() {
//   const [userId, setUserId] = useState(null);
//   const [state, refetch] = useAsync(getUsers, [], true);

//   const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

//   if (loading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!users) return <button onClick={refetch}>불러오기</button>;
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => setUserId(user.id)}
//             style={{ cursor: 'pointer' }}
//           >
//             {user.username} ({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={refetch}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//     </>
//   );
// }

// export default Users;

// react-async 방식
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAsync } from 'react-async';
// import User from './User';

// async function getUsers() {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users'
//   );
//   return response.data;
// }

// function Users() {
//   const [userId, setUserId] = useState(null);
//   const {
//     data: users,
//     error,
//     isLoading,
//     reload,
//   } = useAsync({
//     promiseFn: getUsers,
//   });

//   if (isLoading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!users) return <button onClick={reload}>불러오기</button>;
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => setUserId(user.id)}
//             style={{ cursor: 'pointer' }}
//           >
//             {user.username} ({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={reload}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//     </>
//   );
// }

// export default Users;

import React, { useState } from 'react';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';
import User from './User';

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { data: users, loading, error } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;

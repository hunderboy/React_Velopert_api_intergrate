import { useReducer, useEffect } from 'react';

// useReducer 를 사용하여 LOADING, SUCCESS, ERROR 액션에 따라 다르게 처리
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 커스텀 Hook
// callback : api 호출하는 함수
// deps : 해당 함수 안에서 사용하는 useEffect 의 deps 로 설정됩니다.
// deps = [] 의미는, 기본값이 [] 라는 겁니다.
// 즉, 컴포넌트가 가장 처음 렌더링 할 때만 API 를 호출하고 싶다는 의미죠.
// 이 Hook 에서 반환하는 값은 요청 관련 상태와, fetchData 함수입니다.
// 이렇게 fetchData 함수를 반환하여서 나중에 데이터를 쉽게 리로딩을 해줄 수 있습니다.
function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;

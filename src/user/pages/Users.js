import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUser, setLoadedUser] = useState();
  // useEffect에는 프로미스를 반환하는 함수나 비동기 함수가 필요 없다.
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users')

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUser(responseData.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }

    }
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      {isLoading && <div className='center'>
        <LoadingSpinner/>
      </div>}
   {!isLoading && loadedUser && <UsersList items={loadedUser} /> }
    </React.Fragment>
  );
};

export default Users;

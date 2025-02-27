import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  
  // useEffect에는 프로미스를 반환하는 함수나 비동기 함수가 필요 없다.
  useEffect(() => {
    const fecthUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users')

        
        setLoadedUser(responseData.users);
        
      } catch (err) {}
    }
    fecthUsers();
  }, [sendRequest]);
  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && <div className='center'>
        <LoadingSpinner/>
      </div>}
   {!isLoading && loadedUser && <UsersList items={loadedUser} /> }
    </React.Fragment>
  );
};

export default Users;

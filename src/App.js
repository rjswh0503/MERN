import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Auth from './user/pages/Auth';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import { AuthContext } from './shared/context/auth-context';

const App = () => {


  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);



  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    // 토큰 발급 후 토큰 유효기간을 보여주는 코드  1000 * 60 * 60은 1시간
    // 현재 시간 new Date()에  new Date().getTime()을 해서 1시간을 더한 Date 객체를 얻음
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token,
      expiration: tokenExpirationDate.toISOString()
    }));
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));

    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/places/:placeId' element={<UpdatePlace />} />
      </React.Fragment>
    );

  } else {

    routes = (
      <React.Fragment>
        <Route path="/auth" element={<Auth />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );

};

export default App;
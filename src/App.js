import React, { useState, useCallback } from 'react';
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

  const login = useCallback((uid, token) => {
    setToken(token);
    localStorage.setItem('userData', JSON.stringify({userId: uid, token}));
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

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
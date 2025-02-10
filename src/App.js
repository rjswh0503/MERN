import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';


import Auth from './user/pages/Auth';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Routes>
          <Route path="/" element={<Users />}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/places/new" element={<NewPlace />}/>
          <Route path='/:userId/places' element={<UserPlaces/>}/>
          <Route path='/places/:placeId' element={<UpdatePlace/>}/>
      </Routes>
      </main>
    </Router>
  );
};

export default App;
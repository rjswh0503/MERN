import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';


const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Routes>
          <Route path="/" element={<Users />}/>
          <Route path="/places/new" element={<NewPlace />}/>
      </Routes>
      </main>
    </Router>
  );
};

export default App;
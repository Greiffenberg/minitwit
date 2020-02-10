import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/login/login';
import Register from './pages/register/register';

function App() {
  return (
      <Router>
          <Route exact path = "/login" render={() => <Login/>} />
          <Route exact path = "/register" render={() => <Register/>} />
      </Router>
  );
}

export default App;

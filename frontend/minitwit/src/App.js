import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/login/login';

function App() {
  return (
      <Router>
          <Route exact path = "/login" render={() => <Login/>} />
      </Router>
  );
}

export default App;

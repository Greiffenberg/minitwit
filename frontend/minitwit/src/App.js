import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './pages/login/login';
import Register from './pages/register/register';
import Timeline from './pages/timeline/timeline';
import TopNav from './components/topNav/topNav';

function App() {
  return (
      <Router>
          <TopNav/>
          <Route exact path = "/login" render={() => <Login/>} />
          <Route exact path = "/register" render={() => <Register/>} />
          <Route exact path = "/timeline" render={() => <Timeline/>} />
      </Router>
  );
}

export default App;

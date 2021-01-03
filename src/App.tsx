import React from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Background, Landing, Job } from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/job">
            <Job />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
      <Background />
    </>
  );
};

export default App;

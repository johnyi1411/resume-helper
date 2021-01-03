import React from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Background, Landing, Job } from './pages';

const App = () => {
  return (
    <>
      <Router>
          <Route exact path="/job">
            {({ match }) => (
              <CSSTransition
                in={match !== null}
                timeout={1000}
                classNames="slide"
                unmountOnExit
              >
                <Job />
              </CSSTransition>
            )}
          </Route>

          <Route exact path="/">
            {({ match }) => (
              <CSSTransition
                in={match !== null}
                timeout={1000}
                classNames="slide"
                unmountOnExit
              >
                <Landing />
              </CSSTransition>
            )}
          </Route>
      </Router>
      <Background />
      <div className="slide-enter"></div>
    </>
  );
};

export default App;

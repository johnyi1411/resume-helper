import React, { useState } from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  RouteChildrenProps,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Background, Landing, Job, Resume } from './pages';
import { About, Header } from './components';

type LocationType = {
  prevPath: string,
}

const App = () => {
  const initialPoints: string[] = [];
  const [jobPoints, setJobPoints] = useState(initialPoints);
  const [resumePoints, setResumePoints] = useState(initialPoints);
  
  return (
    <>
      <Router>
        <div className="w-3/4 mx-auto">
          <div className="flex justify-between mt-12">
            <Link to="/">
              <Header />
            </Link>
            <About />
          </div>
        </div>
        <Route exact path="/">
            {({ match }: RouteChildrenProps) => (
              <CSSTransition
                in={match !== null}
                timeout={1000}
                classNames="slide"
                unmountOnExit
              >
                <div className="w-full h-full fixed">
                  <Landing />
                </div>
              </CSSTransition>
            )}
          </Route>

          <Route exact path="/job">
            {({ location, match }: RouteChildrenProps<{}, LocationType>) => {
              const { state } = location;
              const prevPath = state && state.prevPath;
              const animationClass = prevPath === '/resume' ? 'slideback' : 'slide';
              return (
                <CSSTransition
                  in={match !== null}
                  timeout={1000}
                  classNames={animationClass}
                  unmountOnExit
                >
                  <div className="w-full h-full fixed">
                    <Job setJobPoints={setJobPoints}/>
                  </div>
                </CSSTransition>
              )
            }}
          </Route>

          <Route exact path="/resume">
          {({ location, match }: RouteChildrenProps<{}, LocationType>) => {
              const { state } = location;
              const prevPath = state && state.prevPath;
              const animationClass = prevPath === '/resume' ? 'slideback' : 'slide';
              return (
                <CSSTransition
                  in={match !== null}
                  timeout={1000}
                  classNames={animationClass}
                  unmountOnExit
                >
                <div className="w-full h-full fixed">
                  <Resume setResumePoints={setResumePoints}/>
                </div>
              </CSSTransition>
              )
          }}
          </Route>
      </Router>
      <Background />
    </>
  );
};

export default App;

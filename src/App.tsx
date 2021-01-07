import React, { useState } from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  RouteChildrenProps,
} from 'react-router-dom';
import { CSSTransition, Transition } from 'react-transition-group';

import { Background, Landing, Job, Results, Resume } from './pages';
import { About, Header } from './components';
import { duration, transitionStyles } from './enums';

type LocationType = {
  prevPath?: string,
  nextPath?: string,
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
            {!jobPoints.length &&
              <Redirect to="/"/>
            }
            {({ location, match }: RouteChildrenProps<{}, LocationType>) => {
                const { state } = location;
                const prevPath = state && state.prevPath;
                const nextPath = state && state.nextPath;
                let animationClass = 'slide';

                if (prevPath === '/resume') {
                  animationClass = 'slideback';
                }

                if (nextPath === '/results') {
                  animationClass = '';
                }

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

          <Route exact path="/results">
            {!jobPoints.length && !resumePoints.length &&
              <Redirect to="/"/>
            }
            {({ match }: RouteChildrenProps) => (
              <Transition 
                in={match !== null}
                timeout={duration}
                unmountOnExit
              >
                {state => (
                  <div className={`transition-opacity duration-500 w-full h-full ${transitionStyles[state]}`}>
                    <Results 
                      jobBulletPoints={jobPoints}
                      resumeBulletPoints={resumePoints}
                    />
                  </div>
                )}
              </Transition>
            )}
          </Route>
      </Router>
      <Background />
    </>
  );
};

export default App;

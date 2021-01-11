import React, { useState } from 'react';
import './index.css';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Background, Landing, Job, Results, Resume } from './pages';
import { About, Header } from './components';
import { pageTransitionDuration } from './enums';

type LocationType = {
  prevPath?: string,
  nextPath?: string,
}

const App = () => {
  const initialPoints: string[] = []; 
  const [jobPoints, setJobPoints] = useState(initialPoints);
  const [resumePoints, setResumePoints] = useState(initialPoints);

  let location = useLocation<LocationType>();
  let state = location.state || {};
  let { prevPath, nextPath } = state;

  const getAnimationStyle = () => {
    if (nextPath === '/results') {
      return 'fade';
    }

    if (prevPath === '/resume') {
      return 'slideback';
    }

    return 'slide';
  }
  
  return (
    <>
      <div className="w-3/4 mx-auto">
        <div className="flex justify-between mt-12">
          <Link to="/">
            <Header />
          </Link>
          <About />
        </div>
      </div>

      <TransitionGroup
        childFactory={child => React.cloneElement(child, { classNames: `${getAnimationStyle()}` })}
      >
        <CSSTransition
          key={location.key}
          classNames={`${getAnimationStyle()}`}
          timeout={pageTransitionDuration}
        >
          <Switch location={location}>
            <Route exact path="/results">
              <div className="w-full h-full">
                <Results 
                  jobBulletPoints={jobPoints}
                  resumeBulletPoints={resumePoints}
                />
              </div>
            </Route>
            <Route exact path="/job">
              <div className="w-full h-full fixed">
                <Job jobPoints={jobPoints} setJobPoints={setJobPoints}/>
              </div>
            </Route>
            <Route exact path="/resume">
              <div className="w-full h-full fixed">
                <Resume
                  jobPoints={jobPoints}
                  resumePoints={resumePoints}
                  setResumePoints={setResumePoints}
                />
              </div>
            </Route>
            <Route exact path="/">
              <div className="w-full h-full fixed">
                <Landing />
              </div>
            </Route>
            <Redirect from="*" to="/"/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Background />
    </>
  );
};

export default App;

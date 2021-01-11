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

const App = () => {
  const initialPoints: string[] = []; 
  const [jobPoints, setJobPoints] = useState(initialPoints);
  const [resumePoints, setResumePoints] = useState(initialPoints);

  let location = useLocation();
  
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

      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames={location.pathname === '/results' ? 'fade' : 'slide'}
          timeout={pageTransitionDuration}
        >
          <Switch location={location}>
            <Route exact path="/job">
              <div className="w-full h-full fixed">
                <Job setJobPoints={setJobPoints}/>
              </div>
            </Route>
            <Route exact path="/resume">
              <div className="w-full h-full fixed">
                <Resume setResumePoints={setResumePoints}/>
              </div>
            </Route>
            <Route exact path="/results">
              <div className="w-full h-full">
                <Results 
                  jobBulletPoints={jobPoints}
                  resumeBulletPoints={resumePoints}
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

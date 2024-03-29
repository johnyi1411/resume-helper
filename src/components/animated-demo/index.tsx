import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';

import { GoodDemoItems } from './good-demo-items';
import { BadDemoItems } from './bad-demo-items';
import { duration, transitionStyles } from '../../enums';

const AnimatedDemo = () => {
  const [goodMatchDemoItems, setGoodMatchDemoItems] = useState(false);
  const [badMatchDemoItems, setBadMatchDemoItems] = useState(false);

  const [showGoodMatchDemo, setGoodMatchDemo] = useState(true);

  useEffect(() => {
    setGoodMatchDemoItems(true);
  }, []);

  const onGoodDemoFinish = () => {
    setGoodMatchDemoItems(false);
    setBadMatchDemoItems(true);
  };

  const onBadDemoFinish = () => {
    setBadMatchDemoItems(false);
    setGoodMatchDemoItems(true);
  };
  
  return (
    <div className="w-full bg-lightblue py-10 px-12 rounded-xl shadow">
      {showGoodMatchDemo && <Transition 
        in={goodMatchDemoItems}
        timeout={duration}
        onExited={() => setGoodMatchDemo(false)}
      >
        {state => (
          <div className={`transition-opacity duration-500 ${transitionStyles[state]}`}>
            <GoodDemoItems onGoodDemoFinish={onGoodDemoFinish}/>
          </div>
        )}
      </Transition>}

      {!showGoodMatchDemo && <Transition 
        in={badMatchDemoItems}
        timeout={duration}
        onExited={() => setGoodMatchDemo(true)}
      >
        {state => (
          <div className={`transition-opacity duration-500 ${transitionStyles[state]}`}>
            <BadDemoItems onBadDemoFinish={onBadDemoFinish}/>
          </div>
        )}
      </Transition>}
    </div>
  )
};

export { AnimatedDemo };
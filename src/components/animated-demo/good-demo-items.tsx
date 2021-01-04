import React, { useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { FaThumbsUp } from 'react-icons/fa';
import { Transition } from 'react-transition-group';

import { duration, transitionStyles } from '../../enums';

type GoodDemoItemsProps = {
  onGoodDemoFinish: () => void,
}

const GoodDemoItems: React.FunctionComponent<GoodDemoItemsProps> = ({ onGoodDemoFinish }) => {
  const [goodMatchDemoItem1, setGoodMatchDemoItem1] = useState(false);
  const [goodMatchDemoItem2, setGoodMatchDemoItem2] = useState(false);
  const [goodMatchDemoItem3, setGoodMatchDemoItem3] = useState(false);

  useEffect(() => {
    setGoodMatchDemoItem1(true);
  }, []);

  return (
    <>
      <Transition 
        in={goodMatchDemoItem1}
        timeout={duration}
        onEntered={() => setGoodMatchDemoItem2(true)}
      >
        {state => (
          <div className={`transition-opacity duration-500 ${transitionStyles[state]}`}>
            <p className="font-bold">Job Description</p>

            <div className="bg-white rounded-xl py-2 px-4 mt-4">
              Experience developing reusable libraries and components useful across all teams
            </div>
          </div>
        )}
      </Transition>

      <Transition 
        in={goodMatchDemoItem2}
        timeout={duration}
        onEntered={() => setGoodMatchDemoItem3(true)}
      >
        {state => (
          <div className={`transition-opacity duration-500 ${transitionStyles[state]}`}>
            <p className="font-bold mt-4">Resume</p>

            <div className="bg-white rounded-xl py-2 px-4 mt-4">
              Developed a component libray using React used on front end projects on multiple teams
            </div>
          </div>
        )}
      </Transition>

      <Transition 
        in={goodMatchDemoItem3}
        timeout={duration}
        onEntered={() => onGoodDemoFinish()}
      >
        {state => (
          <div className={`transition-opacity duration-500 ${transitionStyles[state]}`}>
            <div className="flex justify-center bg-white rounded-xl py-6 mt-8 text-darkgreen border border-darkgreen shadow">
              <div className="flex content-center justify-between w-1/2">
                <span className="self-center text-3xl">Great Match</span>

                <IconContext.Provider value={{ className: "text-4xl" }}>
                  <FaThumbsUp />
                </IconContext.Provider>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

export { GoodDemoItems };
import React, { useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { FaThumbsDown } from 'react-icons/fa';
import { Transition } from 'react-transition-group';

import { duration, transitionStyles } from './enums';

type BadDemoItemsProps = {
  onBadDemoFinish: () => void,
}

const BadDemoItems: React.FunctionComponent<BadDemoItemsProps> = ({ onBadDemoFinish }) => {
  const [badMatchDemoItem1, setbadMatchDemoItem1] = useState(false);
  const [badMatchDemoItem2, setbadMatchDemoItem2] = useState(false);
  const [badMatchDemoItem3, setbadMatchDemoItem3] = useState(false);

  useEffect(() => {
    setbadMatchDemoItem1(true);
  }, []);

  return (
    <>
      <Transition 
        in={badMatchDemoItem1}
        timeout={duration}
        onEntered={() => setbadMatchDemoItem2(true)}
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
        in={badMatchDemoItem2}
        timeout={duration}
        onEntered={() => setbadMatchDemoItem3(true)}
      >
        {state => (
          <div className={`transition-opacity duration-500 ${transitionStyles[state]}`}>
            <p className="font-bold mt-4">Resume</p>

            <div className="bg-white rounded-xl py-2 px-4 mt-4">
              Utilized server-side rendering to decrease time to initial page load to  and improve SEO
            </div>
          </div>
        )}
      </Transition>

      <Transition 
        in={badMatchDemoItem3}
        timeout={duration}
        onEntered={() => onBadDemoFinish()}
      >
        {state => (
          <div className={`transition-opacity duration-500 ${transitionStyles[state]}`}>
            <div className="flex justify-center bg-white rounded-xl py-6 mt-8 text-darkred border border-darkred shadow">
              <div className="flex content-center justify-between w-1/2">
                <span className="self-center text-3xl">Poor Match</span>

                <IconContext.Provider value={{ className: "text-4xl" }}>
                  <FaThumbsDown />
                </IconContext.Provider>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

export { BadDemoItems };
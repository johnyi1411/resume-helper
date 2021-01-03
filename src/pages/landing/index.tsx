import React from 'react';
import { IconContext } from "react-icons";
import { FaThumbsUp } from 'react-icons/fa';

import { Background } from '../page-template';
import { About, Button, Header } from '../../components';

const Landing = () => {
  return (
    <>
      <div className="w-3/4 mx-auto">
        <div className="flex justify-between mt-12">
          <Header />
          <About />
        </div>

        <div className="grid grid-cols-2 ml-4 mt-20">
          <div className="max-w-2xs mt-4">
            <p className="text-4xl text-darkblue leading-snug">
              See how well your resume fits the job
            </p>
            <div className="mt-14">
              <Button onClick={() => console.log('yo')} buttonText="Get Started" />
            </div>
          </div>

          <div className="w-full bg-lightblue py-10 px-12 rounded-xl shadow">
            <p className="font-bold">Job Description</p>
            <div className="bg-white rounded-xl py-2 px-4 mt-4">
              Experience developing reusable libraries and components useful across all teams
            </div>
            <p className="font-bold mt-4">Resume</p>
            <div className="bg-white rounded-xl py-2 px-4 mt-4">
              Developed a component libray using React used on front end projects on multiple teams
            </div>
            <div className="flex justify-center bg-white rounded-xl py-6 mt-8 text-darkgreen">
              <div className="flex content-center justify-between w-1/2">
                <span className="self-center text-3xl">Great Match</span>
                <IconContext.Provider value={{ className: "text-4xl" }}>
                  <FaThumbsUp />
                </IconContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Background />
    </>
  );
}

export { Landing };
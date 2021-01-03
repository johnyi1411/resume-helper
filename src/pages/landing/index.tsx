import React from 'react';

import { Background } from '../page-template';
import { About, AnimatedDemo, Button, Header } from '../../components';

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

          <AnimatedDemo />
        </div>
      </div>

      <Background />
    </>
  );
}

export { Landing };
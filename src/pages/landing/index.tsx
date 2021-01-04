import React from 'react';
import { Link } from "react-router-dom";

import { AnimatedDemo, Button } from '../../components';

const Landing = () => {
  return (
    <>
      <div className="w-3/4 mx-auto">
        <div className="grid grid-cols-2 ml-4 mt-20">
          <div className="max-w-2xs mt-4">
            <p className="text-4xl text-darkblue leading-snug">
              See how well your resume fits the job
            </p>
            <div className="mt-14">
              <Link to="/job">
                <Button buttonText="Get Started" />
              </Link>
            </div>
          </div>

          <AnimatedDemo />
        </div>
      </div>
    </>
  );
}

export { Landing };
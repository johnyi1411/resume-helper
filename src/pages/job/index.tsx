import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsDot } from 'react-icons/bs';

import { NextButton } from '../../components';
import { useTextAreaWithoutAsciiCharacters } from '../../hooks';

type JobProps = {
  setJobPoints: (jobPoints: string[]) => void;
}

const Job: React.FunctionComponent<JobProps> = ({ setJobPoints }) => {
  const { value: job, bind: bindJob } = useTextAreaWithoutAsciiCharacters('');
  const [jobInputError, setJobInputError] = useState(false);

  const jobBulletPoints = job ? job.split('\n').filter((bulletPoint: string) => bulletPoint) : [];

  useEffect(() => {
    if (jobInputError && job) {
      setJobInputError(false);
    }
  }, [job, jobInputError]);
  
  return (
    <div>
      <div className="w-3/4 mx-auto text-sm">
        <div className="grid grid-cols-2 ml-4 mt-20 max-h-screen60">
          <div className="w-10/12 py-4 pl-4 justify-self-center bg-white rounded-xl shadow border-4 border-lightblue">
            <textarea
              className="w-full h-full max-h-screen60 focus:outline-none resize-none"
              placeholder="Copy a job description here..."
              {...bindJob}
            />
          </div>

          <div className="w-full max-h-screen60 bg-white py-4 pl-4 rounded-xl shadow border-4 border-lightblue overflow-scroll">
            {jobBulletPoints.map((bulletPoint, bulletPointIndex) => {
              return (
                <div key={bulletPointIndex} className="flex items-center w-full">
                  <IconContext.Provider value={{ className: "min-w-min min-h-min text-md text-black" }}>
                    <BsDot />
                  </IconContext.Provider>
                  <span className="ml-2 my-1">{bulletPoint}</span>
                </div>
              );
            })}
          </div>

          {jobInputError && 
            <div className="flex items-center justify-center w-10/12 mt-4">
              <p className="text-darkred">Please enter a job description</p>
            </div>
          }
        </div>
      </div>

      {jobBulletPoints.length ? 
        <Link to="/resume" onClick={() => setJobPoints(jobBulletPoints)}>
          <NextButton />
        </Link> :
        <div onClick={() => setJobInputError(true)}>
          <NextButton />
        </div>
      }
    </div>
  )
};

export { Job };
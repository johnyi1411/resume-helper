import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsDot } from 'react-icons/bs';
import { FcPrevious } from 'react-icons/fc';

import { Button } from '../../components';
import { useTextAreaWithoutAsciiCharacters } from '../../hooks';

type ResumeProps = {
  jobPoints: string[];
  resumePoints: string[];
  setResumePoints: (resumePoints: string[]) => void;
}

const Resume: React.FunctionComponent<ResumeProps> = ({ jobPoints, resumePoints, setResumePoints }) => {
  const { value: resume, bind: bindResume } = useTextAreaWithoutAsciiCharacters(resumePoints.length ? resumePoints.join('\n') : '');

  const resumeBulletPoints = resume ? resume.split('\n').filter((bulletPoint: string) => bulletPoint) : [];
  
  return (
    <div>
      {jobPoints.length ?
        <div className="flex flex-col items-center w-3/4 mx-auto text-sm">
          <div className="grid grid-cols-2 w-full ml-4 mt-20 max-h-screen60">
            <div className="w-10/12 py-4 pl-4 justify-self-center bg-white rounded-xl shadow border-4 border-lightblue">
              <textarea
                className="w-full h-full max-h-screen60 focus:outline-none resize-none"
                placeholder="Copy your resume here..."
                {...bindResume}
              />
            </div>

            <div className="w-full max-h-screen60 bg-white pt-4 pl-4 rounded-xl shadow border-4 border-lightblue overflow-scroll">
              {resumeBulletPoints.map((bulletPoint, bulletPointIndex) => {
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
          </div>

          {resume && 
            <Link
              to={{pathname: '/results', state: { nextPath: '/results' }}}
              className="justify-self-center mt-4"
              onClick={() => setResumePoints(resumeBulletPoints)}
            >
              <Button buttonText="Analyze" />
            </Link>
          }
        </div> :
        <Redirect to="/" />
      }


      <Link to={{pathname: '/job', state: { prevPath: '/resume' }}}>
        <div className="fixed bottom-1/16 left-1/16 bg-white rounded-full justify-center text-center text-3xl text-darkgreen shadow hover:bg-gray-100">
          <IconContext.Provider value={{ className: "m-2" }}>
            <FcPrevious />
          </IconContext.Provider>
        </div>
      </Link>
    </div>
  )
};

export { Resume };
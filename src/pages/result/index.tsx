import React, { FunctionComponent, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { IconContext } from "react-icons";
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';

import { Loading } from '../../components';

import { getScores } from '../../model';
import { BestMatchingQueryResponsePair } from '../../types';
import { duration, transitionStyles } from '../../enums';

type ResultsProps = {
  jobBulletPoints: string[];
  resumeBulletPoints: string[];
};

const Results: FunctionComponent<ResultsProps> = ({ jobBulletPoints, resumeBulletPoints }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const jobBulletPointResponseScoresInitialValue: number[] = [];
  const [jobBulletPointResponseScores, setJobBulletPointResponseScores] = useState(jobBulletPointResponseScoresInitialValue);
  const [upperScoreLimit, setUpperScoreLimit] = useState(0);
  const [lowerScoreLimit, setLowerScoreLimit] = useState(0);

  const bestMatchingPairsInitialValue: BestMatchingQueryResponsePair[] = [];
  const [bestMatchingPairs, setBestMatchingPairs] = useState(bestMatchingPairsInitialValue);

  useEffect(() => {
    setIsLoading(true);
  }, [])

  
  useEffect(() => {
    const analyzeScores = async () => {
      const start = performance.now();
  
      const {
        queryResponseScores: typedBullePointScores,
        meanPlusOneStdVariation,
        meanMinusOneStdVariation,
        bestMatchingPairs
      } = await getScores(jobBulletPoints, resumeBulletPoints);
      setJobBulletPointResponseScores(Array.from(typedBullePointScores));
      setUpperScoreLimit(meanPlusOneStdVariation);
      setLowerScoreLimit(meanMinusOneStdVariation);
      setBestMatchingPairs(bestMatchingPairs);
      setIsLoading(false);
  
      // TODO: remove
      console.log(`took ${(performance.now() - start) / 1000} seconds`)
    };
  
    if (jobBulletPoints.length && resumeBulletPoints.length) {
      analyzeScores()
    }
  }, [jobBulletPoints, resumeBulletPoints]);

  return (
    <div className="w-3/5 mx-auto mt-12">
      {!isLoaded && <Transition 
        in={isLoading}
        timeout={duration}
        onExiting={() => setIsLoaded(true)}
      >
        {state => (
          <Loading className={`transition-opacity duration-500 ${transitionStyles[state]}`} />
        )}
      </Transition>}
      {isLoaded && <>
        <div className=" border p-4 border-2 border-brightgreen rounded-xl bg-white shadow">
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium">These job points are well covered</span>
            <IconContext.Provider value={{ className: "text-4xl text-brightgreen" }}>
              <FaThumbsUp />
            </IconContext.Provider>
          </div>
          <div>
            {
              jobBulletPointResponseScores.map((score, index) => {
                if (score > upperScoreLimit) {
                  return (
                    <div className="flex items-center my-3">
                      <IconContext.Provider value={{ className: "min-w-min min-h-min mr-4 text-md text-black" }}>
                        <BsDot />
                      </IconContext.Provider>
                      <span className="text-sm">{jobBulletPoints[index]}</span>
                    </div>
                  )
                } else {
                  return null;
                }
              })
            }
          </div>
        </div>
        <div className="mt-4 border p-4 border-2 border-lightred rounded-xl bg-white shadow">
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium">These job points are poorly covered</span>
            <IconContext.Provider value={{ className: "text-4xl text-lightred" }}>
              <FaThumbsDown />
            </IconContext.Provider>
          </div>
          <div>
            {
              jobBulletPointResponseScores.map((score, index) => {
                if (score < lowerScoreLimit) {
                  return (
                    <div className="flex items-center my-3">
                      <IconContext.Provider value={{ className: "min-w-min min-h-min mr-4 text-md text-black" }}>
                        <BsDot />
                      </IconContext.Provider>
                      <span className="text-sm">{jobBulletPoints[index]}</span>
                    </div>
                  )
                } else {
                  return null;
                }
              })
            }
          </div>
        </div>
      </>
      }
      {
        bestMatchingPairs.map(({ queryIndex, responseIndex, score }) => <p>{`query ${queryIndex} and response ${responseIndex} are a great match with a score of ${score}`}</p>)
      }
    </div>
  );
};

export { Results };
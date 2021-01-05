import React, { FunctionComponent, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';

import { Loading } from '../index';

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
    <>
      {!isLoaded && <Transition 
        in={isLoading}
        timeout={duration}
        onExited={() => setIsLoaded(true)}
      >
        {state => (
          <Loading className={`transition-opacity duration-500 ${transitionStyles[state]}`} />
        )}
      </Transition>}
      
      {/* TODO: remove */}
      {/* <Loading className={``} /> */}

      {
        jobBulletPointResponseScores.map((score, index) => {
          if (score > upperScoreLimit) {
            return <p>{`Job Bullet point ${index} is well covered! score: ${score}`}</p>
          } else {
            return <></>
          }
        })
      }
      {
        jobBulletPointResponseScores.map((score, index) => {
          if (score < lowerScoreLimit) {
            return <p>{`Job Bullet point ${index} is poorly covered! score: ${score}`}</p>
          } else {
            return <></>
          }
        })
      }
      {
        bestMatchingPairs.map(({ queryIndex, responseIndex, score }) => <p>{`query ${queryIndex} and response ${responseIndex} are a great match with a score of ${score}`}</p>)
      }
    </>
  );
};

export { Results };
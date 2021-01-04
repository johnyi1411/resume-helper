import React, { FunctionComponent, useState } from 'react';
import { getScores } from '../model';
import { BestMatchingQueryResponsePair } from '../types';

type EvaluatorProps = {
  jobBulletPoints: string[];
  resumeBulletPoints: string[];
}

const Evaluator: FunctionComponent<EvaluatorProps> = ({ jobBulletPoints, resumeBulletPoints }) => {
  const jobBulletPointResponseScoresInitialValue: number[] = [];
  const [jobBulletPointResponseScores, setJobBulletPointResponseScores] = useState(jobBulletPointResponseScoresInitialValue);
  const [upperScoreLimit, setUpperScoreLimit] = useState(0);
  const [lowerScoreLimit, setLowerScoreLimit] = useState(0);

  const bestMatchingPairsInitialValue: BestMatchingQueryResponsePair[] = [];
  const [bestMatchingPairs, setBestMatchingPairs] = useState(bestMatchingPairsInitialValue);

  const handleSubmit = async () => {
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

    // TODO: remove
    console.log(`took ${(performance.now() - start) / 1000} seconds`)
  }

  const printScore = (score: number, index: number) => {
    return `job point ${index}, resume coverage score: ${score}`;
  }

  return (
    <>
      <input type="submit" onClick={handleSubmit}></input>
      {
        jobBulletPointResponseScores.map((score, index) => <p>{printScore(score, index)}</p>)
      }
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
  )
};

export default Evaluator;
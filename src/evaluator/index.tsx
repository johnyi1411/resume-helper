import React, { FunctionComponent, useState } from 'react';
import { getScores } from '../model';

type EvaluatorProps = {
  jobBulletPoints: string[];
  resumeBulletPoints: string[];
}

const Evaluator: FunctionComponent<EvaluatorProps> = ({ jobBulletPoints, resumeBulletPoints }) => {
  const initialValue: number[] = [];
  const [jobBulletPointResponseScores, setJobBulletPointResponseScores] = useState(initialValue);
  const [upperScoreLimit, setUpperScoreLimit] = useState(0);
  const [lowerScoreLimit, setLowerScoreLimit] = useState(0);

  const handleSubmit = async () => {
    const {
      queryResponseScores: typedBullePointScores,
      meanPlusOneStdVariation,
      meanMinusOneStdVariation
    } = await getScores(jobBulletPoints, resumeBulletPoints);
    setJobBulletPointResponseScores(Array.from(typedBullePointScores));
    setUpperScoreLimit(meanPlusOneStdVariation);
    setLowerScoreLimit(meanMinusOneStdVariation);
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
    </>
  )
};

export default Evaluator;
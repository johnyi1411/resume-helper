import React, { FunctionComponent, useState } from 'react';
import { getModel } from '../model';

type EvaluatorProps = {
  jobBulletPoints: string[];
  resumeBulletPoints: string[];
}

const Evaluator: FunctionComponent<EvaluatorProps> = ({ jobBulletPoints, resumeBulletPoints }) => {
  const initialValue: number[] = [];
  const [jobBulletPointResponseScores, setJobBulletPointResponseScores] = useState(initialValue);

  const handleSubmit = async () => {
    const typedBullePointScores = await getModel(jobBulletPoints, resumeBulletPoints);
    setJobBulletPointResponseScores(Array.from(typedBullePointScores));
  }

  const printScore = (score: number, index: number) => {
    return `job point ${index + 1}, resume coverage score: ${score}`;
  }

  return (
    <>
      <input type="submit" onClick={handleSubmit}></input>
      <React.Fragment>
        {
          jobBulletPointResponseScores.map((score, index) => <p>{printScore(score, index)}</p>)
        }
      </React.Fragment>
    </>
  )
};

export default Evaluator;
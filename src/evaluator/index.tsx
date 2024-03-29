import { useState } from 'react';
import { getScores } from '../model';
import { BestMatchingQueryResponsePair } from '../types';

const evaluator = (jobBulletPoints: string[], resumeBulletPoints: string[]) => {
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

  return {
    jobBulletPointResponseScores,
    upperScoreLimit,
    lowerScoreLimit,
    bestMatchingPairs,
  }
};

export default evaluator;
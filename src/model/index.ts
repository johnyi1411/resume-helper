import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { Tensor } from '@tensorflow/tfjs';
import { BestMatchingQueryResponsePair } from '../types';

const NUM_AXIS = 1;

export const getScores = async (
  jobBulletPoints: Array<string>,
  resumeBulletPoints: Array<string>,
) => {
  const input = {
    queries: jobBulletPoints,
    responses: resumeBulletPoints
  }

  const model = await use.loadQnA();
  const modelOutput = model.embed(input);
  const queryResponseDotProductTensor = modelOutput['queryEmbedding'].matMul(modelOutput['responseEmbedding'], false, true); 

  return {
    ...(await jobBulletPointResponseScores(queryResponseDotProductTensor)),
    bestMatchingPairs: await getBestMatchingPointPairs(queryResponseDotProductTensor)
  };
};

export const jobBulletPointResponseScores = async (queryResponseDotProductTensor: Tensor) => {
  const queryResponseScoresSum = queryResponseDotProductTensor.sum(NUM_AXIS);

  const { mean: queryResponseScoresSumMean, variance: queryResponseScoresSumVariance } = tf.moments(queryResponseScoresSum);

  const meanPlusOneStdVariation =  Number(await queryResponseScoresSumMean.add(queryResponseScoresSumVariance.sqrt()).data());
  const meanMinusOneStdVariation = Number(await queryResponseScoresSumMean.sub(queryResponseScoresSumVariance.sqrt()).data()); 
  
  return {
    queryResponseScores: await queryResponseScoresSum.data(),
    meanPlusOneStdVariation,
    meanMinusOneStdVariation
  }
}

export const getBestMatchingPointPairs = async (queryResponseDotProductTensor: Tensor) => {
  const queryResponseMaxScores = await queryResponseDotProductTensor.max(NUM_AXIS).data();
  const queryResponseMaxScoreIndices = await queryResponseDotProductTensor.argMax(NUM_AXIS).data();

  const { mean: queryResponseScoresMean, variance: queryResponseScoresVariance } = tf.moments(queryResponseDotProductTensor);
  const meanPlusOneStdVariation = Number(await queryResponseScoresMean.add(queryResponseScoresVariance.sqrt()).data());

  const bestMatchingPairsAboveOneStdDeviation: BestMatchingQueryResponsePair[] = [];

  console.log('plus one: ', meanPlusOneStdVariation);

  queryResponseMaxScores.forEach((maxScore: number, queryIndex: number) => {
    if (maxScore > meanPlusOneStdVariation) {
      bestMatchingPairsAboveOneStdDeviation.push({
        queryIndex,
        responseIndex: queryResponseMaxScoreIndices[queryIndex],
        score: maxScore
      });
    }
  });

  return bestMatchingPairsAboveOneStdDeviation;
};
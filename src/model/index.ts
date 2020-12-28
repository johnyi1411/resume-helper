import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { ModelOutput } from '@tensorflow-models/universal-sentence-encoder/dist/use_qna';

type BestMatchingQueryResponsePair = {
  queryIndex: number,
  responseIndex: number,
  score: number
}

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
  console.log('best match: ', await getBestMatchingPointPairs(modelOutput));
  return await jobBulletPointResponseScores(modelOutput);
};

export const jobBulletPointResponseScores = async (modelOutput: ModelOutput) => {
  const queryResponseScoresSum = modelOutput['queryEmbedding'].matMul(modelOutput['responseEmbedding'], false, true).sum(NUM_AXIS);

  const { mean: queryResponseScoresSumMean, variance: queryResponseScoresSumVariance } = tf.moments(queryResponseScoresSum);

  const meanPlusOneStdVariation =  Number(await queryResponseScoresSumMean.add(queryResponseScoresSumVariance.sqrt()).data());
  const meanMinusOneStdVariation = Number(await queryResponseScoresSumMean.sub(queryResponseScoresSumVariance.sqrt()).data()); 
  
  return {
    queryResponseScores: await queryResponseScoresSum.data(),
    meanPlusOneStdVariation,
    meanMinusOneStdVariation
  }
}

export const getBestMatchingPointPairs = async (modelOutput: ModelOutput) => {
  const queryResponseScores = modelOutput['queryEmbedding'].matMul(modelOutput['responseEmbedding'], false, true);
  const queryResponseMaxScores = await queryResponseScores.max(NUM_AXIS).data();
  const queryResponseMaxScoreIndices = await queryResponseScores.argMax(NUM_AXIS).data();

  const { mean: queryResponseScoresMean, variance: queryResponseScoresVariance } = tf.moments(queryResponseScores);
  const meanPlusOneStdVariation = Number(await queryResponseScoresMean.add(queryResponseScoresVariance.sqrt()).data());

  console.log('scores: ', queryResponseScores.print());
  console.log('mean: ', queryResponseScoresMean.print());
  console.log('variance: ', queryResponseScoresVariance.print());

  console.log('max scores: ', queryResponseMaxScores);
  console.log('max score indices: ', queryResponseMaxScoreIndices);

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
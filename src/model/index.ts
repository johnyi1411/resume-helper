import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { ModelOutput } from '@tensorflow-models/universal-sentence-encoder/dist/use_qna';

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
  return await jobBulletPointResponseScores(modelOutput);
};

export const jobBulletPointResponseScores = async (modelOutput: ModelOutput) => {
  const NUM_AXIS = 1;
  const queryResponseScoresSum = modelOutput['queryEmbedding'].matMul(modelOutput['responseEmbedding'], false, true).sum(NUM_AXIS);

  const { mean, variance } = tf.moments(queryResponseScoresSum);

  const meanPlusOneStdVariation = Number(mean.add(variance.sqrt()).dataSync());
  const meanMinusOneStdVariation = Number(mean.sub(variance.sqrt()).dataSync()); 
  
  return {
    queryResponseScores: await queryResponseScoresSum.data(),
    meanPlusOneStdVariation,
    meanMinusOneStdVariation
  }
}
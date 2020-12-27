import '@tensorflow/tfjs-node';
import use from '@tensorflow-models/universal-sentence-encoder';
import { dotProduct } from './helpers';

const calculateScores = async (
  jobBulletPoints: Array<string>,
  resumeBulletPoints: Array<string>,
) => {
  const input = {
    queries: jobBulletPoints,
    responses: resumeBulletPoints
  }

  const model = await use.loadQnA();

  const result = model.embed(input);
    // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
    // So in this example `embeddings` has the shape [2, 512].

  const query = result['queryEmbedding'].arraySync();
  const answers = result['responseEmbedding'].arraySync();

  for (let queryIndex = 0; queryIndex < query.length; queryIndex++) {
    for (let answerIndex = 0; answerIndex < answers.length; answerIndex++) {
      const score = dotProduct(query[queryIndex], answers[answerIndex]);
      console.log(`QnA score for query ${queryIndex + 1}, answer ${answerIndex + 1}: ${score}`);
    }
  }
};

import React from 'react';
import './index.css';

import Evaluator from './evaluator';
import { useTextAreaWithoutAsciiCharacters } from './hooks';
import { TwoColumnGridDiv, TextArea } from './styles';
import { Landing } from './pages';

const App = () => {
  const { value: job, bind: bindJob } = useTextAreaWithoutAsciiCharacters('');
  const { value: resume, bind: bindResume } = useTextAreaWithoutAsciiCharacters('');

  const jobBulletPoints = job.split('\n');
  const resumeBulletPoints = resume.split('\n');

  return (
    <>
      {/* <TwoColumnGridDiv>
        <div>
          <TextArea {...bindJob} />
          <div>
            {jobBulletPoints.map((bulletPoint, bulletPointIndex) => <p key={bulletPointIndex}>{`${bulletPointIndex}: ${bulletPoint}`}</p>)}
          </div>
        </div>
        <div>
          <TextArea {...bindResume} />
          <div>
            {resumeBulletPoints.map((bulletPoint, bulletPointIndex) => <p key={bulletPointIndex}>{`${bulletPointIndex}: ${bulletPoint}`}</p>)}
          </div>
        </div>
      </TwoColumnGridDiv>
      {
        job && resume && 
        <Evaluator
          jobBulletPoints={jobBulletPoints}
          resumeBulletPoints={resumeBulletPoints}
        />
      } */}
      <Landing />
    </>
  );
};

export default App;
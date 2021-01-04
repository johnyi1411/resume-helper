import React, { FunctionComponent } from 'react';

type LoadingProps = {
  className: string,
};

const Loading: FunctionComponent<LoadingProps> = ({ className }) => {
  return <div className={`${className} fixed top-0 left-0 w-screen h-screen bg-lightgreen`}>whoa</div>
};

export { Loading };
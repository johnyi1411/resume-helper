import React, { FunctionComponent } from 'react';
import { IconContext } from "react-icons";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type LoadingProps = {
  className: string,
};

const Loading: FunctionComponent<LoadingProps> = ({ className }) => {
  return (
      <div className={`${className} fixed top-0 left-0 w-screen h-screen bg-lightgreen`}>
        whoa
        <IconContext.Provider value={{ className: "animate-spin text-6xl text-darkblue" }}>
          <AiOutlineLoading3Quarters />
        </IconContext.Provider>
      </div>
  );
};

export { Loading };
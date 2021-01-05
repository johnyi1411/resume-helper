import React, { FunctionComponent } from 'react';
import { IconContext } from "react-icons";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type LoadingProps = {
  className: string,
};

const Loading: FunctionComponent<LoadingProps> = ({ className }) => {
  return (
      <div className={`${className} fixed top-0 left-0 w-screen h-screen bg-lightgreen`}>
        <div className="flex flex-col w-full h-full items-center justify-center">
          <IconContext.Provider value={{ className: "animate-spin text-6xl text-gray-600" }}>
            <AiOutlineLoading3Quarters />
          </IconContext.Provider>
          <span className="text-3xl mt-4 text-gray-800">Calculating Results</span>
        </div>
      </div>
  );
};

export { Loading };
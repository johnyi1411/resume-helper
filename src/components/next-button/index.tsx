import React from 'react';
import { IconContext } from "react-icons";
import { FcNext } from 'react-icons/fc';

const NextButton = () => (
  <div className="fixed bottom-1/16 right-1/16 bg-white rounded-full justify-center text-center text-3xl text-darkgreen shadow hover:bg-gray-100">
    <IconContext.Provider value={{ className: "m-2" }}>
      <FcNext />
    </IconContext.Provider>
  </div>
)

export { NextButton };
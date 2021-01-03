import React from 'react';
import { IconContext } from "react-icons";
import { IoDocumentTextOutline } from 'react-icons/io5';

const Header = () => {
  return (
    <div className="flex content-center">
      <IconContext.Provider value={{ className: "text-6xl text-darkblue" }}>
        <IoDocumentTextOutline />
      </IconContext.Provider>
      <span className="text-4xl self-center text-darkblue">Resume Helper</span>
    </div>
  )
};

export { Header };
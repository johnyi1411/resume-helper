import React from 'react';
import { Link } from "react-router-dom";

import { About, Header } from '../../components';

const Job = () => {
  return (
    <div className="w-3/4 mx-auto">
      <div className="flex justify-between mt-12">
        <Header />
        <About />
      </div>

      <div>
        <h1>Hello Job!</h1>
        <Link to="/">Back</Link>
      </div>
    </div>
  )
};

export { Job };
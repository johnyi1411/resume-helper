import React, { FunctionComponent } from 'react';

export type ButtonProps = {
  buttonText: string;
}

const Button: FunctionComponent<ButtonProps> = ({ buttonText }) => {
  return <input
    className="text-3xl text-white bg-darkblue py-3 px-6 rounded-xl shadow overflow-visible mb-5"
    type="submit"
    value={buttonText}
  />
};

export { Button };
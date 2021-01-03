import React, { FunctionComponent } from 'react';

export type ButtonProps = {
  buttonText: string;
  onClick: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ buttonText, onClick }) => {
  return (
    <input
      className="text-3xl text-white bg-darkblue py-3 px-6 rounded-xl shadow overflow-visible mb-5"
      onClick={onClick}
      type="submit"
      value={buttonText}
    />
  )
};

export { Button };
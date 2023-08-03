import React from 'react';

type Props = {
  inputPlaceholder: string;
  height: string;
  label?: string;
};

const TextBox = (props: Props) => {
  return (
    <div className="flex flex-col w-full mb-5">
      {props.label ? <label className='self-start text-lg font-bold'>{props.label}</label> : null}
      <input
        placeholder={props.inputPlaceholder}
        className={`bg-gray-100 rounded-lg p-5 w-full ${props.height} focus:outline-none`}
      ></input>
    </div>
  );
};

export default TextBox;

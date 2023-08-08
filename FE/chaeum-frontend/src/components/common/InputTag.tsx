import { Input } from '@material-tailwind/react';
import React from 'react';

type Props = {
  label: string;
  width?: string;
  className?: string;
};

const InputTag = ({ width = 'w-full', ...props }: Props) => {
  return (
    <div className={`flex flex-col ${width}`}>
      <div className="bg-white w-full bg-opacity-50 rounded-md border-chaeum-gray-500/80  text-blue-gray-400 flex flex-col flex-wrap justify-left items-start">
        <Input
          type="text"
          // label={props.label}
          placeholder={props.label}
          className=" !border-t-blue-gray-200 focus:!border-t-blue-500"
          labelProps={{
            className: 'animate:none',
          }}
          containerProps={{
            className: 'min-w-0',
          }}
        />
      </div>
    </div>
  );
};

export default InputTag;

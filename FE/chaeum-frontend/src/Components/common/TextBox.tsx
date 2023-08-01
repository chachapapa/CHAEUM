import React from 'react';
import { Textarea } from '@material-tailwind/react';

type Props = {
  inputPlaceholder : string;
}

const TextBox = (props : Props) => {
  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-lg  bg-gray-100">
      <Textarea
        rows={1}
        placeholder={props.inputPlaceholder}
        className="min-h-full !border-0 focus:border-transparent w-72"
        containerProps={{
          className: 'grid h-full',
        }}
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
      />
    </div>
  );
};

export default TextBox;

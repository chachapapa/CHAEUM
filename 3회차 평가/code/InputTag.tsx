import { Input } from '@material-tailwind/react';
import React from 'react';

type Props = {
  label : string;
}

const InputTag = (props : Props) => {
  return (
    <div className="w-72">
      <Input label={props.label} />
    </div>
  );
};

export default InputTag;
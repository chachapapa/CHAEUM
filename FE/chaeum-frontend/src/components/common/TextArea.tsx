import React, { useEffect, useState } from 'react';
import { Textarea } from '@material-tailwind/react';
import { ColorVariation } from '../Types';

type Props = {
  inputPlaceholder: string;
  height: string;
};



const TextArea = (props: Props) => {

  return (
    <textarea
      className={`bg-gray-100 ${props.height} rounded-lg w-full p-3 outline-none resize-none`}
      placeholder={props.inputPlaceholder}
      
    />
  );
};

export default TextArea;

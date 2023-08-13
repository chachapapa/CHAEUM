import React, { useEffect, useState } from 'react';
import { Textarea } from '@material-tailwind/react';
import { ColorVariation } from '../Types';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setArticleContent } from '../../features/states/states';

type Props = {
  inputPlaceholder: string;
  height: string;
};



const TextArea = (props: Props) => {

  const dispatch = useAppDispatch();

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setArticleContent(e.target.value));
  };

  return (
    <textarea
      className={`bg-gray-100 ${props.height} rounded-lg w-full p-3 outline-none resize-none`}
      placeholder={props.inputPlaceholder}
      onChange={onTextAreaChange}
    />
  );
};

export default TextArea;

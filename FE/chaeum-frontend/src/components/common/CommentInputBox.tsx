import React from 'react';
import { Textarea } from '@material-tailwind/react';

type Props = {
  inputPlaceholder: string;
  setCurrentComment?: React.Dispatch<React.SetStateAction<string>>;
};

const CommentInputBox = (props: Props) => {
  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.setCurrentComment) {
      props.setCurrentComment(e.target.value);
    }
  };

  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-lg  bg-gray-100">
      <Textarea
        rows={1}
        placeholder={props.inputPlaceholder}
        className={'min-h-full !border-0 focus:border-transparent w-72'}
        containerProps={{
          className: 'grid h-full',
        }}
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        onChange={onCommentChange}
      />
    </div>
  );
};

export default CommentInputBox;

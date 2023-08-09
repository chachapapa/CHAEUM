import React from 'react';
import { Streak } from '../Types';

type Props = {
  inputPlaceholder: string;
  height: string;
  label?: string;
  isDuplicationTested?: number;
  setNickname?: React.Dispatch<React.SetStateAction<string>>;
  setAnotherStreak? : React.Dispatch<React.SetStateAction<Streak>>;
};

const TextBox = (props: Props) => {

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.setNickname) {
      props.setNickname(e.target.value);
    }else if(props.setAnotherStreak){
      props.setAnotherStreak({categoryMain:'기타', categoryMiddle:e.target.value});
    }
  };

  return (
    <div
      className={
        props.isDuplicationTested === 0 || !props.isDuplicationTested
          ? 'flex flex-col w-full mb-5'
          : 'flex flex-col w-full'
      }
    >
      {props.label ? (
        <label className="self-start text-lg font-bold">{props.label}</label>
      ) : null}
      <input
        placeholder={props.inputPlaceholder}
        className={
          props.isDuplicationTested === 1
            ? `bg-gray-100 rounded-lg p-5 w-full ${props.height} outline outline-chaeum-blue-500`
            : props.isDuplicationTested === 2
              ? `bg-gray-100 rounded-lg p-5 w-full ${props.height} outline outline-red-400`
              : `bg-gray-100 rounded-lg p-5 w-full ${props.height} focus:outline-none`
        }
        onChange={onTextChange}
      ></input>
      {props.isDuplicationTested === 1 ? (
        <label className="self-start text-sm font-normal text-chaeum-blue-500 ml-2">
          사용 가능한 닉네임입니다.
        </label>
      ) : props.isDuplicationTested === 2 ? (
        <label className="self-start text-sm font-normal text-red-500 ml-2">
          이미 존재하는 닉네임입니다.
        </label>
      ) : null}
    </div>
  );
};

export default TextBox;

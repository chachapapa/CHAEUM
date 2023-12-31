import { Input } from '@material-tailwind/react';
import React from 'react';
import { User } from '../Types';
import axios from 'axios';

type Props = {
  label?: string;
  width?: string;
  className?: string;
  searchKeyword?: string;
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string>>;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
  for?: string;
  value?: string; // value 속성 추가
  onChange?: (value: string) => void; // onChange 콜백 추가
};

// const USER_SEARCH_URL =
//   'http://i9a810.p.ssafy.io:8080/api/user/nickname-search';
const AccessToken = localStorage.getItem('access_token');

const InputTag = ({ width = 'w-full', ...props }: Props) => {
  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.setSearchKeyword) {
      console.log('keyword');
      props.setSearchKeyword(e.target.value);
    } else if (props.setUser) {
      if (props.for === 'introduction') {
        props.setUser(prev => ({
          ...prev,
          introduce: e.target.value,
        }));
      } else if (props.for === 'height') {
        props.setUser(prev => ({
          ...prev,
          height: e.target.value,
        }));
      } else if (props.for === 'weight') {
        props.setUser(prev => ({
          ...prev,
          weight: e.target.value,
        }));
      }
    } else if (props.onChange !== undefined) {
      props.onChange(e.target.value);
    }
  };

  return (
    <div className={`flex flex-col ${width}`}>
      <div className="bg-white w-full bg-opacity-50 rounded-md border-chaeum-gray-500/80  text-blue-gray-400 flex flex-col flex-wrap justify-left items-start">
        <Input
          type="text"
          // label={props.label}
          placeholder={props.label}
          className=" !border-t-blue-gray-200 focus:!border-chaeum-blue-500"
          labelProps={{
            className: 'animate:none',
          }}
          containerProps={{
            className: 'min-w-0',
          }}
          onChange={onKeywordChange}
          defaultValue={props.value}
        />
      </div>
    </div>
  );
};

export default InputTag;

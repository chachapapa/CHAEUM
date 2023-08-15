import { Input } from '@material-tailwind/react';
import React from 'react';

type Props = {
  label?: string;
  width?: string;
  className?: string;
  value?: string; // value 속성 추가
  onChange?: (value: string) => void; // onChange 콜백 추가
};

const InputTag = ({ width = 'w-full', ...props }: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (props.onChange) {
      props.onChange(newValue); // 상위 컴포넌트의 onChange 콜백 호출
    }
  };
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
          onChange={handleInputChange} // 지역 핸들러 연결
          defaultValue={props.value}
        />
      </div>
    </div>
  );
};

export default InputTag;

import React from 'react';
import { Select, Option } from '@material-tailwind/react';
 
const Dropdown = () => {
  return (
    <div className='flex w-80 flex-col gap-6'>
      <Select color='blue' label='운동 카테고리를 고르세요.'>
        <Option>수영</Option>
        <Option>러닝</Option>
        <Option>헬스</Option>
        <Option>자전거</Option>
        <Option>클라이밍</Option>
      </Select>
    </div>
  );
};

export default Dropdown;
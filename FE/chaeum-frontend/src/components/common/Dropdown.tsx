import { Select, Option } from '@material-tailwind/react';
import React from 'react';
import '../styles/select.css';

type MiddleCategory = {
  id : number;
  name : string;
}[]

type Props = {
  mainCategory : string;
} 

const middleCategory = [{id:0,name:'수영'},{id:1, name:'러닝'}, {id:2, name:'헬스'}, {id:3, name:'자전거'}, {id:4, name:'클라이밍'}];

const Dropdown = ({mainCategory}:Props) => {
  return (

    <div className="mySelect flex flex-col w-full mb-5">
      <label className='self-start text-lg font-bold'>{mainCategory}</label>
      <Select className="h-16 bg-gray-100">
        {middleCategory.map( category => (
          <Option key={category.id}>{category.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;

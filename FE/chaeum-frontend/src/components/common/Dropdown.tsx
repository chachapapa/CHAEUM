import { Select, Option } from '@material-tailwind/react';
import React from 'react';
import '../styles/select.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import states, { setInitialSportsStreak, setInitialStudyStreak } from '../../features/states/states';


type Props = {
  mainCategory: string;
};

const SportsMiddleCategory = [
  { id: 0, name: '수영' },
  { id: 1, name: '러닝' },
  { id: 2, name: '헬스' },
  { id: 3, name: '자전거' },
  { id: 4, name: '클라이밍' },
];
const StudyMiddleCategory = [
  { id: 0, name: '수능' },
  { id: 1, name: '3월 모의고사' },
  { id: 2, name: '6월 모의고사' },
  { id: 3, name: '9월 모의고사' },
  { id: 4, name: '자격증' },
];



const Dropdown = ({ mainCategory }: Props) => {


  const dispatch = useAppDispatch();
  // const studycategory = useAppSelector(state => state.stateSetter.initialStudyStreak);
  // const sportcategory = useAppSelector(state => state.stateSetter.initialSportsStreak);

  // console.log(studycategory);
  // console.log(sportcategory);

  const onMiddleCategoryChange = (value : string | undefined) => {
    if(mainCategory === '운동' && typeof value === 'string'){
      dispatch(setInitialSportsStreak({categoryMain:'운동', categoryMiddle:value}));
    }else if(mainCategory === '공부' && typeof value === 'string'){
      dispatch(setInitialStudyStreak({categoryMain:'공부', categoryMiddle:value}));
    }
  };

  

  return (
    <div className="mySelect flex flex-col w-full mb-5">
      <label className="self-start text-lg font-bold">{mainCategory}</label>
      <Select className="h-16 bg-gray-100" onChange={onMiddleCategoryChange} >
        {mainCategory === '운동'
          ? SportsMiddleCategory.map(category => (
            <Option key={category.id} value={category.name}>{category.name}</Option>
          ))
          : StudyMiddleCategory.map(category => (
            <Option key={category.id} value={category.name}>{category.name}</Option>
          ))}
      </Select>
    </div>
  );
};

export default Dropdown;

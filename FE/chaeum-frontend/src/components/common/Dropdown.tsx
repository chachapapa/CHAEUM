import { Select, Option } from '@material-tailwind/react';
import React from 'react';
import '../styles/select.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import states, {
  setInitialSportsStreak,
  setInitialStudyStreak,
} from '../../features/states/states';

type Props = {
  mainCategory: string;
  middleCategoryList: string[];
};

const Dropdown = ({ mainCategory, middleCategoryList }: Props) => {
  console.log('중분류 왜 안뜸'+middleCategoryList);
  const dispatch = useAppDispatch();
  // const studyMiddleCategory = useAppSelector(state => state.stateSetter.initialStudyStreak);
  // const sportMiddleCategory = useAppSelector(state => state.stateSetter.initialSportsStreak);

  // console.log(studycategory);
  // console.log(sportcategory);

  const onMiddleCategoryChange = (value: string | undefined) => {
    if (mainCategory === '운동' && typeof value === 'string') {
      dispatch(
        setInitialSportsStreak({ categoryMain: '운동', categoryMiddle: value })
      );
    } else if (mainCategory === '공부' && typeof value === 'string') {
      dispatch(
        setInitialStudyStreak({ categoryMain: '공부', categoryMiddle: value })
      );
    }
  };

  return (
    <div className="mySelect flex flex-col w-full mb-5">
      <label className="self-start text-lg font-bold">{mainCategory}</label>
      <Select  className="h-16 bg-gray-100" onChange={onMiddleCategoryChange}>
        {middleCategoryList.map((category, index) => (
          <Option key={index} value={category}>
            {category}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;

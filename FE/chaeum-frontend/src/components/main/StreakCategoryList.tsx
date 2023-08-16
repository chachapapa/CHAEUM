import React from 'react';

const categoryList: {
  categoryID: number;
  mainCategory: '운동' | '공부' | '기타' | '';
  middleCategory: string;
}[] = [
  { categoryID: 1, mainCategory: '운동', middleCategory: '달리기' },
  { categoryID: 2, mainCategory: '운동', middleCategory: '축구' },
  { categoryID: 3, mainCategory: '운동', middleCategory: '농구' },
  { categoryID: 4, mainCategory: '운동', middleCategory: '헬스' },
  { categoryID: 5, mainCategory: '운동', middleCategory: '클라이밍' },
  { categoryID: 6, mainCategory: '운동', middleCategory: '자전거' },
  { categoryID: 7, mainCategory: '운동', middleCategory: '탁구' },
  { categoryID: 8, mainCategory: '운동', middleCategory: '배드민턴' },
  { categoryID: 9, mainCategory: '운동', middleCategory: '테니스' },
  { categoryID: 10, mainCategory: '운동', middleCategory: ' 태권도' },
  { categoryID: 11, mainCategory: '운동', middleCategory: ' 복싱' },
  { categoryID: 12, mainCategory: '운동', middleCategory: ' 유도' },
  { categoryID: 13, mainCategory: '운동', middleCategory: ' 골프' },
  { categoryID: 14, mainCategory: '운동', middleCategory: ' 야구' },
  { categoryID: 15, mainCategory: '운동', middleCategory: ' 스케이트보드' },
  { categoryID: 16, mainCategory: '운동', middleCategory: ' 기타' },
  { categoryID: 17, mainCategory: '공부', middleCategory: ' 코딩' },
  { categoryID: 18, mainCategory: '공부', middleCategory: ' 독서' },
  { categoryID: 19, mainCategory: '공부', middleCategory: ' 어학시험' },
  { categoryID: 20, mainCategory: '공부', middleCategory: ' 공무원시험' },
  { categoryID: 21, mainCategory: '공부', middleCategory: ' 자격증시험' },
  { categoryID: 22, mainCategory: '공부', middleCategory: ' 학교시험' },
  { categoryID: 23, mainCategory: '공부', middleCategory: ' 인터넷강의' },
  { categoryID: 24, mainCategory: '공부', middleCategory: ' 기타' },
  { categoryID: 25, mainCategory: '기타', middleCategory: ' 기타' },
  { categoryID: 26, mainCategory: '운동', middleCategory: ' 수영' },
];

export const getCategory = (categoryID: number) => {
  return {
    mainCategory: categoryList[categoryID - 1].mainCategory,
    middleCategory: categoryList[categoryID - 1].middleCategory,
  };
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Streak } from '../../components/Types';

// 1. initial state type 생성
export type State = {
  nickname: string;
  initialStudyStreak : Streak;
  initialSportsStreak : Streak;
  initialMyStreak : Streak;
  tabNumber: number;
  
};
// 1-1. initial state 객체 생성
const initialState: State = {
  nickname: '',
  initialStudyStreak : {categoryMain:'공부', categoryMiddle:'기타'},
  initialSportsStreak : {categoryMain : '운동', categoryMiddle:'기타'},
  initialMyStreak : {categoryMain : '기타', categoryMiddle:'기타'},
  tabNumber: 0,
};

// 2. slice 생성 : createSlice
const Slice = createSlice({
  name: 'stateSetter',
  initialState,
  reducers: {
    // reducer의 각각은 action의 역할을 함. state의 변화를 구현. immer.js를 내장하고 있어 return이 필요없다.
    setFixedNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },

    setInitialStudyStreak: (state, action: PayloadAction<Streak>) => {
      state.initialStudyStreak = action.payload;
    },

    setInitialSportsStreak: (state, action: PayloadAction<Streak>) => {
      state.initialSportsStreak = action.payload;
    },

    setInitialMyStreak: (state, action: PayloadAction<Streak>) => {
      state.initialMyStreak = action.payload;
    },

    setCurrentTab: (state, action: PayloadAction<number>) => {
      state.tabNumber = action.payload;
    },
  },
});

// 3. export

// 3-1. export actions
export const { setCurrentTab, setFixedNickname, setInitialStudyStreak, setInitialSportsStreak, setInitialMyStreak } = Slice.actions;
// 3-2. export default slice.reducer
export default Slice.reducer;

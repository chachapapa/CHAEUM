import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. initial state type 생성
export type TabState = {
  tabNumber: number
}
// 1-1. initial state 객체 생성
const initialState: TabState = {
  tabNumber: 0,
};

// 2. slice 생성 : createSlice
const tabSlice = createSlice({
  name: 'tabNumberSetter',
  initialState,
  reducers: {
    // reducer의 각각은 action의 역할을 함. state의 변화를 구현. immer.js를 내장하고 있어 return이 필요없다.
    setCurrentTab : (state, action: PayloadAction<number>) => {
      state.tabNumber = action.payload;
    }
  },
});

// 3. export

// 3-1. export actions
export const { setCurrentTab } = tabSlice.actions;
// 3-2. export default slice.reducer
export default tabSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. initial state type 생성
export type State = {
  nickname: string;
};
// 1-1. initial state 객체 생성
const initialState: State = {
  nickname: '',
};

// 2. slice 생성 : createSlice

const userSlice = createSlice({
  name: 'userStateSetter',
  initialState,
  reducers: {
    setMyNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

// 3. export

// 3-1. export actions
export const { setMyNickname } = userSlice.actions;
// 3-2. export default slice.reducer
export default userSlice.reducer;

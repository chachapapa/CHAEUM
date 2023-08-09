import { configureStore } from '@reduxjs/toolkit';
import TabReducer from './features/tab/tab';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    tabSetter: TabReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

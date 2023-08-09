import { configureStore } from '@reduxjs/toolkit';
import Reducer from './features/states/states';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    stateSetter: Reducer,
     modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

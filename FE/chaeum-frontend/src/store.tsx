import { configureStore } from '@reduxjs/toolkit';
import Reducer from './features/states/states';

export const store = configureStore({
  reducer: {
    stateSetter: Reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
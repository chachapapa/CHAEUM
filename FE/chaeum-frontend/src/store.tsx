import { configureStore } from '@reduxjs/toolkit';
import TabReducer from './features/tab/tab';     

export const store = configureStore({
  reducer: {
    tabSetter: TabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
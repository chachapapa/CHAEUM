import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Reducer from './features/states/states';
import userReducer from './features/states/userStates';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userPersistReducer = combineReducers({
  userStateSetter : userReducer,
});

const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['userStateSetter']
};

const persistedReducer = persistReducer(persistConfig, userPersistReducer);

export const store = configureStore({
  reducer: {
    stateSetter: Reducer,
    userStateSetter : persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

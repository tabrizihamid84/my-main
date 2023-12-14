import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth-slice';
// import projectReducer from './features/project-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { apiSlice } from '../api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

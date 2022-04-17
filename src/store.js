import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../src/features/auth/authSlice';
import searchReducer from '../src/features/search/searchSlice';
import voterReducer from '../src/features/voter/voterSlice';

export const store = configureStore({
     reducer: {
          auth:authReducer,
          voters:voterReducer
     },
});

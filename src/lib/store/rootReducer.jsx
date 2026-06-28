import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from '../features/layoutSlice';
import authReducer from '../features/authSlice';

export const rootReducer = combineReducers({
  layout : layoutReducer,
  auth   : authReducer,
});
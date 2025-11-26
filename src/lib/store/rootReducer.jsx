import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from '../features/layoutSlice';


export const rootReducer = combineReducers({
   layout : layoutReducer
})
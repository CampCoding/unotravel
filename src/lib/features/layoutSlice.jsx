import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get } from "../shared/api";
import { configs } from "../configs";
import { apiRoutes } from "../shared/routes";

const initialState = { 
  layout_data  :[],
  layout_loading:  false,
}

export const handleGetLayoutData = createAsyncThunk("layoutSlice/handleGetLayoutData",async() => {
  const response = await _get(apiRoutes.get_layout);
  return response;
})



export const layoutSlice = createSlice({
  name:"layoutSlice",
  initialState,
  extraReducers : (builder) => {
    builder
    .addCase(handleGetLayoutData.pending, (state) => {
      state.layout_loading = true;
    })
    .addCase(handleGetLayoutData.fulfilled ,(state,action) => {
      state.layout_data = action.payload;
      state.layout_loading = false;
    })
    .addCase(handleGetLayoutData.rejected ,(state) => {
      state.layout_loading = false
    })
  }
})

export default layoutSlice.reducer;
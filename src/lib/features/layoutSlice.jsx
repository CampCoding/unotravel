import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get } from "../shared/api";
import { configs } from "../configs";
import { apiRoutes } from "../shared/routes";

const initialState = {
  layout_data: [],
  layout_loading: false,
  home_data: [],
  home_loading: false,
  selectedLanguage:1
};

export const handleGetLayoutData = createAsyncThunk(
  "layoutSlice/handleGetLayoutData",
  async () => {
    const response = await _get(apiRoutes.get_layout);
    return response;
  }
);

export const handleGetHomeData = createAsyncThunk(
  "layoutSlice/handleGetHomeData",
  async () => {
    const response = await _get(apiRoutes.home_page);
    return response;
  }
);

export const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
 reducers: {
    // Reducer to set the selected language
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      
      // Optional: Save to localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem('preferred-language', action.payload);
      }
    },
    
    // Optional: Reducer to initialize language from localStorage
    initializeLanguage: (state) => {
      if (typeof window !== "undefined") {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang) {
          state.selectedLanguage = savedLang;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetLayoutData.pending, (state) => {
        state.layout_loading = true;
      })
      .addCase(handleGetLayoutData.fulfilled, (state, action) => {
        state.layout_data = action.payload;
        state.layout_loading = false;
      })
      .addCase(handleGetLayoutData.rejected, (state) => {
        state.layout_loading = false;
      })

      .addCase(handleGetHomeData.pending, (state) => {
        state.home_loading = true;
      })
      .addCase(handleGetHomeData.fulfilled, (state, action) => {
        state.home_data = action.payload;
        state.home_loading = false;
      })
      .addCase(handleGetHomeData.rejected, (state) => {
        state.home_loading = false;
      });
  },
});

export const { setSelectedLanguage, initializeLanguage } = layoutSlice.actions;

export default layoutSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  layout_data: [],
  layout_loading: false,
  home_data: null,
  home_loading: false,
  about_data: null,
  about_loading: false,
  fare_flight_data: null,
  fare_flight_loading: false,
  our_offers_data: null,
  our_offers_loading: false,
  contact_data: null,
  contact_loading: false,
  blogs_data: null,
  blogs_loading: false,
  services_data: null,
  services_loading: false,
  tours_list_data: null,
  tours_list_loading: false,
  tour_detail_data: null,
  tour_detail_loading: false,
  selectedLanguage: 1,
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

export const handleGetAboutData = createAsyncThunk(
  "layoutSlice/handleGetAboutData",
  async () => {
    const response = await _get(apiRoutes.about_page);
    return response;
  }
);

export const handleGetFareFlightData = createAsyncThunk(
  "layoutSlice/handleGetFareFlightData",
  async () => {
    const response = await _get(apiRoutes.fare_flight_page);
    return response;
  }
);

export const handleGetOurOffersData = createAsyncThunk(
  "layoutSlice/handleGetOurOffersData",
  async () => {
    const response = await _get(apiRoutes.our_offers_page);
    return response;
  }
);

export const handleGetContactData = createAsyncThunk(
  "layoutSlice/handleGetContactData",
  async () => {
    const response = await _get(apiRoutes.contact_page);
    return response;
  }
);

export const handleGetBlogsData = createAsyncThunk(
  "layoutSlice/handleGetBlogsData",
  async () => {
    const response = await _get(apiRoutes.blogs_page);
    return response;
  }
);

export const handleGetServicesData = createAsyncThunk(
  "layoutSlice/handleGetServicesData",
  async () => {
    const response = await _get(apiRoutes.services_page);
    return response;
  }
);

export const handleGetToursByDestination = createAsyncThunk(
  "layoutSlice/handleGetToursByDestination",
  async (destinationSlug) => {
    const response = await _get(apiRoutes.tours_by_destination(destinationSlug));
    return response;
  }
);

export const handleGetTourDetail = createAsyncThunk(
  "layoutSlice/handleGetTourDetail",
  async ({ destSlug, tourSlug }) => {
    const response = await _get(apiRoutes.tour_detail(destSlug, tourSlug));
    return response;
  }
);

export const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred-language", action.payload);
      }
    },
    initializeLanguage: (state) => {
      if (typeof window !== "undefined") {
        const savedLang = localStorage.getItem("preferred-language");
        if (savedLang) {
          state.selectedLanguage = Number(savedLang) || 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetLayoutData.pending, (state) => { state.layout_loading = true; })
      .addCase(handleGetLayoutData.fulfilled, (state, action) => { state.layout_data = action.payload; state.layout_loading = false; })
      .addCase(handleGetLayoutData.rejected, (state) => { state.layout_loading = false; })

      .addCase(handleGetHomeData.pending, (state) => { state.home_loading = true; })
      .addCase(handleGetHomeData.fulfilled, (state, action) => { state.home_data = action.payload; state.home_loading = false; })
      .addCase(handleGetHomeData.rejected, (state) => { state.home_loading = false; })

      .addCase(handleGetAboutData.pending, (state) => { state.about_loading = true; })
      .addCase(handleGetAboutData.fulfilled, (state, action) => { state.about_data = action.payload; state.about_loading = false; })
      .addCase(handleGetAboutData.rejected, (state) => { state.about_loading = false; })

      .addCase(handleGetFareFlightData.pending, (state) => { state.fare_flight_loading = true; })
      .addCase(handleGetFareFlightData.fulfilled, (state, action) => { state.fare_flight_data = action.payload; state.fare_flight_loading = false; })
      .addCase(handleGetFareFlightData.rejected, (state) => { state.fare_flight_loading = false; })

      .addCase(handleGetOurOffersData.pending, (state) => { state.our_offers_loading = true; })
      .addCase(handleGetOurOffersData.fulfilled, (state, action) => { state.our_offers_data = action.payload; state.our_offers_loading = false; })
      .addCase(handleGetOurOffersData.rejected, (state) => { state.our_offers_loading = false; })

      .addCase(handleGetContactData.pending, (state) => { state.contact_loading = true; })
      .addCase(handleGetContactData.fulfilled, (state, action) => { state.contact_data = action.payload; state.contact_loading = false; })
      .addCase(handleGetContactData.rejected, (state) => { state.contact_loading = false; })

      .addCase(handleGetBlogsData.pending, (state) => { state.blogs_loading = true; })
      .addCase(handleGetBlogsData.fulfilled, (state, action) => { state.blogs_data = action.payload; state.blogs_loading = false; })
      .addCase(handleGetBlogsData.rejected, (state) => { state.blogs_loading = false; })

      .addCase(handleGetServicesData.pending, (state) => { state.services_loading = true; })
      .addCase(handleGetServicesData.fulfilled, (state, action) => { state.services_data = action.payload; state.services_loading = false; })
      .addCase(handleGetServicesData.rejected, (state) => { state.services_loading = false; })

      .addCase(handleGetToursByDestination.pending, (state) => { state.tours_list_loading = true; })
      .addCase(handleGetToursByDestination.fulfilled, (state, action) => { state.tours_list_data = action.payload; state.tours_list_loading = false; })
      .addCase(handleGetToursByDestination.rejected, (state) => { state.tours_list_loading = false; })

      .addCase(handleGetTourDetail.pending, (state) => { state.tour_detail_loading = true; })
      .addCase(handleGetTourDetail.fulfilled, (state, action) => { state.tour_detail_data = action.payload; state.tour_detail_loading = false; })
      .addCase(handleGetTourDetail.rejected, (state) => { state.tour_detail_loading = false; });
  },
});

export const { setSelectedLanguage, initializeLanguage } = layoutSlice.actions;

export default layoutSlice.reducer;

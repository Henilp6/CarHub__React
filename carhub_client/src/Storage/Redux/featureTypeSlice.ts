import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featureType: [],
  search: "",
};

export const featureTypeSlice = createSlice({
  name: "FeatureType",
  initialState: initialState,
  reducers: {
    setFeatureType: (state, action) => {
      state.featureType = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setFeatureType, setSearchItem } = featureTypeSlice.actions;
export const featureTypeReducer = featureTypeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carXColor: [],
};

export const carXColorSlice = createSlice({
  name: "CarXColor",
  initialState: initialState,
  reducers: {
    setCarXColor: (carXColor, action) => {
      carXColor.carXColor = action.payload;
    },
  },
});

export const { setCarXColor } = carXColorSlice.actions;
export const carXColorReducer = carXColorSlice.reducer;

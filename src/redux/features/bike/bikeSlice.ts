import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  bikes: null,
  bike: null,
};

const bikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    addBikes: (state, action) => {
      state.bikes = action.payload;
    },
    addBike: (state, action) => {
      state.bike = action.payload;
    },
  },
});

export const { addBikes, addBike } = bikeSlice.actions;

export default bikeSlice.reducer;
export const selectBike = (state: RootState) => state.bikes.bikes;
export const selectOneBike = (state: RootState) => state.bikes.bike;

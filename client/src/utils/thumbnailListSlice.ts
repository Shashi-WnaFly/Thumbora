import { createSlice } from "@reduxjs/toolkit";
import type { IThumbnail } from "../data/dataAssets";

const thumbnailListSlice = createSlice({
  name: "thumbnailList",
  initialState: [] as IThumbnail[],
  reducers: {
    unShiftThumbnail: (state, action) => {
      state.unshift(action.payload);
    },
    pushThumbnail: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { unShiftThumbnail, pushThumbnail } = thumbnailListSlice.actions;
export default thumbnailListSlice.reducer;

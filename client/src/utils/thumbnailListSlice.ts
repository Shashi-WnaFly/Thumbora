import { createSlice } from "@reduxjs/toolkit";
import type { IThumbnail } from "../data/dataAssets";

const initialState = {
  items: [] as IThumbnail[],
  page: 1,
  hasMore: true,
};

const thumbnailListSlice = createSlice({
  name: "thumbnailList",
  initialState,
  reducers: {
    unShiftThumbnail: (state, action) => {
      state.items.unshift(action.payload);
    },

    pushThumbnail: (state, action) => {
      const incoming: IThumbnail[] = action.payload.data;

      incoming.forEach((thumbnail) => {
        if (!state.items.some((item) => item._id === thumbnail._id))
          state.items.push(thumbnail);
      });

      state.page += 1;
      state.hasMore = action.payload.hasMore;
    },

    resetThumbnailList: (state) => {
      state.items = [];
      state.hasMore = true;
      state.page = 1;
    },

    deleteThumbnail: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((thumbnail: IThumbnail) => thumbnail._id !== id);
    }
  },
});

export const { unShiftThumbnail, pushThumbnail, resetThumbnailList, deleteThumbnail } = thumbnailListSlice.actions;
export default thumbnailListSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import toastSlice from "./toastSlice";
import thumbnailListSlice from "./thumbnailListSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    toast: toastSlice,
    thumbnailList: thumbnailListSlice,
  },
});

export default appStore;

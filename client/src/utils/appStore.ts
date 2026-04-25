import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import toastSlice from "./ToastSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    toast: toastSlice,
  },
});

export default appStore;

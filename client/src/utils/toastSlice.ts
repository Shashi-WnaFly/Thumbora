import { createSlice } from "@reduxjs/toolkit";
import type { IToast } from "../types";

const toastSlice = createSlice({
  name: "toast",
  initialState: [] as IToast[],
  reducers: {
    addToast: (state, action) => {
      state.push(action.payload);
    },
    removeToast: (state, action) => {
      const t = state.find((n) => n.id === action.payload);
      if(t?.timeout)
        clearTimeout(t.timeout);
      return state.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;

import { useCallback } from "react";
import { addToast, removeToast } from "../utils/toastSlice";
import { useDispatch } from "react-redux";
// import crypto from "crypto";

const useToast = (duration = 3000) => {
  const dispatch = useDispatch();

  const showToast = useCallback(
    (type: string, message: string) => {
      const id = Date.now();
      const timeout = setTimeout(() => {
        dispatch(removeToast(id));
      }, duration);
      dispatch(addToast({ id, type, message, timeout }));
    },
    [duration, dispatch],
  );

  return { showToast };
};

export default useToast;

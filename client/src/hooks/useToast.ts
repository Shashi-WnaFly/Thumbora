import { useCallback } from "react";
import { addToast, removeToast } from "../utils/toastSlice";
import { useDispatch } from "react-redux";

const useToast = (duration = 3000) => {
  const dispatch = useDispatch();

  const showToast = useCallback(
    (type: string, message: string) => {
      const id = Date.now();
      const to = setTimeout(() => {
        dispatch(removeToast(id));
      }, duration);
      dispatch(addToast({ id, type, message, timeout: to }));
    },
    [duration, dispatch],
  );

  return { showToast };
};

export default useToast;

import { memo, type JSX } from "react";
import {
  FaBan,
  FaCheckCircle,
  FaExclamation,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { IStore, IToast } from "../types";
import { removeToast } from "../utils/ToastSlice";

const toastIcons: Record<IToast["type"], JSX.Element> = {
  success: <FaCheckCircle size={24} />,
  warning: <FaExclamation size={24} />,
  error: <FaBan size={24} />,
};

const toastColors: Record<IToast["type"], string> = {
  success: "bg-orange-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

const Toast = memo(() => {
  const toast = useSelector((store: IStore) => store.toast);
  const dispatch = useDispatch();
  return (
    <div className="absolute bottom-5 left-5 max-w-6/12">
      <ul>
        {toast.map((t: IToast) => (
          <li
            key={t.id}
            className={`${toastColors[t.type]} flex gap-2 p-4 mb-2 rounded-md shadow-lg items-center`}
          >
            <div>{toastIcons[t.type]}</div>
            <p>{t.message}</p>
            <button
              className="cursor-pointer active:scale-75 transition-transform "
              onClick={() => dispatch(removeToast(t.id))}
            >
              <FaTimesCircle />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Toast;

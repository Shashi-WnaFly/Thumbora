import { useDispatch } from "react-redux";
import api from "../configs/api";
import useToast from "./useToast";
import validator from "validator";

const useSignUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  try {
    if (
      !name ||
      name.length < 3 ||
      name.length > 30 ||
      name.split(" ").length > 3
    ) {
      showToast("warning", "Name is invalid!!");
      return;
    }
    if (
      !password ||
      password.length < 8 ||
      password.length > 20 ||
      !validator.isStrongPassword(password)
    ) {
      showToast("warning", "Password should be 8-20 characters long and must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol!!");
      return;
    }
    if (!email || !validator.isEmail(email)) {
      showToast("warning", "Email is invalid!!");
      return;
    }

    const {data} = await api.post("/signup", {
      userName: name,
      emailId: email,
      password: password
    });

    showToast("success", "Yeh! you registered successfully!!");


  } catch (error) {
    showToast("error", (error as Error).message);
  }
};

export default useSignUp;

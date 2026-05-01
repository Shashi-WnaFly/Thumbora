import validator from "validator";

export const signUpValidation = (
  userName: string,
  email: string,
  password: string,
  showToast: (type: string, message: string) => void,
): boolean => {
  if (
    !userName ||
    userName.length < 3 ||
    userName.length > 30 ||
    userName.split(" ").length > 3
  ) {
    showToast("warning", "Name is invalid!!");
    return false;
  }

  if (!loginValidation(email, password, showToast)) return false;

  return true;
};

export const loginValidation = (
  email: string,
  password: string,
  showToast: (type: string, message: string) => void,
): boolean => {
  if (
    !password ||
    password.length < 8 ||
    password.length > 20 ||
    !validator.isStrongPassword(password)
  ) {
    showToast(
      "warning",
      "Password should be 8-20 characters long and must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol!!",
    );
    return false;
  }
  if (!email || !validator.isEmail(email)) {
    showToast("warning", "Email is invalid!!");
    return false;
  }
  return true;
};

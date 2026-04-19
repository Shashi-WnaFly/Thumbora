import validator from "validator";
import {Request} from "express";

const signUpValidation = (req: Request) => {
  let { userName, password, emailId } = req.body;
  userName = userName.trim();
  emailId = emailId.trim();
  password = password.trim();

  if (
    !userName ||
    userName.length < 3 ||
    userName.length > 30 ||
    userName.split(" ").length > 3
  )
    throw new Error("Username is invalid!");
  if (
    !password ||
    password.length < 8 ||
    password.length > 20 ||
    !validator.isStrongPassword(password)
  )
    throw new Error("Password is invalid!");
  if (!emailId || !validator.isEmail(emailId)) throw new Error("Email is invalid!");
};

export { signUpValidation };

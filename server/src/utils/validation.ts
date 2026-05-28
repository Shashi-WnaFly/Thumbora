import validator from "validator";

const signUpValidation = ({
  userName,
  password,
  emailId,
}: {
  userName: string;
  password: string;
  emailId: string;
}) => {
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
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  )
    throw new Error("Password is invalid!");
  if (!emailId || !validator.isEmail(emailId))
    throw new Error("Email is invalid!");
};

export { signUpValidation };

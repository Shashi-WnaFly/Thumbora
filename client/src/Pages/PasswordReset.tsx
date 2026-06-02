import { useState } from "react";
import validator from "validator";
import SoftBackdrop from "../components/SoftBackdrop";
import Email from "../components/passwordReset/Email";
import EmailVerify from "../components/passwordReset/EmailVerify";
import ChangePassword from "../components/passwordReset/ChangePassword";
import useToast from "../hooks/useToast";
import api from "../configs/api";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const emailId = email ? email.trim().toLowerCase() : "";

      if (!emailId || !validator.isEmail(emailId)) {
        showToast("error", "Enter a valid email address.");
        return;
      }

      const data = await api.post("/reset/verify/email", { emailId: emailId });

      showToast("success", data.data.message);
      setIsOTPSend(true);
    } catch (error) {
      console.error(error);
      showToast("error", (error as Error).message);
    }
  };
  const handleOTPSubmit = async (otp: string) => {
    try {
      const emailId = email ? email.trim().toLowerCase() : "";

      if (!emailId || !validator.isEmail(emailId)) {
        showToast("warning", "Enter valid email address.");
        return;
      }

      if (!otp || otp.length !== 6 || !validator.isNumeric(otp)) {
        showToast("warning", "Enter valid OTP.");
        return;
      }

      const data = await api.post("/reset/verify/otp", {
        emailId: emailId,
        otp: otp,
      });
      showToast("success", data.data.message);

      setIsOTPVerified(true);
    } catch (error) {
      console.error(error);
      showToast("error", (error as Error).message);
    }
  };
  const handlePasswordSubmit = async () => {
    try {
      const emailId = email ? email.trim().toLowerCase() : "";
      const normNewPass = formData.newPassword.trim();
      const normConfirmPass = formData.confirmPassword.trim();

      if (!emailId || !validator.isEmail(emailId)) {
        showToast("warning", "Enter valid email address.");
        return;
      }
      if (
        !normNewPass ||
        normNewPass.length < 8 ||
        normNewPass.length > 20 ||
        !validator.isStrongPassword(normNewPass, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        showToast(
          "warning",
          "Password must be 8-20 characters & include uppercase, lowercase, number, and symbol.",
        );
        return;
      }
      if (normNewPass !== normConfirmPass) {
        showToast("warning", "Passwords do not match.");
        return;
      }
      const data = await api.post("/reset/update/password", {
        emailId: emailId,
        newPassword: normNewPass,
        confirmPassword: normConfirmPass,
      });
      showToast("success", data.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      showToast("error", (error as Error).message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen px-6 md:px-16 lg:px-24 xl:px-32">
      <SoftBackdrop />
      {!isOTPSend && !isOTPVerified && (
        <Email
          value={email}
          onChange={setEmail}
          handleEmailSubmit={handleEmailSubmit}
        />
      )}
      {isOTPSend && !isOTPVerified && (
        <EmailVerify
          handleOTPSubmit={handleOTPSubmit}
          handleEmailSubmit={handleEmailSubmit}
        />
      )}
      {isOTPSend && isOTPVerified && (
        <ChangePassword
          formData={formData}
          onChange={setFormData}
          handlePasswordSubmit={handlePasswordSubmit}
        />
      )}
    </div>
  );
};

export default PasswordReset;

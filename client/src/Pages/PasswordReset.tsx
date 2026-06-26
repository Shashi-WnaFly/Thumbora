import { useState } from "react";
import validator from "validator";
import SoftBackdrop from "../components/SoftBackdrop";
import Email from "../components/passwordReset/Email";
import EmailVerify from "../components/passwordReset/EmailVerify";
import ChangePassword from "../components/passwordReset/ChangePassword";
import useToast from "../hooks/useToast";
import api from "../configs/api";
import { useNavigate } from "react-router-dom";
import type { apiResponse } from "../types";
import axios from "axios";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");
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

      const res = await api.post("/reset/verify/email", {
        emailId: emailId,
      });
      const data: apiResponse = res.data;

      showToast("success", data.message);
      setIsOTPSend(true);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        showToast("warning", message);
        return;
      }
      showToast("error", "Unexpected errro occured.");
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
      setResetToken(data.data.resetToken);

      setIsOTPVerified(true);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        showToast("warning", message);
        return;
      }
      showToast("error", "Unexpected error occured!");
    }
  };
  const handlePasswordSubmit = async () => {
    try {
      const emailId = email ? email.trim().toLowerCase() : "";
      const { newPassword, confirmPassword } = formData;
      if (!emailId || !validator.isEmail(emailId)) {
        showToast("warning", "Enter valid email address.");
        return;
      }
      if (
        !newPassword ||
        newPassword.length < 8 ||
        newPassword.length > 20 ||
        !validator.isStrongPassword(newPassword, {
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
      if (newPassword !== confirmPassword) {
        showToast("warning", "Passwords do not match.");
        return;
      }
      const data = await api.post("/reset/update/password", {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        resetToken: resetToken,
      });
      showToast("success", data.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        showToast("warning", message);
        return;
      }
      showToast("error", "Unexpected error occured!");
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

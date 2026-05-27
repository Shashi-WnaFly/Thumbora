import { useState } from "react";
import validator from "validator";
import SoftBackdrop from "../components/SoftBackdrop";
import Email from "../components/passwordReset/Email";
import EmailVerify from "../components/passwordReset/EmailVerify";
import ChangePassword from "../components/passwordReset/ChangePassword";
import useToast from "../hooks/useToast";
import api from "../configs/api";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const { showToast } = useToast();

  const handleEmailSubmit = async () => {
    try {
      const emailId = email.trim().toLowerCase();

      if (!emailId || !validator.isEmail(emailId)) {
        showToast("error", "Enter a valid email address.");
        return;
      }

      const data = await api.post("/verify/email/reset", { emailId: emailId });

      showToast("success", data.data.message);
      setIsOTPSend(true);
    } catch (error) {
      console.error(error);
      showToast("error", (error as Error).message);
    }
  };
  const handleOTPSubmit = async (otp: string) => {
    try {
      const emailId = email.trim().toLowerCase();

      if (!emailId || !validator.isEmail(emailId)) {
        showToast("warning", "Enter valid email address.");
        return;
      }

      if (otp.length < 6) {
        showToast("warning", "Enter valid OTP.");
        return;
      }

      const data = await api.post("/verify/otp/reset", {
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
      {isOTPSend && isOTPVerified && <ChangePassword />}
    </div>
  );
};

export default PasswordReset;

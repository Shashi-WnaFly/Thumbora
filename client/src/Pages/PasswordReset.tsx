import React, { useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import Email from "../components/passwordReset/Email";
import EmailVerify from "../components/passwordReset/EmailVerify";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleEmailSubmit = () => {
    console.log("Email submitted:", email);
  };

  const handleOTPSubmit = () => {};

  return (
    <div className="w-full flex items-center justify-center h-screen px-6 md:px-16 lg:px-24 xl:px-32">
      <SoftBackdrop />
      <Email
        value={email}
        onChange={setEmail}
        handleEmailSubmit={handleEmailSubmit}
      />
      <EmailVerify
        fillOTP={setOTP}
        handleOTPSubmit={handleOTPSubmit}
        handleEmailSubmit={handleEmailSubmit}
      />
    </div>
  );
};

export default PasswordReset;

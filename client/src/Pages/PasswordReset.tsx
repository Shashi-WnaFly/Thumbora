import React, { useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import Email from "../components/passwordReset/Email";
import EmailVerify from "../components/passwordReset/EmailVerify";
import ChangePassword from "../components/passwordReset/ChangePassword";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleEmailSubmit = () => {
    console.log("Email submitted:", email);
    setIsOTPSend(true);
  };
  const handleOTPSubmit = (otp: string) => {
    console.log(otp);
    setIsOTPVerified(true);
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

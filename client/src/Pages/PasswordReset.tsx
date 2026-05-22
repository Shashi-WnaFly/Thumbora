import React, { useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import Email from "../components/passwordReset/Email";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <div className="w-full flex items-center justify-center h-screen px-6 md:px-16 lg:px-24 xl:px-32">
      <SoftBackdrop />
      <Email
        value={email}
        onChange={setEmail}
        handleEmailSubmit={handleEmailSubmit}
      />
    </div>
  );
};

export default PasswordReset;

import React, { useState, type ChangeEvent } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
    >
      <h1 className="text-white text-3xl mt-10 font-medium">Change Password</h1>

      <p className="text-gray-400 text-sm mt-2">
        Please enter your new password
      </p>

      <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-orange-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-white/75"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
        </svg>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
          value={formData.newPassword}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-orange-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-white/75"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
        </svg>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 mb-12 w-full h-11 rounded-full text-white bg-orange-600 hover:bg-orange-500 transition "
      >
        reset
      </button>
    </form>
  );
};

export default ChangePassword;

import { useState, type ChangeEvent } from "react";
import SoftBackdrop from "../components/SoftBackdrop";

interface IFormData {
  "oldPassword": string;
  "newPassword": string;
  "confirmPassword": string;
}

const App = () => {

  const [formData, setFormData] = useState<IFormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex items-center px-4 md:px-8 lg:px-24 xl:px-32">
      <form
        onSubmit={handleSubmit}
        className="mx-auto sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          Password Reset
        </h1>

        <p className="text-gray-400 text-sm mt-2">Reset Your Password</p>

        <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-orange-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/60"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <circle cx="12" cy="8" r="5" />{" "}
            <path d="M20 21a8 8 0 0 0-16 0" />{" "}
          </svg>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
            value={formData.oldPassword}
            onChange={handleChange}
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
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />{" "}
            <rect x="2" y="4" width="20" height="16" rx="2" />{" "}
          </svg>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-orange-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
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
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 mb-10 w-full h-11 rounded-full text-white bg-orange-600 hover:bg-orange-500 transition "
        >
          reset
        </button>
      </form>
      <SoftBackdrop />
    </div>
  );
};

export default App;

import { type ChangeEvent } from "react";

const Email = ({
  value,
  onChange,
  handleEmailSubmit,
}: {
  value: string;
  onChange: (email: string) => void;
  handleEmailSubmit: () => void;
}) => {
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEmailSubmit();
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
    >
      <h1 className="text-white text-3xl mt-10 font-medium">Password Reset</h1>

      <p className="text-gray-400 text-sm mt-2">
        Please enter email to continue
      </p>

      <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
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
          type="email"
          name="email"
          placeholder="Email id"
          className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

export default Email;

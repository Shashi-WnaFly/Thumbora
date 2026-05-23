const EmailVerify = () => {
  return (
    <div className="flex flex-col items-center w-95 md:max-w-105.75 bg-white/6 border-white/10 rounded-2xl shadow-lg p-6">
      <p className="text-2xl font-semibold ">Email Verify OTP</p>
      <p className="mt-2 text-sm text-gray-400 text-center">
        Enter the 6-digit code sent to your email ID.
      </p>

      <div className="grid grid-cols-6 gap-2 w-11/12 mt-8">
        <input
          type="text"
          maxLength={1}
          className="w-full h-12 bg-orange-50 text-gray-900 text-xl rounded-md outline-none text-center"
        />
        <input
          type="text"
          maxLength={1}
          className="w-full h-12 bg-orange-50 text-gray-900 text-xl rounded-md outline-none text-center"
        />
        <input
          type="text"
          maxLength={1}
          className="w-full h-12 bg-orange-50 text-gray-900 text-xl rounded-md outline-none text-center"
        />
        <input
          type="text"
          maxLength={1}
          className="w-full h-12 bg-orange-50 text-gray-900 text-xl rounded-md outline-none text-center"
        />
        <input
          type="text"
          maxLength={1}
          className="w-full h-12 bg-orange-50 text-gray-900 text-xl rounded-md outline-none text-center"
        />
        <input
          type="text"
          maxLength={1}
          className="w-full h-12 bg-orange-50 text-gray-900 text-xl rounded-md outline-none text-center"
        />
      </div>

      <button
        type="button"
        className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-orange-500 hover:opacity-90 transition-opacity"
      >
        Verify Email
      </button>
    </div>
  );
};

export default EmailVerify;

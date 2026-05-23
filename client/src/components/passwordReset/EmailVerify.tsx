import { useRef, type ChangeEvent, type ClipboardEvent } from "react";
import validator from "validator";

const EmailVerify = () => {
  const inputRefs = useRef<Array<HTMLInputElement>>([]);

  const handleVerifyOtp = () => {};

  const handleInput = ({
    e,
    index,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    index: number;
  }) => {
    const value = e.currentTarget.value;
    if (!validator.isNumeric(value)) {
      e.currentTarget.value = "";
      return;
    }
    if (value && index < inputRefs.current.length - 1)
      inputRefs.current[index + 1].focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const pasteData = e.clipboardData.getData("text").split("");
    pasteData.forEach((ch, index) => {
      if (index < 6) inputRefs.current[index].value = ch;
    });
  };

  return (
    <div className="flex flex-col items-center w-sm md:text-base text-sm bg-white/6 border-white/10 rounded-2xl shadow-lg p-6">
      <p className="text-2xl font-semibold text-center">Email Verify OTP</p>
      <p className="mt-2 text-sm text-gray-400 text-center">
        Enter the 6-digit code sent to your email ID.
      </p>
      <form onSubmit={handleVerifyOtp}>
        <div
          className="grid grid-cols-6 gap-2 mt-8"
          onPaste={(e) => handlePaste(e)}
        >
          {[0, 0, 0, 0, 0, 0].map((_, index) => (
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              ref={(e) => {
                if (e) inputRefs.current[index] = e;
              }}
              onChange={(e) => handleInput({ e, index })}
              className="w-full h-12 bg-orange-50 text-gray-900 text-xl rounded-md outline-none text-center"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-orange-500 hover:opacity-90 transition-opacity"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;

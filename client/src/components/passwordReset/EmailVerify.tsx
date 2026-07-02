import {
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import validator from "validator";
import useToast from "../../hooks/useToast";

const EmailVerify = ({
  handleOTPSubmit,
  handleEmailSubmit,
}: {
  handleOTPSubmit: (otp: string) => void;
  handleEmailSubmit: () => void;
}) => {
  const inputRefs = useRef<Array<HTMLInputElement>>([]);
  const { showToast } = useToast();

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

  const handleKeyDown = ({
    e,
    index,
  }: {
    e: KeyboardEvent<HTMLInputElement>;
    index: number;
  }) => {
    if (e.key == "Backspace" && index > 0 && e.currentTarget.value === "")
      inputRefs.current[index - 1].focus();
  };

  const handleSubmit = () => {
    const otp = inputRefs.current.map((input) => input.value).join("");
    if (otp.length < 6) {
      showToast("error", "Please enter a valid 6-digit OTP.");
      return;
    }
    handleOTPSubmit(otp);
  };

  return (
    <div className="flex flex-col items-center w-sm md:text-base text-sm bg-white/6 border-white/10 rounded-2xl shadow-lg p-6">
      <p className="text-2xl font-semibold text-center">Email Verify OTP</p>
      <p className="mt-2 text-sm text-gray-400 text-center">
        Enter the 6-digit code sent to your email ID.
      </p>
      <div>
        <div
          className="grid grid-cols-6 gap-2 mt-8"
          onPaste={(e) => handlePaste(e)}
        >
          {[0, 0, 0, 0, 0, 0].map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              ref={(e) => {
                if (e) inputRefs.current[index] = e;
              }}
              onChange={(e) => handleInput({ e, index })}
              onKeyDown={(e) => handleKeyDown({ e, index })}
              className="w-full h-12 bg-orange-200/30 text-white text-xl rounded-md outline-none text-center"
            />
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="mt-8 w-full h-11 rounded-full text-white text-sm bg-orange-600 hover:opacity-90 transition-opacity"
          >
            Verify Email
          </button>
          <p className="text-sm text-gray-300 p-4 mx-auto text-center">
            haven't Receive OTP ?
          </p>
          <button
            className="text-orange-400 text-center w-full rounded-full active:underline md:hover:bg-amber-600 md:hover:text-white p-2 text-sm"
            onClick={() => handleEmailSubmit()}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;

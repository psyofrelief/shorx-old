"use client";
import { useMyContext } from "@/context/index";

const Alert = () => {
  const { errorMessage } = useMyContext();
  return (
    <div
      role="alert"
      className="alert alert-error absolute top-[-100%] left-0 right-0 text-xs py-[3px] gap-1  flex justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{errorMessage}</span>
    </div>
  );
};

export default Alert;

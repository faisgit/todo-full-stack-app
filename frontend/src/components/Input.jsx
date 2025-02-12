import React, { forwardRef } from "react";

function Input({ label, className = "", type = "text", ...props }, ref) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={label} className="font-semibold">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder="Type here"
        className={`outline-none border-[1px] border-solid border-gray-400 input-md w-full py-3 px-2 rounded-xl max-w-xs ${className}`}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);

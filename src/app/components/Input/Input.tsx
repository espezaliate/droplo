import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  addOn?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, addOn, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-sm">{label}</span>}
      <div className="relative">
        {addOn && (
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            {addOn}
          </div>
        )}
        <input
          className={`border border-border-primary rounded-lg py-2 px-3 bg-bg-primary shadow-sm w-full placeholder-text-placeholder ${
            props.className ?? ""
          } ${addOn ? "pl-9" : ""}`}
          type="text"
          {...props}
        />
      </div>
    </div>
  );
};

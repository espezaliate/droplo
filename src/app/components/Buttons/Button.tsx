import React from "react";
import { ButtonTypes } from "./types/button";
import { buttonVariantStyles } from "./styles/variants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonTypes;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = ButtonTypes.PRIMARY,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "rounded-lg border py-2.5 px-3.5 gap-1 font-semibold text-sm";

  const buttonStyles = `${baseStyles} ${buttonVariantStyles[variant]} ${className}`;
  return (
    <button
      type="button"
      className={`${buttonStyles} ${props.disabled ? "opacity-50" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

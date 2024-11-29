import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles = "rounded-lg border py-2.5 px-3.5 gap-1";
  const variantStyles = {
    primary:
      "bg-button-primary-bg text-button-primary-fg border-button-primary-border",
    secondary:
      "bg-button-secondary-bg text-button-secondary-fg border-button-secondary-border",
    tertiary:
      "bg-button-tertiary-bg text-button-tertiary-fg border-button-tertiary-border",
  };
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  return (
    <button type="button" className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

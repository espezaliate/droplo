import React from "react";
import { ButtonTypes } from "./types/button";
import { buttonColors, buttonVariantStyles } from "./styles/variants";

export interface ButtonGroupProps {
  buttons: {
    label: string;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  }[];
  variant: ButtonTypes;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  variant,
}) => {
  return (
    <div
      className={`flex w-full divide-x border rounded overflow-hidden ${buttonColors[variant].border}`}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`${buttonVariantStyles[variant]}`}
          {...button.props}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

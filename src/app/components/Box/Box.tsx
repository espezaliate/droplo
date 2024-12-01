import React from "react";

type BoxProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Box: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <div
      className={`border border-border-primary rounded-lg ${
        props.className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

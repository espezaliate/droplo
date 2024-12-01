import React from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <div
      className={`border border-border-primary rounded-lg overflow-hidden ${
        props.className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

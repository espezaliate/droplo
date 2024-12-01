import React from "react";

export const DeleteIcon: React.FC<React.SVGAttributes<SVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 12.5H22.5M12.5 15H27.5M25.8333 15L25.2489 23.7661C25.1612 25.0813 25.1174 25.7389 24.8333 26.2375C24.5833 26.6765 24.206 27.0294 23.7514 27.2497C23.235 27.5 22.5759 27.5 21.2578 27.5H18.7422C17.4241 27.5 16.765 27.5 16.2486 27.2497C15.794 27.0294 15.4167 26.6765 15.1667 26.2375C14.8826 25.7389 14.8388 25.0813 14.7511 23.7661L14.1667 15M18.3333 18.75V22.9167M21.6667 18.75V22.9167"
        stroke="#475467"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

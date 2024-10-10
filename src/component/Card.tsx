import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  shadow?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  backgroundColor = "bg-white",
  shadow = "shadow-md",
  ...props
}) => {
  return (
    <div
      className={`${backgroundColor} ${shadow} rounded-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

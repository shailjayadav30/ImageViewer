import React from "react";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  marginTop?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={` ${className}`}>{children}</div>;
};

export default CardContent;

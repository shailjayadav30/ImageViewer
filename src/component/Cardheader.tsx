import React from "react";

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  borderVisible?: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
  borderVisible = true,
}) => {
  return (
    <div className={`${borderVisible ? "border-b" : ""}  ${className}`}>
      {children}
    </div>
  );
};

export default CardHeader;

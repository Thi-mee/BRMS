import React from "react";
import "../../../styles/Buttons.css";

export default function ButtonOutline({
  onClick,
  className,
  children,
}) {
  return (
    <button
      className={`${className} btn-outline`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

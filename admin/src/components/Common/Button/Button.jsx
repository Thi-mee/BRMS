import React from "react";
import "../../../styles/Buttons.css";

export const Button = ({ onClick, useRef, className, children }) => {
  return (
    <button
      className={`${className} btn-primary`}
      onClick={(e)=>{onClick(e)}}
    >
      {children}
    </button>
  );
};

import React from "react";

const FlexHeader = ({headerText, children}) => {
  return (
    <div className="heading">
      <h1>{headerText}</h1>
      <div className="btn-flex">
        {children}
      </div>
    </div>
  );
};

export default FlexHeader;

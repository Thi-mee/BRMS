import React from "react";
import {Button} from "react-bootstrap";

const FlexHeader = ({headerText, children}) => {
  return (
    <div className="heading">
      <h1>{headerText}</h1>
      <div className="d-flex gap-1 align-items-center">
        {children}
      </div>
    </div>
  );
};

export default FlexHeader;

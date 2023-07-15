import React, { useState } from "react";
import { read, utils } from "xlsx";
import { Alert, Button, Form } from "react-bootstrap";

const FileInput = ({ onFileChange }) => {
  const [xlsxData, setXlsxData] = useState([]);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");

  const onClick = () => {
    if (!file) {
      setErr("Invalid file Input. You must upload a file");
      return;
    }
    setErr("");
    if (onFileChange && typeof onFileChange === "function")
      onFileChange(xlsxData);
    else setErr("onFileChange function prop is required");
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet);
      setXlsxData(json);
      setFile(file);
    };
    reader.readAsBinaryString(file);
  };

  if (!onFileChange) {
    console.error("onFileChange function prop is required");
  }
  return (
    <>
      {err && (
        <Alert dismissible variant="danger">
          {err}
        </Alert>
      )}
      <div className="flex  mb-5">
        <Form.Group controlId="formFile" className="file_input">
          <Form.Control
            type="file"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button
          disabled={!file}
          className=""
          onClick={onClick}>
          Import
        </Button>
      </div>
    </>
  );
};

export default FileInput;

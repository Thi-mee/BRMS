import React, {useRef, useState} from "react";
import { read, utils } from "xlsx";
import { Alert, Button, Form } from "react-bootstrap";

const allowedFileExtensionsRegex = /\.(xlsx|xls|csv)$/i;

const SpreadSheetInput = ({ onFileChange, formatRow }) => {
  const [xlsxData, setXlsxData] = useState([]);
  const [err, setErr] = useState("");
  const [isFileValid, setIsFileValid] = useState(false)
  const fileInputRef = useRef(null);

  const onClick = () => {
    setErr("")
    const validRows = [...xlsxData].map(formatRow).filter(r => r !== null)
    const invalidRowsCount = xlsxData.length - validRows.length;

    if (invalidRowsCount > 0) {
      setErr(
        `${invalidRowsCount} entries were invalid and couldn't be processed.`
      );
    }

    fileInputRef.current.value = ""
    setIsFileValid(false)
    if (onFileChange && typeof onFileChange === "function")
      onFileChange(validRows);
    else console.warn("onFileChange function prop is required");
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!allowedFileExtensionsRegex.test(file.name)) {
      setErr("Invalid file Input. You must upload a valid file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet);
      setXlsxData(json);
      setIsFileValid(true)
    };
    reader.readAsBinaryString(file);
  };

  if (!onFileChange) {
    console.error("onFileChange function prop is required");
  }

  return (
    <>
      <Alert dismissible variant="danger" show={!!err} onClose={()=> setErr("")}>
        {err}
      </Alert>
      <div className="flex  mb-5">
        <Form.Group controlId="formFile" className="file_input">
          <Form.Control
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </Form.Group>
        <Button
          disabled={!isFileValid}
          className=""
          onClick={onClick}>
          Import
        </Button>
      </div>
    </>
  );
};

export default SpreadSheetInput;
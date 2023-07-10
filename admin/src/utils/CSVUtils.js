import { read, utils } from "xlsx"
import { useState } from "react";


export const useCSVUtils = () => {
  const [xlsxData, setXlsxData] = useState([]);

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
    };
    reader.readAsBinaryString(file);
  };

  const setField = (field, value, index) => {
    console.log(field, value, index)
    setXlsxData((prevState) => ([
      ...prevState.slice(0, index),
      {
        ...prevState[index],
        [field]: value
      },
      ...prevState.slice(index + 1)
    ]));
  };

  const setRow = (row, index) => {
    setXlsxData((prevState) => ([
      ...prevState.slice(0, index),
      row,
      ...prevState.slice(index + 1)
    ]));
    console.log(xlsxData)
  };


  return { xlsxData, handleFileChange, setField, setRow }


}
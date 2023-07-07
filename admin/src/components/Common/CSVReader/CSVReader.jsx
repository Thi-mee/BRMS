import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import BulkPickUpTable from "../Table/BulkPickUpTable";
import {FaTimes} from "react-icons/fa";
import AlertComp from "../Alert/AlertComp";
import AppModal from "../BRMS_Modal/AppModal";
import { locationTableModal } from "../Table/LocationTable";

const CSVReaderProp = ({ xlsxData, setXlsxData }) => {
  const XLSX = require("xlsx");
  const [renderTable, setRenderTable] = useState(false);
  const [show, setShow] = useState(false);

  // const { showModal, modalHeading, setModalHeading, closeBtn, setCloseBtn, handleClose, handleShow } = usePickUpPointsContext();
  // const { locations } = useLocationContext();

  const fileInput = useRef("")

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setXlsxData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const updateTable = () => {
      if(fileInput.current.value === ""){
            setShow(true)
     } 

    if (xlsxData.length > 1) {
        setShow(false);
      setRenderTable(true);
      xlsxData.shift();
    fileInput.current.value = ""
    }

  };


  return (
    <>
    {/* <AppModal handleClose={handleClose} handleShow={handleShow} show={showModal} modalHeading={modalHeading} closeBtn={closeBtn}> */}
      {/* {locationTableModal(locations)} */}
    {/* </AppModal> */}
    {show && <AlertComp  text={<p><FaTimes/>Invalid file Input</p>} variant="danger" />}
      <div className="component_container">
        <Form.Group controlId="formFile" className="mt-4">
          <Form.Control type="file" ref={fileInput} onChange={(e) => {
            handleFileChange(e);
          }} />
        </Form.Group>{" "}
          
        <Button
          className="mt-4"
          onClick={() => {
            updateTable()
          }}
        >
          Import
        </Button>
      </div>
      <Button className="button_container">Apply All</Button>
      {/* <BulkPickUpTable renderTable={renderTable} xlsxData={xlsxData} handleShow={handleShow} setModalHeading={setModalHeading} setCloseBtn={setCloseBtn} /> */}
    </>
  );
};

export default CSVReaderProp;

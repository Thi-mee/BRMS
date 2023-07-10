import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useCSVUtils } from "../../utils/CSVUtils";
import BulkPickUpTable from "../../components/Table/BulkPickUpTable";
import { useNavigate } from "react-router-dom";
import { useFormUtils } from "../../utils/useFormUtils";
import { getLocationsData } from "../../store/selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLocations } from "../../store/thunks/locationThunks";
import BulkPageModal, {
  ModalFormInitialValues,
  ModalValidationRules,
} from "../../components/BulkPageComponents/BulkPageModal";
import { pupValidationRules } from "../../utils/validationRules";
import { alert } from "../../utils/Alert";
import { BulkPkpDto } from "../../utils/contracts";


const Bulk_PickUpPoints = () => {
  const navigate = useNavigate();
  const { xlsxData, handleFileChange, setField, setRow } = useCSVUtils();
  const [shouldTableRender, setTableToShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const fileInput = useRef("");
  const { handleValueChange, form, errors, validateSubmission, initForm } =
    useFormUtils({}, null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPUPIndexes, setSelectedPUPIndexes] = useState([]);
  const [newLocations, setNewLocations] = useState([]);

  const [modalAction, setModalAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    initForm();
  };
  const [locationObj, setLocationObj] = useState({});
  const handleShow = (modalAction, index, formValues) => {
    setSelectedIndex(index);
    setModalAction(modalAction);
    if (formValues) {
      initForm(formValues, ModalValidationRules[modalAction]);
    } else
      initForm(
        ModalFormInitialValues[modalAction],
        ModalValidationRules[modalAction]
      );
    setShowModal(true);
  };

  const dispatch = useDispatch();
  const { locations, status } = useSelector(getLocationsData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllLocations());
    }
  }, [dispatch, locations, status]);

  const updateTable = () => {
    if (fileInput.current === "") {
      setShowErr(true);
    }

    if (xlsxData.length > 1) {
      setShowErr(false);
      setTableToShow(true);
      xlsxData.shift();
      // fileInput.current = "";
    }
  };

  const handleCheckChange = (e, value) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedPUPIndexes([...selectedPUPIndexes, value]);
    } else {
      const filteredPUPs = selectedPUPIndexes.filter((pup) => pup !== value);
      setSelectedPUPIndexes(filteredPUPs);
    }
  };

  const handleSave = () => {
    const pupToBeSaved = selectedPUPIndexes.map((index) => xlsxData[index]);
    const isValid = validatePickupPoints(
      pupToBeSaved,
      pupValidationRules,
      newLocations
    );
    if (!isValid) {
      alert(
        "warning",
        "Invalid Addition",
        "One or more Pick up point entries hasn't been completed"
      );
    }
    const dto = new BulkPkpDto(pupToBeSaved, newLocations, locations);
    console.log(dto);
  };

  return (
    <div className="page">
      <div className="heading mb-3 mt-2">
        <h2>Upload Bulk Pick Up Points</h2>
        <div className="btn-flex">
          {!shouldTableRender && (
            <Button
              variant="outline-dark"
              href="/assets/pickup-points.xlsx"
              download>
              Download Template
            </Button>
          )}
          <Button variant="outline-danger" onClick={() => navigate(-1)}>
            Back
          </Button>
          {shouldTableRender && <Button onClick={handleSave}>Save</Button>}
        </div>
      </div>
      {showErr && (
        <Alert dismissible variant="danger">
          Invalid file Input. You must upload a file
        </Alert>
      )}
      <div className="flex  mb-5">
        <Form.Group controlId="formFile" className="file_input">
          <Form.Control
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button
          disabled={fileInput.current === ""}
          className=""
          onClick={updateTable}>
          Import
        </Button>
      </div>
      {shouldTableRender ? (
        <>
          <BulkPickUpTable
            xlsxData={xlsxData}
            handleShow={handleShow}
            setModalAction={setModalAction}
            handleCheckChange={handleCheckChange}
          />
        </>
      ) : (
        <div className="emptyContainer">
          <img
            src="/assets/illustrations/empty_list.png"
            alt=""
            width={300}
            height={250}
          />
          <h3>No Pick Up Points</h3>
          <p>Start by Uploading the file with the Pick Up Points</p>
        </div>
      )}
      <BulkPageModal
        showModal={showModal}
        handleClose={handleClose}
        modalAction={modalAction}
        form={form}
        errors={errors}
        handleValueChange={handleValueChange}
        locations={locations}
        setLocationObj={setLocationObj}
        locationObj={locationObj}
        setField={setField}
        selectedIndex={selectedIndex}
        validateSubmission={validateSubmission}
        setRow={setRow}
        setNewLocations={setNewLocations}
      />
    </div>
  );
};

export default Bulk_PickUpPoints;

const validatePickupPoints = (pickupPoints, validationRules, newLocations) => {
  return pickupPoints.every((pup) =>
    validatePickupPoint(pup, validationRules, newLocations)
  );
};

const validatePickupPoint = (pickupPoint, validationRules, newLocations) => {
  for (const rule of validationRules) {
    const { name, minLength, maxLength } = rule;
    const value = pickupPoint[name];

    if (
      typeof value !== "string" ||
      value.length < minLength ||
      value.length > maxLength
    ) {
      return false;
    }
    const erer = newLocations.some(
      (location) => location?.title === pickupPoint?.locationTitle
    );
    if (!erer) {
      return false;
    }
  }
  return true;
};

import React, { useEffect } from "react";
import { getLocationData } from "../../store/selectors";
import { useSelector } from "react-redux";
import XPTable from "../../components/Table/XPTable";
import { Button, Modal } from "react-bootstrap";
import {
  AlertWithButtonAndFunctionAndCancel,
  alert,
  alertWithButtonAndFunction,
} from "../../utils/Alert";
import {
  addLocation,
  deleteLocation,
  editLocation,
} from "../../store/features/location/locationThunks";
import { useDispatch } from "react-redux";
import LocationForm from "../../components/Forms/LocationForm";
import { useFormUtils } from "../../utils/useFormUtils";
import { locationValidationRules } from "../../utils/validationRules";
import FlexHeader from "../../components/Headers/FlexHeader";
import { REQUEST_STATUS } from "../../utils/constants";
import {
  clearError,
  resetStatus,
} from "../../store/features/location/locationSlice";

const initialState = {
  id: "",
  title: "",
  description: "",
  area: "",
  city: "",
  lcda: "",
  landmark: "",
};
const ModalActions = {
  ADD: Symbol("ADD"),
  EDIT: Symbol("EDIT"),
};

const LocationsMgtPage = () => {
  const { locations, error, deleteStatus, addStatus, editStatus } =
    useSelector(getLocationData);
  const [showModal, setShowModal] = React.useState(false);
  const [modalAction, setModalAction] = React.useState(null);
  const {
    values,
    errors,
    handleValueChange,
    validateForm,
    initForm,
    valuesChanged,
  } = useFormUtils(initialState, locationValidationRules);

  const dispatch = useDispatch();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const deleteFailed = deleteStatus === REQUEST_STATUS.FAILED;
    const addFailed = addStatus === REQUEST_STATUS.FAILED;
    const editFailed = editStatus === REQUEST_STATUS.FAILED;
    if ((deleteFailed || addFailed || editFailed) && error) {
      alert("Error", error);
      dispatch(clearError());
    }
  }, [error, deleteStatus, addStatus, editStatus, dispatch]);

  useEffect(() => {
    const deleteSuccess = deleteStatus === REQUEST_STATUS.SUCCEEDED;
    const addSuccess = addStatus === REQUEST_STATUS.SUCCEEDED;
    const editSuccess = editStatus === REQUEST_STATUS.SUCCEEDED;

    if (deleteSuccess) {
      alert("success", "Location deleted successfully");
      dispatch(resetStatus("deleteStatus"));
    }
    if (addSuccess || editSuccess) {
      const snippet = addSuccess ? "added" : "edited";
      alertWithButtonAndFunction(
        "success",
        `Location ${snippet} successfully`,
        "",
        "Proceed",
        () => handleClose()
      );
      dispatch(resetStatus(addSuccess ? "addStatus" : "editStatus"));
    }
  }, [addStatus, deleteStatus, editStatus, dispatch]);

  const deleteLocationCallback = (row) => dispatch(deleteLocation(row.id));

  const preDeleteLocation = (row) =>
    AlertWithButtonAndFunctionAndCancel(
      "warning",
      "Delete Location",
      "Are you sure you want to delete this location?",
      "Yes",
      "No",
      deleteLocationCallback.bind(null, row)
    );

  const preAddOrEdit = (row) => {
    if (!row) {
      setModalAction(ModalActions.ADD);
      initForm();
    } else {
      setModalAction(ModalActions.EDIT);
      initForm(row);
    }
    handleShow();
  };

  const handleSave = () => {
    if (!valuesChanged()) return;
    if (validateForm()) {
      if (modalAction === ModalActions.ADD) dispatch(addLocation(values));
      else dispatch(editLocation(values));
    }
  };

  return (
    <div className="page">
      <Heading handleAddBtn={preAddOrEdit} />
      <LocationTable
        locations={locations}
        preAddOrEdit={preAddOrEdit}
        preDeleteLocation={preDeleteLocation}
      />
      <LocationModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        form={values}
        errors={errors}
        handleValueChange={handleValueChange}
        modalAction={modalAction}
      />
    </div>
  );
};

export default LocationsMgtPage;

function Heading(props) {
  return (
    <FlexHeader headerText="Locations Management">
      <div className="btn-flex">
        <Button variant="outline-primary" onClick={() => props.handleAddBtn()}>
          Add Location
        </Button>
      </div>
    </FlexHeader>
  );
}

function LocationTable(props) {
  return (
    <XPTable
      titles={[
        "Title",
        "Description",
        "Area",
        "City",
        "LCDA",
        "Landmark",
        "Actions",
      ]}
      data={props.locations}
      serial
      renderitem={(row, rowIndex) => (
        <>
          <td>{row.title}</td>
          <td>{row.description}</td>
          <td>{row.area}</td>
          <td>{row.city}</td>
          <td>{row.lcda}</td>
          <td>{row.landmark}</td>
          <td>
            {
              <div className="btn-flex">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => props.preAddOrEdit(props.locations[rowIndex])}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => props.preDeleteLocation(row)}>
                  Delete
                </Button>
              </div>
            }
          </td>
        </>
      )}
    />
  );
}

function LocationModal(props) {
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.modalAction === ModalActions.ADD
            ? "Add Location"
            : "Edit Location"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LocationForm
          form={props.form}
          errors={props.errors}
          handleValueChange={props.handleValueChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

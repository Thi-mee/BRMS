import React, { useEffect } from "react";
import { getLocationsData } from "../../store/selectors";
import { useSelector } from "react-redux";
import XPTable from "../../components/Table/XPTable";
import { Button, Modal } from "react-bootstrap";
import { AlertWithButtonAndFunctionAndCancel, alert } from "../../utils/Alert";
import {
  deleteLocation,
  editLocation,
} from "../../store/thunks/locationThunks";
import { useDispatch } from "react-redux";
import LocationForm from "../../components/Forms/LocationForm";
import { useFormUtils } from "../../utils/useFormUtils";
import { locationValidationRules } from "../../utils/validationRules";

const LocationsMgtPage = () => {
  const { locations, status, error } = useSelector(getLocationsData);
  const [showModal, setShowModal] = React.useState(false);
  const { form, errors, handleValueChange, setFormValues, validateSubmission } =
    useFormUtils(
      {
        title: "",
        description: "",
        area: "",
        city: "",
        lcda: "",
        landmark: "",
      },
      locationValidationRules
    );

  const dispatch = useDispatch();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    error && alert("error", error);
  }, [error]);

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

  const preEditLocation = (row) => {
    console.log(row);
    setFormValues(row);
    handleShow();
  };

  const handleSave = () => {
    if (validateSubmission()) {
      console.log(form);
      dispatch(editLocation(form));
      alert("success", "Location edited successfully");
    }
  };

  return (
    <div className="page">
      <div className="heading mb-3 mt-2">
        <h1>Locations</h1>
        <div className="btn-flex"></div>
      </div>
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
        // selectMultiple
        data={locations}
        renderitem={(row) => (
          <>
            <td>{row.title}</td>
            <td>{row.description}</td>
            <td>{row.area}</td>
            <td>{row.city}</td>
            <td>{row.lcda}</td>
            <td>{row.landmark}</td>
          </>
        )}
        noOfButtons={2}
        renderBtn={(index, rowIndex, row) => {
          if (index === 0) {
            return (
              <Button
                key={index}
                variant="success"
                size="sm"
                onClick={() => preEditLocation(locations[rowIndex])}>
                Edit
              </Button>
            );
          } else if (index === 1) {
            return (
              <Button
                key={index}
                variant="danger"
                size="sm"
                onClick={() => {
                  preDeleteLocation(row);
                }}>
                Delete
              </Button>
            );
          }
        }}
      />
      <Modal size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocationForm
            form={form}
            errors={errors}
            handleValueChange={handleValueChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LocationsMgtPage;

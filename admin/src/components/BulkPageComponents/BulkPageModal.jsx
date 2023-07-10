import React from "react";
import { Button, Modal } from "react-bootstrap";
import LocationForm from "../Forms/LocationForm";
import PickUpPointFormWithoutLocation from "../Forms/PkpForm";
import LocationTable from "../Table/LocationTable";
import {
  locationValidationRules,
  pupValidationRules,
} from "../../utils/validationRules";
import { alert } from "../../utils/Alert";

const BulkPageModal = ({
  showModal,
  handleClose,
  modalAction,
  form,
  errors,
  handleValueChange,
  locations,
  setLocationObj,
  locationObj,
  setField,
  selectedIndex,
  validateSubmission,
  setRow,
  setNewLocations,
}) => {
  const [serverError, setServerError] = React.useState(null);
  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ModalHeading[modalAction]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(modalAction === ModalActions.EDIT ||
          modalAction === ModalActions.ADD) && (
          <LocationForm
            form={form}
            errors={errors}
            handleValueChange={handleValueChange}
            serverError={serverError}
          />
        )}
        {modalAction === ModalActions.EDIT_PICKUP && (
          <PickUpPointFormWithoutLocation
            form={form}
            errors={errors}
            handleValueChange={handleValueChange}
          />
        )}
        {modalAction === ModalActions.SELECT && (
          <LocationTable
            locations={locations}
            setLocationObj={setLocationObj}
            locationObj={locationObj}
            setField={setField}
            selectedIndex={selectedIndex}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            try {
              switch (modalAction) {
                case ModalActions.ADD:
                  if (validateSubmission()) {
                    setNewLocations(prev => [...prev, {...form, pkpIndex: selectedIndex}])
                    setField("locationTitle", form.title, selectedIndex)
                    alert("success", "Location Added successfully");
                    handleClose();
                  }
                  break;
                case ModalActions.EDIT:
                  if (validateSubmission()) {
                    setRow(form, selectedIndex);
                    alert("success", "Location edited successfully");
                    handleClose();
                  }
                  break;
                case ModalActions.EDIT_PICKUP:
                  if (validateSubmission()) {
                    setRow(form, selectedIndex);
                    alert("success", "Pick Up Point edited successfully");
                    handleClose();
                  }
                  console.log("Edit Pick Up");
                  break;
                case ModalActions.SELECT:
                  console.log("Select");
                  break;
                default:
                  break;
              }
            } catch (error) {
              setServerError(error.message);
            }
          }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkPageModal;

export const ModalActions = {
  ADD: Symbol("Add"),
  SELECT: Symbol("Select"),
  EDIT: Symbol("Edit"),
  EDIT_PICKUP: Symbol("Edit Pick Up"),
};

export const ModalHeading = {
  [ModalActions.ADD]: "Add New Location",
  [ModalActions.SELECT]: "Select Existing Location",
  [ModalActions.EDIT]: "Edit Location",
  [ModalActions.EDIT_PICKUP]: "Edit Pick Up Point",
};

export const ModalFormInitialValues = {
  [ModalActions.ADD]: {
    title: "",
    lcda: "",
    city: "",
    area: "",
    description: "",
    landmark: "",
  },
  [ModalActions.EDIT]: {
    title: "",
    lcda: "",
    city: "",
    area: "",
    description: "",
    landmark: "",
  },
  [ModalActions.EDIT_PICKUP]: {
    name: "",
    title: "",
    busStop: "",
    description: "",
    status: false,
  },
};

export const ModalValidationRules = {
  [ModalActions.ADD]: locationValidationRules,
  [ModalActions.EDIT]: locationValidationRules,
  [ModalActions.EDIT_PICKUP]: pupValidationRules,
};

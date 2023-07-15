import React, { memo, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import LocationForm from "../Forms/LocationForm";
import PickUpPointFormWithoutLocation from "../Forms/PkpForm";
import LocationTable from "../Table/LocationTable";
import {
  locationValidationRules,
  pupValidationRules,
} from "../../utils/validationRules";
import { alert, alertWithButtonAndFunction } from "../../utils/Alert";

const BulkPageModal = ({
  showModal,
  handleClose,
  modalAction,
  form,
  errors,
  handleValueChange,
  locations,
  selectedIndex,
  validateSubmission,
  modifyPickupTableRow,
  addLocationToPickup,
}) => {

  const setSelectedLocations = useCallback((location) => {
    addLocationToPickup(location, selectedIndex);
    handleClose()
  }, [selectedIndex, addLocationToPickup, handleClose]);

  const handleAddAndEditLocation = (action) => {
    if (validateSubmission()) {
      addLocationToPickup(form, selectedIndex);
      const message = action === ModalActions.ADD ? "added" : "edited";
      alert("success", `Location ${message} successfully`);
      handleClose();
    }
  };

  const handleEditPickup = () => {
    if (validateSubmission()) {
      modifyPickupTableRow(form, selectedIndex);
      alert("success", "Pick Up Point edited successfully");
      handleClose();
    }
  };

  const handleClick = () => {
    if (modalAction === ModalActions.ADD || modalAction === ModalActions.EDIT) {
      handleAddAndEditLocation(modalAction);
    } else if (modalAction === ModalActions.EDIT_PICKUP) {
      handleEditPickup();
    }
  };

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
            onSelect={setSelectedLocations}
          />
        )}
      </Modal.Body>
      {modalAction !== ModalActions.SELECT && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default memo(BulkPageModal);

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

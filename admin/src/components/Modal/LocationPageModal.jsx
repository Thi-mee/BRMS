import LocationForm from "../Forms/LocationForm";
import XPModal from "./shared/XPModal";
import React from "react";

export const ModalActions = {
  ADD: Symbol("ADD"),
  EDIT: Symbol("EDIT"),
};

function LocationModal(props) {
  return (
    <XPModal
      show={props.show}
      onHide={props.handleClose}
      modalHeading={
        props.modalAction === ModalActions.ADD
          ? "Add Location"
          : "Edit Location"
      }>
      <LocationForm
        onSubmit={props.handleSave}
        values={
          props.modalAction === ModalActions.EDIT
            ? props.selectedLocation
            : null
        }
      />
    </XPModal>
  );
}

export default LocationModal;

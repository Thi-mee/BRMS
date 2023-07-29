import React, { memo, useCallback } from "react";
import LocationForm from "../Forms/LocationForm";
import LocationTable from "../Table/LocationTable";
import { alert } from "../../utils/alert";
import PickupForm from "../Forms/PickupForm";
import XPModal from "./shared/XPModal";

const BulkPageModal = ({
  showModal,
  handleClose,
  modalAction,
  locations,
  selectedIndex,
  modifyPickupTableRow,
  addLocationToPickup,
  selectedLocation,
  selectedPickupPoint,
}) => {
  const setSelectedLocations = useCallback(
    (location) => {
      addLocationToPickup(location, selectedIndex);
      handleClose();
    },
    [selectedIndex, addLocationToPickup, handleClose]
  );

  const handleEditPickup = async (formValues) => {
    modifyPickupTableRow(formValues, selectedIndex);
    await alert("success", "Pick Up Point edited successfully");
    handleClose();
  };

  const handleLocationSubmit = async (formValues) => {
    addLocationToPickup(formValues, selectedIndex);
    // if (!!formValues.id) {
    //   editLocation(formValues);
    // } else {
    //   addLocation(formValues);
    // }
    const message = modalAction === ModalActions.ADD ? "added" : "edited";
    await alert("success", `Location ${message} successfully`);
    handleClose();
  };

  return (
    <XPModal
      size={"lg"}
      show={showModal}
      onHide={handleClose}
      modalHeading={ModalHeading[modalAction]}>
      {(modalAction === ModalActions.EDIT_LOCATION ||
        modalAction === ModalActions.ADD_LOCATION) && (
        <LocationForm
          onSubmit={handleLocationSubmit}
          values={selectedLocation}
        />
      )}
      {modalAction === ModalActions.EDIT_PICKUP && (
        <PickupForm onSubmit={handleEditPickup} values={selectedPickupPoint} />
      )}
      {modalAction === ModalActions.SELECT_LOCATION && (
        <LocationTable locations={locations} onSelect={setSelectedLocations} />
      )}
    </XPModal>
  );
};

export default memo(BulkPageModal);

export const ModalActions = {
  ADD_LOCATION: Symbol("Add"),
  SELECT_LOCATION: Symbol("Select"),
  EDIT_LOCATION: Symbol("Edit"),
  EDIT_PICKUP: Symbol("Edit Pick Up"),
};

const ModalHeading = {
  [ModalActions.ADD_LOCATION]: "Add New Location",
  [ModalActions.SELECT_LOCATION]: "Select Existing Location",
  [ModalActions.EDIT_LOCATION]: "Edit Location",
  [ModalActions.EDIT_PICKUP]: "Edit Pick Up Point",
};

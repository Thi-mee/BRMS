import React, { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import BulkPickUpTable from "../../components/Table/BulkPickUpTable";
import { getLocationData, getPickUpData } from "../../store/selectors";
import { useSelector, useDispatch } from "react-redux";
import BulkPageModal, {
  ModalActions,
} from "../../components/Modal/BulkPageModal";
import { pupValidationRules } from "../../utils/validationRules";
import { alert, alertWithButtonAndFunction } from "../../utils/alert";
import { BulkPkpDto } from "../../utils/contracts";
import { BackButton, ButtonDownload } from "../../components/Button/Button";
import FlexHeader from "../../components/Headers/FlexHeader";
import SpreadSheetInput from "../../components/Forms/shared/SpreadSheetInput";
import EmptyCtn from "../../components/EmptyContainer";
import { addBulkPickUpPoints } from "../../store/features/pickup/pickUpPointThunks";
import { useNavigate } from "react-router-dom";
import { resetStatus } from "../../store/features/pickup/pickUpPointSlice";
import { REQUEST_STATUS } from "../../utils/constants";
import {formatSpreadSheetRow} from "../../utils/utilities";

const Bulk_PickUpPoints = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pickupPoints, setPickupPoints] = useState([]);
  const { addBulkStatus, error, pickuppoints } = useSelector(getPickUpData);
  const { locations } = useSelector(getLocationData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPUPs, setSelectedPUPs] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const newLocations = selectedLocations.filter(
    (lct) => !locations.some((l) => l.title === lct.title)
  );
  const allLocations = [...locations, ...newLocations];

  useEffect(() => {
    const addBulkSuccess = addBulkStatus === REQUEST_STATUS.SUCCEEDED;
    const addBulkFailed = addBulkStatus === REQUEST_STATUS.FAILED;
    if (addBulkSuccess) {
      alertWithButtonAndFunction(
        "success",
        "Success",
        "Pickup points added successfully",
        "Proceed",
        () => navigate("/pick_up_points")
      );
      dispatch(resetStatus("addBulkStatus"));
    }
    if (addBulkFailed) {
      alert("error", "Error", error);
      dispatch(resetStatus("addBulkStatus"));
    }
  }, [error, addBulkStatus, navigate, dispatch]);

  const handleClose = () => {
    selectedLocation && setSelectedLocation(null);
    selectedPickupPoint && setSelectedPickupPoint(null);
    modalAction && setModalAction(null);
    setShowModal(false);
  };

  const handleShow = (modalAction, index, optionalFormValues) => {
    setSelectedIndex(index);
    setModalAction(modalAction);
    if (optionalFormValues) {
      if (modalAction === ModalActions.EDIT_PICKUP) {
        setSelectedPickupPoint(optionalFormValues);
      }
      if (modalAction === ModalActions.EDIT_LOCATION) {
        const locationPup = allLocations.find(
          (lct) => lct.title === optionalFormValues.locationTitle
        );
        setSelectedLocation(locationPup);
      }
    }
    setShowModal(true);
  };

  const handleCheckChange = useCallback((pups) => setSelectedPUPs(pups), []);

  const handleSave = () => {
    if (selectedPUPs.length === 0)
      return alert(
        "warning",
        "Invalid Addition",
        "No Pick up point has been selected"
      );
    try {
      validatePickupPoints(
        selectedPUPs,
        pupValidationRules,
        selectedLocations,
        pickuppoints
      );
    } catch (error) {
      return alert("warning", "Invalid Addition", error.message);
    }
    try {
      const dto = new BulkPkpDto(
        selectedPUPs,
        selectedLocations
      ).getPickupPoints();
      dispatch(addBulkPickUpPoints(dto));
    } catch (error) {
      alert("warning", "Invalid Addition", error.message);
    }
  };

  const modifyPickupTableRow = (data, rowindex) => {
    setPickupPoints((pk) => pk.map((p, i) => (i === rowindex ? data : p)));
  };

  const addLocationToPickup = (locationData, rowindex) => {
    setPickupPoints((pk) =>
      pk.map((p, i) =>
        i === rowindex ? { ...p, locationTitle: locationData.title } : p
      )
    );
    if (selectedLocations.some((lct) => lct.title === locationData.title)) {
      return false;
    }
    setSelectedLocations((lct) => [...lct, locationData]);
  };

  return (
    <div className="page">
      <FlexHeader headerText="Upload Bulk Pick Up Points">
        <ButtonDownload href="/assets/pickup-points.xlsx">
          Download Template
        </ButtonDownload>
        <BackButton />
        {pickupPoints.length > 0 && <Button onClick={handleSave}>Save</Button>}
      </FlexHeader>
      <SpreadSheetInput onFileChange={setPickupPoints} formatRow={formatSpreadSheetRow}/>
      {pickupPoints.length > 0 ? (
        <BulkPickUpTable
          xlsxData={pickupPoints}
          handleShow={handleShow}
          onSelect={handleCheckChange}
        />
      ) : (
        <EmptyCtn text="No Pick Up Points uploaded">
          <p>Start by Uploading the file with the Pick Up Points</p>
        </EmptyCtn>
      )}
      <BulkPageModal
        showModal={showModal}
        handleClose={handleClose}
        modalAction={modalAction}
        locations={allLocations}
        selectedIndex={selectedIndex}
        modifyPickupTableRow={modifyPickupTableRow}
        addLocationToPickup={addLocationToPickup}
        selectedLocation={selectedLocation}
        selectedPickupPoint={selectedPickupPoint}
      />
    </div>
  );
};

export default Bulk_PickUpPoints;

const validatePickupPoints = (
  pickupPoints,
  validationRules,
  newLocations,
  allpickuppointsFromStore
) => {
  return pickupPoints.forEach((pup) => {
    const validatedNames = [];
    checkForDuplicatePickupPoint(pup, allpickuppointsFromStore, validatedNames);
    validatePickupPoint(pup, validationRules, newLocations);
    validatedNames.push(pup.name);
  });
};

const checkForDuplicatePickupPoint = (
  pickupPoint,
  allpickuppointsFromStore,
  validatedNames
) => {
  const pupFromStore = allpickuppointsFromStore.find(
    (p) => p.name === pickupPoint.name
  );
  if (pupFromStore) {
    throw new Error(`Pickup point already exists: ${pickupPoint.name}`);
  }
  if (validatedNames.includes(pickupPoint.name)) {
    throw new Error(`Duplicate Pickup point name: ${pickupPoint.name}`);
  }
};

const validatePickupPoint = (pickupPoint, validationRules, newLocations) => {
  for (const rule of validationRules) {
    const { name, minLength, maxLength, label } = rule;
    const value = pickupPoint[name];

    if (
      typeof value !== "string" ||
      value.length < minLength ||
      value.length > maxLength
    ) {
      throw new Error(`Invalid ${label} value: ${value}`);
    }
    const erer = newLocations.some(
      (location) => location?.title === pickupPoint?.locationTitle
    );
    if (!erer) {
      throw new Error(`Invalid Location value: ${pickupPoint?.locationTitle}`);
    }
  }
  return true;
};

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocationData, getPickUpData } from "../../store/selectors";
import { addPickUpPoints, updatePickUpPoints } from "../../store/features/pickup/pickUpPointThunks";
import { alertWithButton, alertWithButtonAndFunction } from "../../utils/alert";
import { PkpDto } from "../../utils/contracts";
import FlexHeader from "../../components/Headers/FlexHeader";
import { BackButton } from "../../components/Button/Button";
import { REQUEST_STATUS } from "../../utils/constants";
import { resetStatus } from "../../store/features/pickup/pickUpPointSlice";
import { fetchAllLocations } from "../../store/features/location/locationThunks";
import XPPickupFullForm from "../../components/Forms/PickupFullForm";


const SingleAddOrEditPickUpP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locations } = useSelector(getLocationData);
  const { pickuppoints, addStatus, updateStatus } = useSelector(getPickUpData);
  const { id } = useParams();
  const [formTopErr, setFormTopErr] = useState("");

  useEffect(() => {
    const navigateToPickupMgt = () => navigate("/pick_up_points");
    const addSuccess = addStatus === REQUEST_STATUS.SUCCEEDED;
    const updateSuccess = updateStatus === REQUEST_STATUS.SUCCEEDED;

    if (addSuccess || updateSuccess) {
      dispatch(resetStatus(addSuccess ? "addStatus" : "updateStatus"));
      dispatch(fetchAllLocations());
      alertWithButtonAndFunction(
        "success",
        id
          ? "Pick Up Point Updated Successfully"
          : "Pick Up Point Added Successfully",
        "",
        "Proceed",
        navigateToPickupMgt
      );
    }
  }, [addStatus, updateStatus, navigate, id, dispatch]);

  useEffect(() => {
    const addFailed = addStatus === REQUEST_STATUS.FAILED;
    const updateFailed = updateStatus === REQUEST_STATUS.FAILED;
    if (addFailed || updateFailed) {
      dispatch(resetStatus(addFailed ? "addStatus" : "updateStatus"));
      alertWithButton(
        "error",
        id
          ? "Pickup Point couldn't be updated"
          : "Pickup Point couldn't be added",
        "",
        "Retry"
      );
    }
  }, [addStatus, updateStatus, dispatch, navigate, id]);


  const handleSubmit = (formValues) => {
    try {
      checkForDuplicatePickUpPoints(formValues, pickuppoints);
    } catch (error) {
      console.log(error.message);
      setFormTopErr(error.message);
      return;
    }
    const dto = new PkpDto(formValues, locations);
    if (id) {
      dispatch(updatePickUpPoints(dto.getUpdatePkp()));
    } else {
      dispatch(addPickUpPoints(dto.getAddPkp()));
    }
  };

  return (
    <div className="page">
      <FlexHeader headerText={id ? "Edit Pickup Point" : "Add Pickup Point"}>
        <div className="btn-flex">
          <BackButton />
        </div>
      </FlexHeader>
      <XPPickupFullForm
        formTopErr={formTopErr}
        clearTopErr={() => setFormTopErr("")}
        locations={locations}
        pickupPoints={pickuppoints}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SingleAddOrEditPickUpP;

function checkForDuplicatePickUpPoints(pickupPoint, existingPickupPoints) {
  if (!pickupPoint.id) {
    const duplicatePickupPoint = existingPickupPoints.find(
      (p) => p.name === pickupPoint.name
    );
    if (duplicatePickupPoint) {
      throw new Error(
        "Pickup Point already exists. Perhaps you want to add a new Name"
      );
    }
  }
  if (!pickupPoint.location.id) {
    if (existingPickupPoints.length === 0) return;
    checkForDuplicateLocation(pickupPoint.location, existingPickupPoints);
  }
}

function checkForDuplicateLocation(location, existingLocations) {
  const duplicateLocation = existingLocations.find(
    (l) => l.title === location.title
  );
  if (duplicateLocation) {
    throw new Error("Location already exists. Try with another Title");
  }
}

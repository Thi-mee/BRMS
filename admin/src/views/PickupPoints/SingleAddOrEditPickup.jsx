import React, { useState, useEffect } from "react";
import AppForm from "../../components/Forms/AppForm";
import { useNavigate, useParams } from "react-router-dom";
import AppModal from "../../components/BRMS_Modal/AppModal";
import { useDispatch, useSelector } from "react-redux";
import { singlePickUpModal } from "../../components/Table/LocationTable";
import { getLocationData, getPickUpData } from "../../store/selectors";
import { useFormUtils } from "../../utils/useFormUtils";
import { addPickUpPoints } from "../../store/features/pickup/pickUpPointThunks";
import { alertWithButton, alertWithButtonAndFunction } from "../../utils/Alert";
import { pickupFormValidationRules } from "../../utils/validationRules";
import { PkpDto } from "../../utils/contracts";
import FlexHeader from "../../components/Headers/FlexHeader";
import { BackButton, Button } from "../../components/Button/Button";
import { REQUEST_STATUS } from "../../utils/constants";
import { resetStatus } from "../../store/features/pickup/pickUpPointSlice";
import { fetchAllLocations } from "../../store/features/location/locationThunks";

const pickupFormInit = {
  id: "",
  name: "",
  title: "",
  busStop: "",
  description: "",
  status: false,
  locationId: "",
  location: {
    id: "",
    title: "",
    landmark: "",
    description: "",
    city: "",
    lcda: "",
    area: "",
  },
};

const SingleAddOrEditPickUpP = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locations } = useSelector(getLocationData);
  const { pickuppoints, addStatus, updateStatus } = useSelector(getPickUpData);
  const { id } = useParams();
  const {
    values,
    handleValueChange,
    errors,
    validateForm,
    setFields,
    getFormattedValues,
  } = useFormUtils(pickupFormInit, pickupFormValidationRules);
  const [formTopErr, setFormTopErr] = useState("");

  useEffect(() => {
    const pickupPoint = pickuppoints.find((p) => p.id === id);
    const location = locations.find((l) => l.id === pickupPoint?.locationId);
    if (location) {
      setFields({
        ...pickupPoint,
        "location.id": location.id,
        "location.title": location.title,
        "location.landmark": location.landmark,
        "location.description": location.description,
        "location.city": location.city,
        "location.lcda": location.lcda,
        "location.area": location.area,
      });
    }
  }, [id, locations, pickuppoints, setFields]);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    const isSubmissionValid = validateForm();
    if (!isSubmissionValid) return;
    const formValues = getFormattedValues();

    console.log(formValues);
    try {
      checkForDuplicatePickUpPoints(formValues, pickuppoints);
    } catch (error) {
      console.log(error.message);
      setFormTopErr(error.message);
      return;
    }
    const dto = new PkpDto(formValues, locations);
    if (id) {
      dispatch(addPickUpPoints(dto.getUpdatePkp()));
    } else {
      dispatch(addPickUpPoints(dto.getAddPkp()));
    }
  };

  return (
    <div className="page">
      <AppModal
        show={show}
        handleClose={handleClose}
        modalHeading={"Select Location"}
        closeBtn={"Close"}>
        {singlePickUpModal(locations, setFields, handleClose)}
      </AppModal>
      <FlexHeader headerText="Pick Up Points">
        <div className="btn-flex">
          <BackButton />
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </FlexHeader>
      <AppForm
        errors={errors}
        handleShow={handleShow}
        values={values}
        handleValueChange={handleValueChange}
        formTopErr={formTopErr}
        clearTopErr={() => setFormTopErr("")}
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

// function isObjectEqual (obj1, obj2) {
//   const obj1Keys = Object.keys(obj1);
//   const obj2Keys = Object.keys(obj2);
//   if (obj1Keys.length !== obj2Keys.length) return false;
//   for (const objKey of obj1Keys) {
//     if (obj1[objKey] !== obj2[objKey]) return false;
//   }
//   return true;
// }

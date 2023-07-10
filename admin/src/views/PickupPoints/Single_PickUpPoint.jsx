import React, { useState, useEffect } from "react";
import AppForm from "../../components/Forms/AppForm";
import { useNavigate } from "react-router-dom";
import AppModal from "../../components/BRMS_Modal/AppModal";
import { useDispatch, useSelector } from "react-redux";
import { singlePickUpModal } from "../../components/Table/LocationTable";
import { getLocationsData } from "../../store/selectors";
import { fetchAllLocations } from "../../store/thunks/locationThunks";
import { useFormUtils } from "../../utils/useFormUtils";
import { addPickUpPoints } from "../../store/thunks/pickUpPointThunks";
import { alert } from "../../utils/Alert";
import { Button } from "react-bootstrap";
import { pickupFormValidationRules } from "../../utils/validationRules";
import { PkpDto } from "../../utils/contracts";

const pickupFormInit = {
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
  locationOriginal: {
    id: "",
    title: "",
    landmark: "",
    description: "",
    city: "",
    lcda: "",
    area: "",
  },
};

const Single_PickUpPoint = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locations, status } = useSelector(getLocationsData);

  const { handleValueChange, errors, form, validateSubmission, setFormValues } =
    useFormUtils(pickupFormInit, pickupFormValidationRules);

  const handleThis = (e) => {
    const isSubmissionValid = validateSubmission(e);
    if (!isSubmissionValid) return;
    const dto = new PkpDto(form);
    console.log(dto);
    dispatch(addPickUpPoints(new PkpDto(form)));

    alert("success", "Pick Up Point Added Successfully");
    navigate(-1);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllLocations());
    }
  }, [status, locations, dispatch]);

  return (
    <div className="page">
      <AppModal
        show={show}
        handleClose={handleClose}
        modalHeading={"Select Location"}
        closeBtn={"Close"}>
        {singlePickUpModal(locations, setFormValues, handleClose)}
      </AppModal>
      <div className="heading">
        <h1 className="pt-5 pb-3">Pick Up Points</h1>
        <div className="component_container button_container">
          <Button
            variant="secondary"
            className="m-2"
            onClick={(e) => {
              handleThis(e);
            }}>
            Save
          </Button>
          <Button
            variant="secondary"
            className="m-2"
            onClick={() => {
              navigate(-1);
            }}>
            Back
          </Button>
        </div>
      </div>
      <AppForm
        errors={errors}
        handleShow={handleShow}
        form={form}
        handleValueChange={handleValueChange}
      />
    </div>
  );
};

export default Single_PickUpPoint;

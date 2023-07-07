import React, { useState, useEffect } from "react";
import AppForm from "../components/Common/Form/AppForm";
import { Button } from "react-bootstrap";
import AppModal from "../components/Common/BRMS_Modal/AppModal";
import { useDispatch, useSelector } from "react-redux"
import { singlePickUpModal } from "../components/Common/Table/LocationTable";
import { getAllLocations, getLocationStatus, getLocationError } from "../store/selectors";
import { fetchAllLocations } from "../store/thunks/locationThunks";
import { useFormUtils } from "../components/utils/FormUtils";
import { locationFormInit } from "../models/Picup";


const Single_PickUpPoint = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState({});
  const [locationError, setLocationError] = useState({});
  const dispatch = useDispatch();
  const locations = useSelector(getAllLocations);
  const locationStatus = useSelector(getLocationStatus);
  const [locationObj, setLocationObj] = useState({});
  const [select, setSelect] = useState(false)
  // const { initLocForm } = useFormUtils();

  const selectLocation = (form) => {
    setSelect(true)
    setLocationObj(form);
  }

  useEffect(() => {
    if(locationStatus === 'idle'){
      dispatch(fetchAllLocations());
    }
  }, [locationStatus, locations, dispatch])
  
  return (
    <div className="single_pickup">
      <AppModal
        show={show}
        handleClose={handleClose}
        modalHeading={"Select Location"}
        closeBtn={'Close'}
      >
        {singlePickUpModal(locations, selectLocation)}
      </AppModal>
      <div className="heading">
        <h1 className="pt-5 pb-3">Pick Up Points</h1>
      </div>
      <AppForm errors={errors} locationError={locationError} handleShow={handleShow} setLocationObj={locationObj} select={select} setSelect={setSelect} />

    </div>
  );
};

export default Single_PickUpPoint;

import React, { useState, useEffect } from "react";
import AppForm from "../components/Common/Form/AppForm";
import AppModal from "../components/Common/BRMS_Modal/AppModal";
import { useDispatch, useSelector } from "react-redux"
import { singlePickUpModal } from "../components/Common/Table/LocationTable";
import { getAllLocations, getLocationStatus } from "../store/selectors";
import { fetchAllLocations } from "../store/thunks/locationThunks";

const Single_PickUpPoint = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const errors = {};
  const locationError = {};
  const dispatch = useDispatch();
  const locations = useSelector(getAllLocations);
  const locationStatus = useSelector(getLocationStatus);
  const [select, setSelect] = useState(false);
  const [value, setValue] = useState({})

  const selectLocation = (form) => {
    setSelect(true);
    setValue(form)
    console.log(value)
  }

  useEffect(() => {
    if(locationStatus === 'idle'){
      dispatch(fetchAllLocations());
    }
  }, [locationStatus, locations, dispatch])
  
  return (
    <div className="page">
        <AppModal
          show={show}
          handleClose={handleClose}
          modalHeading={"Select Location"}
          closeBtn={"Close"}>
          {singlePickUpModal(locations, selectLocation)}
        </AppModal>
        <div className="heading">
          <h1 className="pt-5 pb-3">Pick Up Points</h1>
        </div>
        <AppForm
          errors={errors}
          locationError={locationError}
          handleShow={handleShow}
          select={select}
          setSelect={setSelect}
        />
    </div>
  );
};

export default Single_PickUpPoint;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/PckUpPointRegMgt.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPickupPoints } from "../../store/thunks/pickUpPointThunks";
import { getAllPickUps, getAllPickUpsStatus } from "../../store/selectors";
import Tables from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { getLocationsData } from "../../store/selectors";
import { fetchAllLocations } from "../../store/thunks/locationThunks";

const PickupPointMgt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pickUpPoints = useSelector(getAllPickUps);
  const pickUpPointStatus = useSelector(getAllPickUpsStatus);
  const { locations, status } = useSelector(getLocationsData);

  useEffect(() => {
    if (pickUpPointStatus === "idle") {
      dispatch(fetchPickupPoints());
    }
    if (status === "idle") {
      dispatch(fetchAllLocations());
    }
  }, [dispatch, pickUpPointStatus, status, locations]);

  const goToSinglePickUpPoint = () => {
    navigate("/pick_up_points/add-single");
  };

  const goToBulkPickUpPoints = () => {
    navigate("/pick_up_points/add-bulk");
  };

  return (
    <div className="page">
      <div className="heading mb-3">
        <h1 className="mb-3 mt-2">Pick Up Points</h1>
        {pickUpPoints.length > 0 && (
          <div className="btn-flex">
            <Button onClick={goToSinglePickUpPoint}>Add a Pick Up Point</Button>
            <Button variant="outline-primary" onClick={goToBulkPickUpPoints}>
              Add Multiple Pick Up Points
            </Button>
          </div>
        )}
      </div>

      {pickUpPoints.length === 0 ? (
        <>
          <div className="emptyContainer">
            <img
              src="/assets/illustrations/empty_list.png"
              alt=""
              width={300}
              height={250}
            />
            <p>There is no pickup point existing yet</p>
            <div className={style.buttonContainer}>
              <Button onClick={goToSinglePickUpPoint}>
                Add a Pick Up Point
              </Button>
              <Button variant="outline-primary" onClick={goToBulkPickUpPoints}>
                Add Multiple Pick Up Points
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Tables pickUpPoints={pickUpPoints} />
      )}
    </div>
  );
};

export default React.memo(PickupPointMgt);

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/PckUpPointRegMgt.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPickupPoints } from "../store/thunks/pickUpPointThunks";
import {
  getAllPickUps,
  getAllPickUpsStatus,
  getAllPickUpError,
} from "../store/selectors";
import Tables from "../components/Common/Table/Table";
import Button from "../components/Common/Button/Button";

const Pick_Up_Point = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pickUpPoints = useSelector(getAllPickUps);
  const pickUpPointError = useSelector(getAllPickUpError);
  const pickUpPointStatus = useSelector(getAllPickUpsStatus);

  useEffect(() => {
    if (pickUpPointStatus === "idle") {
      dispatch(fetchPickupPoints());
    }
  }, [dispatch, pickUpPointStatus]);

  const goToSinglePickUpPoint = () => {
    navigate("/pick_up_points/add-single");
  };

  const goToBulkPickUpPoints = () => {
    navigate("/pick_up_points/add-bulk");
  };

  return (
    <div className="page">
      <h1 className="p-4">Pick Up Points</h1>
      {pickUpPoints.length === 0 ? (
        <>
          <div className={style.emptyContainer}>
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
        <>
          <div className="button_container">
            <Button onClick={goToSinglePickUpPoint}>
              Set Up Single Pick Up Point
            </Button>
            <Button variant="outline-primary" onClick={goToBulkPickUpPoints}>
              Set Up Multiple Pick Up Point
            </Button>
          </div>

          <Tables pickUpPoints={pickUpPoints} />
        </>
      )}
    </div>
  );
};

export default React.memo(Pick_Up_Point);

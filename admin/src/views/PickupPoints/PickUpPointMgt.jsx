import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPickUpData } from "../../store/selectors";
import { Button } from "../../components/Button/Button";
import EmptyCtn from "../../components/EmptyContainer";
import FlexHeader from "../../components/Headers/FlexHeader";
import { REQUEST_STATUS } from "../../utils/constants";
import { clearError, resetStatus } from "../../store/features/pickup/pickUpPointSlice";
import { deletePickUpPoint } from "../../store/features/pickup/pickUpPointThunks";
import {alertWithButtonFunctionAndCancel, alert} from '../../utils/alert'
import PickUpTable from "../../components/Table/PickupPageTable";


const PickupPointMgt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pickuppoints, deleteStatus, error } = useSelector(getPickUpData);

  const goToSingleAdd = () => navigate("/pick_up_points/add-single");
  const goToBulkAdd = () => navigate("/pick_up_points/add-bulk");
  const navigateToEdit = (id) => {navigate(`/pick_up_points/edit/${id}`);};

  useEffect(() => {
    if (deleteStatus === REQUEST_STATUS.FAILED && error) {
      alert("error", "Error Deleting", error);
      dispatch(clearError());
    }
  }, [error, deleteStatus, dispatch]);

  useEffect(() => {
    if (deleteStatus === REQUEST_STATUS.SUCCEEDED)
      alert("success", "Location deleted successfully");
      dispatch(resetStatus("deleteStatus"))
  }, [deleteStatus, dispatch]);

  const deletePickupCallback = (row) => dispatch(deletePickUpPoint(row.id));
  const preDeletePickup = (row) =>
    alertWithButtonFunctionAndCancel(
      "warning",
      "Delete Pick Up Point",
      "Are you sure you want to delete this Pick Up Point?",
      "Yes",
      "No",
      deletePickupCallback.bind(null, row)
    );

  return (
    <div className="page">
      <FlexHeader headerText="Pick Up Points">
        {pickuppoints.length > 0 && (
          <ActionButtons goToSingleAdd={goToSingleAdd} goToBulkAdd={goToBulkAdd} />
        )}
      </FlexHeader>

      {pickuppoints.length === 0 ? (
        <EmptyCtn text="There is no pickup point existing yet">
          <div className="d-flex gap-1">
            <ActionButtons goToBulkAdd={goToBulkAdd} goToSingleAdd={goToSingleAdd} />
          </div>
        </EmptyCtn>
      ) : (
          <PickUpTable navigateToEdit={navigateToEdit} pickupPoints={pickuppoints} preDelete={preDeletePickup} />
      )}
    </div>
  );
};

export default memo(PickupPointMgt);

function ActionButtons ({goToSingleAdd, goToBulkAdd}) {
  return (
      <>
        <Button onClick={goToSingleAdd}>Add a Pick Up Point</Button>
        <Button variant="outline-primary" onClick={goToBulkAdd}>
          Add Multiple Pick Up Points
        </Button>
      </>
  )
}
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/PckUpPointRegMgt.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPickUpData } from "../../store/selectors";
import { Button } from "../../components/Button/Button";
import EmptyCtn from "../../components/EmptyContainer";
import XPTable from "../../components/Table/XPTable";
import FlexHeader from "../../components/Headers/FlexHeader";
import { REQUEST_STATUS } from "../../utils/constants";
import { clearError, resetStatus } from "../../store/features/pickup/pickUpPointSlice";
import { deletePickUpPoint } from "../../store/features/pickup/pickUpPointThunks";
import {AlertWithButtonAndFunctionAndCancel, alert} from  '../../utils/Alert'


const PickupPointMgt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pickuppoints, deleteStatus, error } = useSelector(getPickUpData);

  const goToSinglePickUpPoint = () => navigate("/pick_up_points/add-single");
  const goToBulkPickUpPoints = () => navigate("/pick_up_points/add-bulk");
  const navigateToEdit = (id) => navigate(`/pick_up_points/edit/${id}`);

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
    AlertWithButtonAndFunctionAndCancel(
      "warning",
      "Delete Location",
      "Are you sure you want to delete this location?",
      "Yes",
      "No",
      deletePickupCallback.bind(null, row)
    );

  return (
    <div className="page">
      <FlexHeader headerText="Pick Up Points">
        {pickuppoints.length > 0 && (
          <div className="btn-flex">
            <Button onClick={goToSinglePickUpPoint}>Add a Pick Up Point</Button>
            <Button variant="outline-primary" onClick={goToBulkPickUpPoints}>
              Add Multiple Pick Up Points
            </Button>
          </div>
        )}
      </FlexHeader>

      {pickuppoints.length === 0 ? (
        <EmptyCtn text="There is no pickup point existing yet">
          <div className={style.buttonContainer}>
            <Button onClick={goToSinglePickUpPoint}>Add a Pick Up Point</Button>
            <Button variant="outline-primary" onClick={goToBulkPickUpPoints}>
              Add Multiple Pick Up Points
            </Button>
          </div>
        </EmptyCtn>
      ) : (
        <XPTable
          data={pickuppoints}
          titles={["Name", "Title", "Nearest Bus Stop", "Status", "Action"]}
          serial
          renderitem={(pup, i) => (
            <>
              <td>{pup.name}</td>
              <td>{pup.title}</td>
              <td>{pup.busStop}</td>
              <td>{pup.status}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigateToEdit(pup.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => preDeletePickup(pup)}>
                    Delete
                  </Button>
                </div>
              </td>
            </>
          )}
        />
      )}
    </div>
  );
};

export default memo(PickupPointMgt);

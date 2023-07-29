import React, { useEffect } from "react";
import { getLocationData } from "../../store/selectors";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  alert,
  deleteAlert,
  successAlertWithFunction,
} from "../../utils/alert";
import {
  addLocation,
  deleteLocation,
  editLocation,
} from "../../store/features/location/locationThunks";
import { useDispatch } from "react-redux";
import FlexHeader from "../../components/Headers/FlexHeader";
import {
  clearError,
  resetStatus,
} from "../../store/features/location/locationSlice";
import { compareObjects, statusCheck } from "../../utils/utilities";
import LocationTable from "../../components/Table/LocationPageTable";
import LocationModal, {
  ModalActions,
} from "../../components/Modal/LocationPageModal";

const LocationsMgtPage = () => {
  const { locations, error, deleteStatus, addStatus, editStatus } =
    useSelector(getLocationData);
  const [showModal, setShowModal] = React.useState(false);
  const [modalAction, setModalAction] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const dispatch = useDispatch();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const [deleteSuccess, deleteFailed] = statusCheck(deleteStatus);
    const [addSuccess, addFailed] = statusCheck(addStatus);
    const [editSuccess, editFailed] = statusCheck(editStatus);
    if ((deleteFailed || addFailed || editFailed) && error) {
      alert("error", error);
      dispatch(clearError());
    }
    if (deleteSuccess) {
      alert("success", "Location deleted successfully");
      dispatch(resetStatus("deleteStatus"));
    }
    if (addSuccess || editSuccess) {
      const snippet = addSuccess ? "added" : "edited";
      successAlertWithFunction(
        `Location ${snippet} successfully`,
        "",
        handleClose
      );
      dispatch(resetStatus(addSuccess ? "addStatus" : "editStatus"));
    }
  }, [error, deleteStatus, addStatus, editStatus, dispatch]);

  const deleteLocationCallback = (row) => dispatch(deleteLocation(row.id));
  const preDeleteLocation = (row) =>
    deleteAlert("Location", deleteLocationCallback.bind(null, row));

  const preAddOrEdit = (location) => {
    if (!location) {
      setModalAction(ModalActions.ADD);
    } else {
      setModalAction(ModalActions.EDIT);
      setSelectedLocation(location);
    }
    handleShow();
  };

  const handleSave = (formData) => {
    if (selectedLocation && compareObjects(formData, selectedLocation)) {
      return;
    }
    if (modalAction === ModalActions.ADD) dispatch(addLocation(formData));
    else dispatch(editLocation(formData));
  };

  return (
    <div className="page">
      <Heading handleAddBtn={preAddOrEdit} />
      <LocationTable
        locations={locations}
        preAddOrEdit={preAddOrEdit}
        preDeleteLocation={preDeleteLocation}
      />
      <LocationModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        modalAction={modalAction}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default LocationsMgtPage;

function Heading(props) {
  return (
    <FlexHeader headerText="Locations Management">
      <Button variant="outline-primary" onClick={() => props.handleAddBtn()}>
        Add Location
      </Button>
    </FlexHeader>
  );
}

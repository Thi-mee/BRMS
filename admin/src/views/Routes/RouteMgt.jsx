import XPTable from "../../components/Table/shared/XPTable";
import { useSelector } from "react-redux";
import { getPickUpData, getRoutesData } from "../../store/selectors";
import FlexHeader from "../../components/Headers/FlexHeader";
import { Button } from "../../components/Button/Button";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteForm from "../../components/Forms/RouteForm";
import { alertWithButtonFunctionAndCancel } from "../../utils/alert";

const RouteMgt = (props) => {
  const { data: routes, error } = useSelector(getRoutesData);
  const { pickuppoints } = useSelector(getPickUpData);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleClose = () => {
    if (selectedRoute) setSelectedRoute(null);
    setShowModal(false);
  };

  return (
    <div className={"page"}>
      <FlexHeader headerText={"Routes"}>
        <Button onClick={handleShow}>Create new Route</Button>
      </FlexHeader>

      <RouteTable
        data={routes}
        pickuppoints={pickuppoints}
        onEdit={(dt) => {
          setSelectedRoute(dt);
          handleShow();
        }}
        onDelete={(dt) => {
          alertWithButtonFunctionAndCancel(
            "warning",
            "Delete Route",
            `Are you sure you want to delete ${dt.name} route?`,
            "Delete",
            "Cancel",
            () => console.log(dt)
          );
        }}
      />

      <Modal onHide={handleClose} show={showModal} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRoute === null ? "Create new Route" : "Edit Route"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RouteForm
            onSubmit={(dt) => handleClose()}
            values={selectedRoute ?? null}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RouteMgt;

function RouteTable(props) {
  const navigate = useNavigate();


  const getPickupPointName = (id) => {
    const pickupPoint = props.pickuppoints.find((p) => p.id === id);
    return pickupPoint?.name ?? "Not found";
  
  };

  const navigateToMappingPage = (id) => {
    navigate(`/routes/mapped-points/${id}`);
  };

  return (
    <XPTable
      serial
      data={props.data}
      titles={[
        "Name",
        "Title",
        "Start point",
        "Stop point",
        "Status",
        "Actions",
      ]}
      renderitem={(item, index) => (
        <>
          <td>{item.name}</td>
          <td>{item.title}</td>
          <td>{getPickupPointName(item.startPointId)}</td>
          <td>{getPickupPointName(item.endPointId)}</td>
          <td>{item.status}</td>
          <td>
            <RouteDropdown
              id={item.id}
              onDelete={() => props.onDelete(item)}
              onEdit={() => props.onEdit(item)}
              navigateToMappedPoints={() =>
                navigateToMappingPage(item.id)
              }
            />
          </td>
        </>
      )}
    />
  );
}

function RouteDropdown(props) {
  return (
    <DropdownButton id="dropdown-basic-button" title="Manage" variant={"light"}>
      <Dropdown.Item
        as={Button}
        onClick={props.onEdit}
        className="d-flex gap-2 align-items-center">
        <span className="material-symbols-outlined">edit</span> Edit
      </Dropdown.Item>
      <Dropdown.Item
        as={Button}
        onClick={props.onDelete}
        className="d-flex gap-2 align-items-center">
        <span className="clr-red material-symbols-outlined">delete</span> Delete
      </Dropdown.Item>
      <Dropdown.Item
        as={Button}
        onClick={props.navigateToMappedPoints}
        className="d-flex gap-2 align-items-center">
        <span className="material-symbols-outlined">map</span> Map
      </Dropdown.Item>
      <Dropdown.Item
        href="#/action-3"
        className="d-flex gap-2 align-items-center">
        <span className="clr-green material-symbols-outlined">schedule</span>
        Schedule
      </Dropdown.Item>
    </DropdownButton>
  );
}

import React from "react";
import FlexHeader from "../../components/Headers/FlexHeader";
import { Button } from "react-bootstrap";
import EmptyCtn from "../../components/EmptyContainer";
import XPTable from "../../components/Table/shared/XPTable";
import { useSelector } from "react-redux";
import { notStartOrEndPickupPoints } from "../../store/selectors";

const RouteMap = () => {
  const pickupPoints = useSelector(notStartOrEndPickupPoints);
  console.log(pickupPoints);
  return (
    <div className="page">
      <FlexHeader headerText="Routes Mapping">
        <Button> Save Changes </Button>
      </FlexHeader>
      <section className="mapped-pickupPoints">
        <h4>Mapped Pickup Points</h4>
      </section>
      <XPTable
        serial
        select
        selectMultiple
        titles={["Name", "Title", "Bus Stop", "Status", "Location"]}
        data={pickupPoints}
        renderitem={(item, index) => (
          <>
            <td>{item.name}</td>
            <td>{item.title}</td>
            <td>{item.busStop}</td>
            <td>{item.status}</td>
            <td>{item.location?.title}</td>
          </>
        )}
      />
    </div>
  );
};

export default RouteMap;

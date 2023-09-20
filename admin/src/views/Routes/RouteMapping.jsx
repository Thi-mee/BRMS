import React, { useEffect, useState } from "react";
import FlexHeader from "../../components/Headers/FlexHeader";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRoutesData } from "../../store/selectors";
import { notStartOrEndPickupPoints } from "../../store/selectors";
import { useNavigate, useParams } from "react-router-dom";
import { statusCheck } from "../../utils/utilities";
import RouteMappingTable from "../../components/Table/RouteMappingTable";
import { alert } from "../../utils/alert";
import {
  clearError,
  resetStatus,
} from "../../store/features/routes/routeSlice";
import { mapRoutes } from "../../store/features/routes/routeThunks";

const RouteMap = () => {
  const navigate = useNavigate();
  const { mapStatus, error } = useSelector(getRoutesData);
  const pickupPoints = useSelector(notStartOrEndPickupPoints);
  const [mappedPups, setMappedPups] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const [mapSuccess, mapFailed] = statusCheck(mapStatus);

    if (mapFailed && error) {
      alert("Error", error);
      dispatch(clearError());
    }
    if (mapSuccess) {
      alert("success", "Pickppoint mapped successfully");
      dispatch(resetStatus("mapStatus"));
      navigate(-1);
    }
  }, [dispatch, error, mapStatus, navigate]);

  return (
    <div className="page">
      <FlexHeader headerText="Routes Mapping">
        <Button
          variant="danger"
          onClick={() => {
            navigate(-1);
          }}>
          Back
        </Button>
        <Button
          onClick={() => {
            dispatch(mapRoutes({ id: id, arrayOfItems: mappedPups }));
          }}>
          {" "}
          Save Changes{" "}
        </Button>
      </FlexHeader>
      <section className="mapped-pickupPoints">
        <p style={{color: "#B11A"}}>Mapped pickup points are checked by default</p>
        <RouteMappingTable
          data={pickupPoints}
          setMappedPups={setMappedPups}
          mappedPups={mappedPups}
        />
      </section>
      {/* <XPTable
        serial
        select
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
      /> */}
    </div>
  );
};

export default RouteMap;

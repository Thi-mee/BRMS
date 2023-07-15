import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPickupPoints } from "../../store/features/pickup/pickUpPointThunks";
import { fetchAllLocations } from "../../store/features/location/locationThunks";
import {
  getLocationFetchStatus,
  getPickupFetchStatus,
} from "../../store/selectors";
import { REQUEST_STATUS } from "../../utils/constants";

const Layout = () => {
  const dispatch = useDispatch();
  const fetchLStatus = useSelector(getLocationFetchStatus);
  const fetchPStatus = useSelector(getPickupFetchStatus);

  const isLoading = () =>
    fetchLStatus === REQUEST_STATUS.LOADING &&
    fetchPStatus === REQUEST_STATUS.LOADING;

  useEffect(() => {
    dispatch(fetchPickupPoints());
    dispatch(fetchAllLocations());
  }, [dispatch]);

  return (
    <div className={style.AdminLayout}>
      <Sidebar />
      <div className={style.AdminLayout__content}>
        {isLoading() ? (
          <div className="loader">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Layout;

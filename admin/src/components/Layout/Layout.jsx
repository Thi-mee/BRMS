import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPickupPoints } from "../../store/thunks/pickUpPointThunks";
import { fetchAllLocations } from "../../store/thunks/locationThunks";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPickupPoints());
    dispatch(fetchAllLocations());
  }, [dispatch]);

  return (
    <div className={style.AdminLayout}>
      <Sidebar />
      <div className={style.AdminLayout__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

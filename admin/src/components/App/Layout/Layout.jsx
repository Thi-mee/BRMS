import React from "react";
import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Common/Sidebar/Sidebar";

const Layout = () => {
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

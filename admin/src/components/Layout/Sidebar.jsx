import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={style.container}>
        <span className={style.title}>
          B.R.M.S.
        </span>
      <NavLink>Dashboard</NavLink>
      <NavLink>Route Mgt</NavLink>
      <NavLink to="/pick_up_points" className={({isActive}) => isActive ? style.active : ''}>
        Pick Up Point Mgt
      </NavLink>
      <NavLink to="/locations">Location</NavLink>
      <NavLink>Authorization Workflow</NavLink>
    </div>
  );
};

export default React.memo(Sidebar);

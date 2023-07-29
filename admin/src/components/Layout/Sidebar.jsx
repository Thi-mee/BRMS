import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={style.container}>
        <span className={style.title}>
          B.R.M.S.
        </span>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/pick_up_points" className={({isActive}) => isActive ? style.active : ''}>
        Pick-Up Management
      </NavLink>
      <NavLink to="/locations">Location Management</NavLink>
      <NavLink to="/routes">Route Management</NavLink>
      <NavLink to={'/authorize-workflow'}>Authorization Workflow</NavLink>
    </div>
  );
};

export default React.memo(Sidebar);

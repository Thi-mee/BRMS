import React from 'react';
import { NavLink } from 'react-router-dom';
import style from "./Sidebar.module.css";
import {MdOutlineAppRegistration} from "react-icons/md"

const Sidebar = () => {
  return (
    <div className={style.container}>
        <NavLink>Dashboard</NavLink>
        <NavLink>Book Categories</NavLink>
        <NavLink to="/pick_up_points"><MdOutlineAppRegistration/>Pick-Up-Point Registration</NavLink>
        <NavLink>Location</NavLink>
        <NavLink>Authorization Workflow</NavLink>

    </div>
  )
}

export default React.memo(Sidebar)
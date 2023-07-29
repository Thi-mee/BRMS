import React from "react";
import styles from "./StatusLight.module.css";

const StatusLight = ({ status }) => {
  return <div className={`${styles.statusLight} ${styles[status]}`}></div>;
};

export default StatusLight;

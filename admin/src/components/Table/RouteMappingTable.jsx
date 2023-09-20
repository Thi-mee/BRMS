import React, { useState } from "react";
import { Table } from "react-bootstrap";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { getRoutesData } from "../../store/selectors";

const RouteMappingTable = ({ data, setMappedPups }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [mappedToARoute, setMappedToARoute] = useState(true);

  const {  mappedData } = useSelector(getRoutesData);

  const handleCheckboxChange = (event, item) => {
    setMappedToARoute(event.target.checked)
    !mappedToARoute ? setMappedToARoute(true) : setMappedToARoute(false)
    setIsChecked(event.target.checked);

    if (event.target.checked) {
      setMappedPups((prevMappedPups) => prevMappedPups.includes(item.id)
      ? prevMappedPups.filter((id) => id === item.id)
      : [...prevMappedPups, item.id]);
    } else {
      console.log(event.target.checked);
      setMappedPups([]);
    }
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>S/N</th>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Title</th>
            <th>Bus-Stop</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  type="checkbox"
                  checked={isChecked}
                  onChange={(event) => {
                    handleCheckboxChange(event, item);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={mappedData.some((mapped)=> mapped?.pickuppointId === item.id) ? mappedToARoute : isChecked}
                    onChange={(event) => {
                      handleCheckboxChange(event, item);
                    }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.busStop}</td>
                <td>{item.status}</td>
                <td>{item.location?.title}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default RouteMappingTable;

// SEND AN EMAIL TO MR. KEHINDE TODAY

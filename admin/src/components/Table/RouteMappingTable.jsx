import React, { useState } from "react";
import Table from "react-bootstrap/Table";

const RouteMappingTable = ({ data, setMappedPups, mappedPups }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event, item) => {
    setIsChecked(event.target.checked);

    if (event.target.checked) {
        setMappedPups(prevMappedPups => [...prevMappedPups, item.id]);
    } else {
        setMappedPups((prevMappedPups) =>
        prevMappedPups.includes(item.id)
          ? prevMappedPups.filter((id) => id !== item.id)
          : [...prevMappedPups, item.id]
      );
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
                  onChange={(event)=>{handleCheckboxChange(event, item)}}
                >
                  <input type="checkbox" />
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

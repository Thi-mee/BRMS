import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getRoutesData } from "../../store/selectors";

const RouteMappingTable = ({ data, setMappedPups, mappedPups }) => {
  const { mappedData } = useSelector(getRoutesData);

  // const [hasRoute, setHasRoute] = useState(null)

  const handleAllCheckboxChange = (event) => {
    if (event.target.checked) {
      setMappedPups(data.map((item) => item.id));
    } else {
      setMappedPups([]);
    }
  };

  const handleCheckboxChange = (event, item) => {
    setMappedPups((prevMappedPups) => {
      if (prevMappedPups.includes(item.id)) {
        return prevMappedPups.filter((id) => id !== item.id);
      }
      return [...prevMappedPups, item.id];
    });
    console.log(mappedPups);
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>S/N</th>
            <th>
              <input type="checkbox" onChange={handleAllCheckboxChange} />
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
                <td>
                  <input
                    type="checkbox"
                    checked={mappedData.some((route) => route.pickuppointId === item.id)}
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

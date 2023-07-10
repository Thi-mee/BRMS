import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { CheckboxField } from "../Forms/Fields";

export const LocationTable = ({
  locations,
  setField,
  selectedIndex,
}) => {
  const [selectedLocation, setSelectedLocation] = useState({});

  const handleCheckChange = (e, value) => {
    setSelectedLocation(value);
    setField("locationTitle", value.title, selectedIndex);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          {/* <th>
            <input type="checkbox" />
          </th> */}
          <th>Title</th>
          <th>City</th>
          <th>Area</th>
          <th>Local Government</th>
        </tr>
      </thead>
      <tbody>
        {locations?.map((value, index) => {
          return (
            <tr key={index}>
              <td>
                <CheckboxField
                  name="location"
                  type="radio"
                  value={value === selectedLocation}
                  onChange={(e) => handleCheckChange(e, value)}
                />
              </td>
              <td>{value.title}</td>
              <td>{value.city}</td>
              <td>{value.area}</td>
              <td>{value.lcda}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export const singlePickUpModal = (locations, setFormValues, handleClose) => {
  const handleSettingLocation = (location) => {
    setFormValues({ location, locationOriginal: location });
    handleClose();
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Title</th>
          <th>City</th>
          <th>Area</th>
          <th>Local Government</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((value, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value.title}</td>
              <td>{value.city}</td>
              <td>{value.area}</td>
              <td>{value.lcda}</td>
              <td>
                <Button onClick={() => handleSettingLocation(value)}>
                  Select
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

// const LocationTable = () => {
//   return <></>;
// };

export default LocationTable;

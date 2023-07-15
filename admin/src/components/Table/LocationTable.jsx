import { Table, Button } from "react-bootstrap";
import XPTable from "./XPTable";

export const LocationTable = ({
  locations,
  onSelect,
}) => {
  return (
    <XPTable
      data={locations}
      titles={["Title", "City", "Area", "LCDA", ""]}
      serial
      renderitem={(item) => (
        <>
          <td className="text-ellipsis" style={{maxWidth: '120px'}}>{item.title}</td>
          <td className="text-ellipsis" style={{maxWidth: '120px'}}>{item.city}</td>
          <td className="text-ellipsis" style={{maxWidth: '120px'}}>{item.area}</td>
          <td className="text-ellipsis" style={{maxWidth: '120px'}}>{item.lcda}</td>
          <td className="text-ellipsis" style={{maxWidth: '120px'}}>
            <Button onClick={() => onSelect(item)}>Select</Button>
          </td>
        </>
      )}
    />
  );
};

export const singlePickUpModal = (locations, setFields, handleClose) => {
  const handleSettingLocation = (location) => {
    setFields({
      "location.id": location.id,
      "location.title": location.title,
      "location.landmark": location.landmark,
      "location.description": location.description,
      "location.city": location.city,
      "location.lcda": location.lcda,
      "location.area": location.area,
    });
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

export default LocationTable;

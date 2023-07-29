import { Table, Button } from "react-bootstrap";
import XPTable from "./shared/XPTable";

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
            <Button size="sm" onClick={() => onSelect(item)}>Select</Button>
          </td>
        </>
      )}
    />
  );
};

export const SinglePickUpModal = ({locations, setSelectedLocation}) => {

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
                <Button onClick={() => setSelectedLocation(value)}>
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

import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";

const XPTable = ({
  titles,
  renderitem,
  data,
  noOfButtons,
  renderBtn,
  selectMultiple,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handlesindleSelect = (rowId) => {
    setSelectedRows([rowId]);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
  };

  const handleCheck = (rowId) => {
    if (selectMultiple) {
      handleRowSelect(rowId);
    } else {
      handlesindleSelect(rowId);
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          {
            <th>
              {selectMultiple && (
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={handleSelectAll}
                />
              )}
            </th>
          }
          {titles?.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {/* {selectedRows.length > 0 && ( */}
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(rowIndex)}
                onChange={() => handleCheck(rowIndex)}
              />
            </td>
            {/* )} */}
            {renderitem && renderitem(row, rowIndex)}
            <td className="d-flex gap-2">
              {noOfButtons &&
                renderBtn &&
                new Array(noOfButtons)
                  .fill(<Button />)
                  .map((_, index) => renderBtn(index, rowIndex, row))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default XPTable;

// {/* <XPTable
//   titles={["Name", "Age", "Gender"]}
//   data={[
//     ["John", "20", "Male"],
//     ["Jane", "22", "Female"],
//   ]}
//   noOfButtons={2}
//   render={(buttonIndex, rowIndex) => (
//     <Button
//       key={buttonIndex}
//       onClick={() => console.log(`Button ${buttonIndex} clicked`)}
//     >
//       Button {buttonIndex}
//     </Button>
//   )}
// />; */}

import React, { memo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const XPTable = ({
  titles,
  renderitem,
  data,
  serial,
  select,
  selectMultiple,
  onSelect,
  ...rest
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  
  useEffect(() => {
    if (onSelect && typeof onSelect === "function")
      onSelect(selectedRows.map((rowIndex) => data[rowIndex]));
    else if (onSelect && typeof onSelect !== "function")
      console.error("onSelect must be a function");
  }, [selectedRows, onSelect, data]);

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
    <Table {...rest}>
      <thead>
        <tr>
          {serial && <th>S/N</th>}
          {select && (
            <th>
              {selectMultiple && (
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={handleSelectAll}
                />
              )}
            </th>
          )}
          {titles?.map((title, index) => (
            <th key={index} className="text-ellipsis">
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {serial && <td>{rowIndex + 1}</td>}
            {select && (
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(rowIndex)}
                  onChange={() => handleCheck(rowIndex)}
                />
              </td>
            )}
            {renderitem
              ? renderitem(row, rowIndex)
              : Object.values(row).map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default memo(XPTable);

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

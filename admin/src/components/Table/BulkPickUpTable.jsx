import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoAdd, IoPencil } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import { ModalActions } from "../BulkPageComponents/BulkPageModal";

const getTableHeader = () => {
  return (
    <tr>
      <th>S/N</th>
      <th>
        <input type="checkbox" />
      </th>
      <th>Name</th>
      <th>Title</th>
      <th>Description</th>
      <th>Bus Stop</th>
      <th>Status</th>
      <th>Location Title</th>
      <th>Actions</th>
    </tr>
  );
};

const BulkPickUpTable = ({
  xlsxData,
  handleShow,
  handleCheckChange,
}) => {

  const onCheckChange = (e, value) => {
    handleCheckChange(e, value);
  };


  const getTableBody = (xlsxData) => {
    return xlsxData.map((value, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <input type="checkbox" onClick={(e) => onCheckChange(e, index)}/>
          </td>
          <td>{value.name}</td>
          <td>{value.title}</td>
          <td>{value.description}</td>
          <td>{value.busStop}</td>
          <td title="status">{parseInt(value.status) ? "Active" : "Inactive"}</td>
          <td title="balablu" onClick={()=>{handleShow(ModalActions.EDIT,index , value)}}>
            <Link>{value.locationTitle}</Link>
          </td>
          <td>
            <IoAdd
              className="bulktable_icons"
              onClick={() => {
                handleShow(ModalActions.ADD, index);
              }}
            />
            <TbArrowBackUp
              className="bulktable_icons"
              onClick={() => {
                handleShow(ModalActions.SELECT, index);
              }}
            />
            <IoPencil
              className="bulktable_icons"
              onClick={() => {
                handleShow( ModalActions.EDIT_PICKUP, index, value);
              }}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Table striped hover className="mt-4">
        <thead>{getTableHeader()}</thead>
        <tbody>{getTableBody(xlsxData)}</tbody>
      </Table>
    </>
  );
};

export default BulkPickUpTable;

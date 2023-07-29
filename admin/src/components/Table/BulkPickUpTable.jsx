import React from "react";
import { IoAdd, IoPencil } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalActions } from "../Modal/BulkPageModal";
import XPTable from "./shared/XPTable";
import { alertWithButtonFunctionAndCancel } from "../../utils/alert";

const BulkPickUpTable = ({ xlsxData, handleShow, onSelect }) => {
  let filteredData = [];
  const deletePup = (item) => {
    filteredData = xlsxData.filter((data) => data.name !== item.name);
  };

  const handleDelete = (item) => {
    alertWithButtonFunctionAndCancel(
      "warning",
      "Delete Pick_Up Point",
      "Are you sure you want to delete this pickup point?",
      "Yes",
      "No",
      deletePup.bind(null, item)
    );
  };

  return (
    <XPTable
      titles={[
        "Name",
        "Title",
        "Description",
        "Bus Stop",
        "Status",
        "Location Title",
        "Actions",
      ]}
      data={filteredData.length > 0 ? filteredData : xlsxData}
      selectMultiple={true}
      select={true}
      serial
      onSelect={onSelect}
      renderitem={(item, index) => (
        <>
          <td>{item.name}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.busStop}</td>
          <td>{item.status > 0 ? "active" : "inactive"}</td>
          <td>
            <span
              className="updateLink"
              onClick={() => handleShow(ModalActions.EDIT_LOCATION, index, item)}>
              {item.locationTitle ?? ""}
            </span>
          </td>
          <td className="d-flex justify-content-center align-items-center gap-2">
            <span
                className="cp clr-blue material-symbols-outlined"
                onClick={() => handleShow(ModalActions.ADD_LOCATION, index)}
            >add</span>
            <span
                className="cp clr-blue material-symbols-outlined"
                onClick={() => handleShow(ModalActions.SELECT_LOCATION, index)}
            >list</span>
            <span
                className="cp clr-blue material-symbols-outlined"
                onClick={() => handleShow(ModalActions.EDIT_PICKUP, index, item)}
            >edit</span>
            <span
                className="cp clr-red material-symbols-outlined"
                onClick={() => handleDelete(item)}
            >delete</span>
          </td>
        </>
      )}
    />
  );
};

export default BulkPickUpTable;

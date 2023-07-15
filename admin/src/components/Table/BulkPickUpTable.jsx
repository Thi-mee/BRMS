import React from "react";
import { IoAdd, IoPencil } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import { ModalActions } from "../BulkPageComponents/BulkPageModal";
import XPTable from "./XPTable";

const BulkPickUpTable = ({ xlsxData, handleShow, onSelect }) => {

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
      data={xlsxData}
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
            <span className="updateLink" onClick={() => handleShow(ModalActions.EDIT, index, item)}>{item.locationTitle ?? ""}</span>
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
                handleShow(ModalActions.EDIT_PICKUP, index, item);
              }}
            />
          </td>
        </>
      )}
    />
  );
};

export default BulkPickUpTable;

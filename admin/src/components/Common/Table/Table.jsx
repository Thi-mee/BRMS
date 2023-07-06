import React from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa"

const Tables = ({pickUpPoints}) => {

    const getPickUpPointTableHeader = () => {
        return (
            <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Title</th>
                <th>Nearest Bus-Stop</th>
                <th>Status</th>
                <th>Action</th>
          </tr>
        );
    }

    const getPickUpPointData = (pickUpPoints) => {
        return pickUpPoints.map((value, index)=>{
            return(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.Name}</td>
                    <td>{value.Title}</td>
                    <td>A Bus Stop</td>
                    <td>{value.Status > 0 ? "Active" : "Inactive"}</td>
                    <td>{<FaRegEdit/>}</td>
                </tr>
    
            )

        })
    }
  return (
    <Table striped bordered hover>
      <thead>
        {getPickUpPointTableHeader()}
      </thead>
      <tbody>
        {getPickUpPointData(pickUpPoints)}
      </tbody>
    </Table>
  );
};

export default Tables;

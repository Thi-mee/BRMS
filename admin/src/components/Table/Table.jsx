import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Tables = ({pickUpPoints}) => {
  
  const navigate = useNavigate();
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
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.title}</td>
                <td>{value.busStop}</td>
                <td>{value.status}</td>
                <td onClick={()=>{navigate(+1)}}>{<span className="material-symbols-outlined edit_icon">edit</span>}</td>
              </tr>
            );

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

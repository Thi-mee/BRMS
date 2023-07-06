import React from 'react';
import {Table, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {IoAdd} from "react-icons/io5";
import{TbArrowBackUp} from "react-icons/tb"


const BulkPickUpTable = ({ renderTable, xlsxData, handleShow, setModalHeading, setCloseBtn }) => {


    const getTableHeader = () => {
        return(
            <tr>
                <th>S/N</th>
                <th><input type="checkbox" /></th>
                <th>Name</th>
                <th>Title</th>
                <th>Description</th>
                <th>BusStop</th>
                <th>Status</th>
                <th>Location Title</th>
                <th>Actions</th>
            </tr>
        );
    }

    const getTableBody = (xlsxData) => {
        return (
        xlsxData.map((value, index)=>{
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td><input type="checkbox"/></td>
                    <td>{value[0]}</td>
                    <td>{value[1]}</td>
                    <td>{value[2]}</td>
                    <td>{value[3]}</td>
                    <td>{value[4] ? "Active" : "Inactive"}</td>
                    <td><Link></Link></td>
                    <td><IoAdd className="bulktable_icons" /><TbArrowBackUp className="bulktable_icons" onClick={()=>{handleShow(); setModalHeading("Select Location"); setCloseBtn("Select")}} /><Button>Edit</Button></td>
                </tr>
            );

        }))
    }

  return (
    <>
        <Table striped hover className='mt-4'>
            <thead>
                {getTableHeader()}
            </thead>

            <tbody>
                {renderTable && getTableBody(xlsxData)}
            </tbody>
        </Table>
    
    </>
  )
}

export default BulkPickUpTable
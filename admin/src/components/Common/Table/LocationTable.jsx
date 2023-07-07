import { useState } from "react";
import {Table, Button} from "react-bootstrap";
import { useFormUtils } from "../../utils/FormUtils";

export const locationTableModal = (locations) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th><input type="checkbox" /></th>
                    <th>Title</th>
                    <th>City</th>
                    <th>Area</th>
                    <th>Local Government</th>
                </tr>
            </thead>
            <tbody>
                    {locations.map((value, index)=>{
                        return(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><input type="checkbox"  /></td>
                            <td>{value.Title}</td>
                            <td>{value.City}</td>
                            <td>{value.Area}</td>
                            <td>{value.LCDA}</td>
                        </tr>
                        );
                    })}
            </tbody>
        </Table>
    );
}

export const singlePickUpModal = (locations, selectLocation) => {
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
                {locations.map((value, index)=>{
                    return(
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.title}</td>
                        <td>{value.city}</td>
                        <td>{value.area}</td>
                        <td>{value.lcda}</td>
                        <td><Button onClick={()=>{selectLocation(value)}}>Select</Button></td>
                    </tr>
                    );
                })}
        </tbody>
    </Table>
    );
}

const LocationTable = () => {

    
    return( 
        <>

        </>
    );

}

export default LocationTable;
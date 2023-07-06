import { useState } from "react";
import {Table} from "react-bootstrap"

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

const LocationTable = () => {

    
    return( 
        <>

        </>
    );

}

export default LocationTable;
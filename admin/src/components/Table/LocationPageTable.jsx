import XPTable from "./shared/XPTable";
import {Button} from "react-bootstrap";
import React from "react";
import StatusLight from "../StatusLight";

const LocationTable = (props) => (
  <XPTable
    titles={[
      "Title",
      "Description",
      "Area",
      "City",
      "LCDA",
      "Landmark",
      "Actions",
    ]}
    data={props.locations}
    serial
    renderitem={(row, rowIndex) => (
      <>
        <td>
          <div className="d-flex align-items-center gap-1">
          {row.is_referenced ? (
            <StatusLight status={"success"} />
          ) : (
            <StatusLight status={"danger"} />
          )}
          {row.title}
          </div>
        </td>
        <td>{row.description}</td>
        <td>{row.area}</td>
        <td>{row.city}</td>
        <td>{row.lcda}</td>
        <td>{row.landmark}</td>
        <td>
          {
            <div className="btn-flex">
              <Button
                variant="warning"
                size="sm"
                onClick={() => props.preAddOrEdit(props.locations[rowIndex])}>
                Edit
              </Button>
              {!row.is_referenced && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => props.preDeleteLocation(row)}>
                  Delete
                </Button>
              )}
            </div>
          }
        </td>
      </>
    )}
  />
);


export default LocationTable
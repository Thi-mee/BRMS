import React, { useState } from "react";
import CSVReaderProp from "../components/Common/CSVReader/CSVReader";

const Bulk_PickUpPoints = () => {
    const [xlsxData, setXlsxData] = useState([]);

  return (
    <div className="container">
      <h1>Bulk Pick Up Points</h1>
        <CSVReaderProp xlsxData={xlsxData} setXlsxData={setXlsxData} />

    </div>
  );
};

export default Bulk_PickUpPoints;

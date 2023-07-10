import React from "react";

const FlexHeader = ({headerText, buttonTexts, renderButton}) => {
  return (
    <div className="heading mb-3 mt-2">
      <h2>{headerText}</h2>
      <div className="btn-flex">
        {
          renderButton && buttonTexts.map((text, index) => {
            const {variant, href, download, onClick, show} = renderButton(text, index);
            return (
              renderButton(text, index)
            )
          })
        }
        {/* {!shouldTableRender && (
          <Button
            variant="outline-dark"
            href="/assets/pickup-points.xlsx"
            download>
            Download Template
          </Button>
        )}
        <Button variant="outline-danger" onClick={() => navigate(-1)}>
          Back
        </Button>
        {shouldTableRender && <Button onClick={handleSave}>Save</Button>} */}
      </div>
    </div>
  );
};

export default FlexHeader;

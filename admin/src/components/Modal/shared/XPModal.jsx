import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/**
 *
 * @param modalHeading
 * @param show
 * @param onHide
 * @param handleShow
 * @param children
 * @param size
 * @param useFooter
 * @param closeBtn
 * @returns {JSX.Element}
 * @constructor
 */
const XPModal = ({
  modalHeading,
  show,
  onHide,
  size = "lg",
  children,
  closeBtn,
  useFooter,
}) => {
  return (
    <Modal size={size} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {useFooter && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {closeBtn || "Close"}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default XPModal;

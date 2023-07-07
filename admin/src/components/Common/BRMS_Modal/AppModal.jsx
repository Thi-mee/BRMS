import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AppModal = ({modalHeading, show, handleClose, handleShow, children, closeBtn}) => {

  return (
    <div>

      <Modal size="lg" show={show} onHide={handleClose}  >
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {closeBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AppModal
import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";

function EditTaskModal({ visible, hide }) {

  return (
    <Modal show={visible} onHide={hide}>
      <Modal.Header closeButton>title</Modal.Header>
      <Modal.Body>content</Modal.Body>
      <Modal.Footer>
        <Button>action</Button>
        <Button>cancel</Button>
      </Modal.Footer>
    </Modal>
  );

}

EditTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

export default EditTaskModal;

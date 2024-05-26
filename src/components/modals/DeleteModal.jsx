import React from "react";
import { Modal, Button } from "react-bootstrap";
import { DeleteButton } from "../fetches/DeleteButton";

export function DeleteModal({ show, handleClose, handleDelete, venueId }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this venue?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <DeleteButton venueId={venueId} onDeleteSuccess={handleDelete} />
      </Modal.Footer>
    </Modal>
  );
}

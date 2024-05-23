import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { VenueCreationModal } from "./modals/VenueCreationModal.jsx";
import { SendVenue } from "./fetches/SendVenue.jsx";

export function VenueCreationButton({ isVenueManager }) {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowModal = () => {
    if (isVenueManager) {
      setShowModal(true);
    } else {
      setErrorMessage(
        "Only venue managers can create a venue. Please update your profile to become a venue manager."
      );
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Create Venue
      </Button>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <VenueCreationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleCreateVenue={SendVenue} // Passing SendVenue function as onSubmit handler
      />
    </>
  );
}

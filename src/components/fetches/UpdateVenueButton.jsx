import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ApiKey } from "./ApiKey";

export function UpdateVenueButton({
  venueId,
  updatedVenueData,
  onUpdateSuccess,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const userItem = JSON.parse(localStorage.getItem("user"));

  const handleUpdate = async () => {
    const url = `https://v2.api.noroff.dev/holidaze/venues/${venueId}`;

    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userItem.accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": ApiKey,
      },
      body: JSON.stringify(updatedVenueData),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        onUpdateSuccess();
        location.reload();
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || "Failed to update the venue.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("An error occurred while trying to update the venue.");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleUpdate}>
        Save Changes
      </Button>
      {errorMessage && (
        <Form.Control.Feedback type="invalid" className="d-block mt-2">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </>
  );
}

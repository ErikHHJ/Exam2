import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ApiKey } from "./ApiKey";

export function DeleteButton({ venueId, onDeleteSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");
  const userItem = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    const url = `https://v2.api.noroff.dev/holidaze/venues/${venueId}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userItem.accessToken}`,
        "X-Noroff-API-Key": ApiKey,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        onDeleteSuccess();
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || "Failed to delete the venue.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("An error occurred while trying to delete the venue.");
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      {errorMessage && (
        <Form.Control.Feedback type="invalid" className="d-block mt-2">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </>
  );
}

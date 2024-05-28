import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ApiKey } from "./ApiKey";

export function UpdateButton({ updatedProfileData }) {
  const [errorMessage, setErrorMessage] = useState("");
  const userItem = JSON.parse(localStorage.getItem("user"));
  const url = `https://v2.api.noroff.dev/holidaze/profiles/${userItem.name}`;

  const handleUpdate = async () => {
    try {
      const structuredData = {
        bio: updatedProfileData.bio,
        avatar: {
          url: updatedProfileData.avatar,
          alt: "Profile avatar",
        },
        banner: {
          url: updatedProfileData.banner,
          alt: "Profile banner",
        },
        venueManager: updatedProfileData.venueManager,
      };

      const validateUrl = (url) => {
        try {
          new URL(url);
          return true;
        } catch (e) {
          return false;
        }
      };

      if (
        !validateUrl(structuredData.avatar.url) ||
        !validateUrl(structuredData.banner.url)
      ) {
        setErrorMessage("Invalid URL provided for avatar or banner.");
        return;
      }

      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userItem.accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": ApiKey,
        },
        body: JSON.stringify(structuredData),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        window.location.href = "/success";
        location.reload();
      } else {
        if (response.status === 400) {
          const errorResponse = await response.json();
          setErrorMessage(
            errorResponse.message || "Error 400, One of the images are invalid."
          );
        } else {
          throw new Error("Failed to make the request");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Image is not accessible.");
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

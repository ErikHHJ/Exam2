import React from "react";
import { Button } from "react-bootstrap";
import { ApiKey } from "./ApiKey.jsx";

export async function SendVenue({ formData, handleClose }) {
  console.log("Form Data:", formData);

  try {
    const url = "https://v2.api.noroff.dev/holidaze/venues";

    const userItem = JSON.parse(localStorage.getItem("user"));

    // Ensure the media array is correctly structured
    const media = formData.media.map((mediaItem) => ({
      url: mediaItem.url,
      alt: mediaItem.alt,
    }));

    // Structure location object
    const location = {
      address: formData.location.address || null,
      city: formData.location.city || null,
      zip: formData.location.zip || null,
      country: formData.location.country || null,
      continent: formData.location.continent || null,
      lat: parseFloat(formData.location.lat) || 0,
      lng: parseFloat(formData.location.lng) || 0,
    };

    // Create payload object
    const payload = {
      name: formData.name,
      description: formData.description,
      media: media,
      price: parseInt(formData.price),
      maxGuests: parseInt(formData.maxGuests),
      rating: parseInt(formData.rating),
      meta: formData.meta,
      location: location,
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userItem.accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": ApiKey,
      },
      body: JSON.stringify(payload),
    };

    console.log("Data being sent:", payload); // Log the data being sent

    const response = await fetch(url, options);
    const responseBody = await response.json();

    if (response.ok) {
      // Venue created successfully
      console.log("Venue created successfully", responseBody);
      handleClose(); // Close the modal after successful venue creation
    } else {
      console.error("Failed to create venue", responseBody);
      throw new Error(
        `Failed to create venue: ${responseBody.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error creating venue:", error);
    // Handle error, show error message to user, etc.
  }
}
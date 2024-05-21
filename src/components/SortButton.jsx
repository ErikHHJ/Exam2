import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function SortButton({ allVenues, filters, setDisplayedVenues }) {
  const filterVenues = () => {
    const filteredVenues = allVenues.filter((venue) => {
      // Filter by country
      const matchesCountry =
        venue.location.country &&
        venue.location.country.toLowerCase() === filters.country.toLowerCase();

      // Filter by max guests
      const meetsGuestsCriteria = venue.maxGuests >= parseInt(filters.guests);

      // Filter by amenities
      const amenitiesMatch =
        venue.meta.wifi === filters.amenities.wifi &&
        venue.meta.pets === filters.amenities.pets &&
        venue.meta.parking === filters.amenities.parking &&
        venue.meta.breakfast === filters.amenities.breakfast;

      // Filter by bookings
      const isAvailable = !venue.bookings.some((booking) => {
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);
        const checkInDate = new Date(filters.checkIn);
        const checkOutDate = new Date(filters.checkOut);
        return checkInDate < bookingEnd && checkOutDate > bookingStart;
      });

      return (
        matchesCountry && meetsGuestsCriteria && amenitiesMatch && isAvailable
      );
    });

    return filteredVenues;
  };

  const handleClick = () => {
    const filteredVenues = filterVenues();
    // Update the state with filtered venues
    setDisplayedVenues(filteredVenues);
  };

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      className="buttoncolor border-0 rounded"
    >
      Search Venues
    </Button>
  );
}

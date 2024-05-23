import React from "react";
import { Card } from "react-bootstrap";

export function RenderBookings({ bookings }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort bookings by dateFrom in ascending order
  const sortedBookings = bookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
  );

  return (
    <div className="d-flex flex-column gap-3">
      {sortedBookings.map((booking) => (
        <Card key={booking.id} className="m-2 shadow">
          <Card.Body>
            <Card.Img
              className="bookingimg"
              variant="top"
              src={booking.venue.media[0].url}
            />
            <Card.Title>{booking.venue.name}</Card.Title>
            <Card.Text className="text-muted">
              {booking.venue.location.address}, {booking.venue.location.country}
            </Card.Text>
            <Card.Text className="text-muted">
              {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
            </Card.Text>
            <Card.Text className="text-muted">
              {booking.venue.price} NOK/night
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

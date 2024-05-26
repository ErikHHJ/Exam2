import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export function RenderBookings({ bookings }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDaysDifference = (date) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    const timeDifference = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) >= today
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) < today
  );

  const sortedUpcomingBookings = upcomingBookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
  );

  const sortedPastBookings = pastBookings.sort(
    (a, b) => new Date(b.dateTo) - new Date(a.dateTo)
  );

  return (
    <div className="d-flex w-100 gap-3">
      <div className="w-50">
        <h2 className="headerfont">Upcoming bookings</h2>
        {sortedUpcomingBookings.length === 0 ? (
          <p>
            No upcoming trips, find a venue to book{" "}
            <Link to={"/venues"}>here.</Link>
          </p>
        ) : (
          sortedUpcomingBookings.map((booking) => (
            <Card key={booking.id} className="m-2 shadow position-relative">
              <div className="days-counter position-absolute top-0 end-0 p-2 bg-info text-white rounded">
                {calculateDaysDifference(booking.dateFrom)} days to go
              </div>
              <Card.Body>
                <Card.Img
                  className="bookingimg"
                  variant="top"
                  src={booking.venue.media[0].url}
                />
                <Card.Title>{booking.venue.name}</Card.Title>
                <Card.Text className="text-muted">
                  {booking.venue.location.address},{" "}
                  {booking.venue.location.country}
                </Card.Text>
                <Card.Text className="text-muted">
                  {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                </Card.Text>
                <Card.Text className="text-muted">
                  {booking.venue.price} NOK/night
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
      <div className="w-50">
        <h2 className="headerfont">Past bookings</h2>
        {sortedPastBookings.length === 0 ? (
          <p>
            You are new here, experience one of our venues and they will be
            showed here
          </p>
        ) : (
          sortedPastBookings.map((booking) => (
            <Card key={booking.id} className="m-2 shadow position-relative">
              <div className="days-counter position-absolute top-0 end-0 p-2 bg-secondary text-white rounded">
                {Math.abs(calculateDaysDifference(booking.dateTo))} days ago
              </div>
              <Card.Body>
                <Card.Img
                  className="bookingimg"
                  variant="top"
                  src={booking.venue.media[0].url}
                />
                <Card.Title>{booking.venue.name}</Card.Title>
                <Card.Text className="text-muted">
                  {booking.venue.location.address},{" "}
                  {booking.venue.location.country}
                </Card.Text>
                <Card.Text className="text-muted">
                  {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                </Card.Text>
                <Card.Text className="text-muted">
                  {booking.venue.price} NOK/night
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

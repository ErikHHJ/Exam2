import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "../components/datePickers/custom-datepicker.css";

import { ApiKey } from "../components/fetches/ApiKey";

export function Manage() {
  const [profile, setProfile] = useState(null);
  const userItem = JSON.parse(localStorage.getItem("user"));
  const [venues, setVenues] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [noBookingsMessage, setNoBookingsMessage] = useState("");

  const url = `https://v2.api.noroff.dev/holidaze/profiles/${userItem.name}?_venues=true`;

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userItem.accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": ApiKey,
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          if (data && data.data.venues) {
            const newVenues = await Promise.all(
              data.data.venues.map(async (venue) => {
                const venueUrl = `https://v2.api.noroff.dev/holidaze/venues/${venue.id}?_bookings=true`;
                const venueResponse = await fetch(venueUrl, options);
                if (venueResponse.ok) {
                  const venueData = await venueResponse.json();
                  return {
                    ...venueData.data,
                    bookings: venueData.data.bookings,
                  };
                } else {
                  throw new Error("Failed to fetch venue details");
                }
              })
            );
            setVenues(newVenues);
          }
        } else {
          throw new Error("Failed to make the request");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [url, userItem.accessToken]);

  function getDatesInRange(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  const colors = [
    "#ff6633",
    "#ff99e6",
    "#00b3e6",
    "#ffff99",
    "#99ff99",
    "#e6b333",
    "#3366e6",
    "#999966",
  ];

  function getHighlightedDates(selectedVenue) {
    if (!selectedVenue || !selectedVenue.bookings) return [];

    const highlightWithRanges = selectedVenue.bookings.map((booking, index) => {
      const startDate = new Date(booking.dateFrom);
      const endDate = new Date(booking.dateTo);
      const datesInRange = getDatesInRange(startDate, endDate);
      return {
        [`react-datepicker__day--highlighted-custom-${index + 1}`]:
          datesInRange,
      };
    });

    return highlightWithRanges;
  }

  function getBookedDates(selectedVenue) {
    if (!selectedVenue || !selectedVenue.bookings) return [];

    const bookedDates = [];
    selectedVenue.bookings.forEach((booking) => {
      const startDate = new Date(booking.dateFrom);
      const endDate = new Date(booking.dateTo);
      const datesInRange = getDatesInRange(startDate, endDate);
      bookedDates.push(...datesInRange);
    });
    return bookedDates;
  }

  function handleCalendarOpen(venue) {
    setSelectedVenue(venue);
    setShowCalendar(true);
    if (!venue.bookings || venue.bookings.length === 0) {
      setNoBookingsMessage("No bookings yet. Let's hope someone discovers it!");
    } else {
      setNoBookingsMessage("");
    }
  }

  return (
    <div className="container d-flex flex-row">
      <div className="w-100  f-flex flex-row gap-3">
        <h1>Your venues</h1>
        {venues.map((venue) => (
          <div key={venue.id} className="d-flex flex-row">
            <Card className="w-50 mt-2">
              <Card.Img variant="top" src={venue.media[0].url} />
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{venue.description}</Card.Text>
                <Button
                  className="buttoncolor noborder"
                  onClick={() => handleCalendarOpen(venue)}
                >
                  View Calendar
                </Button>
              </Card.Body>
            </Card>
            <div />

            <div className="w-50 p-4 border d-flex flex-column align-items-center rounded justify-content-start mt-2">
              <h3>Booking status</h3>
              {venue.bookings && venue.bookings.length > 0 ? (
                venue.bookings.map((booking, index) => {
                  const checkInDate = new Date(booking.dateFrom);
                  const checkOutDate = new Date(booking.dateTo);
                  const currentDate = new Date();
                  const daysUntilCheckIn = Math.ceil(
                    (checkInDate - currentDate) / (1000 * 60 * 60 * 24)
                  );
                  const daysUntilCheckOut = Math.ceil(
                    (checkOutDate - currentDate) / (1000 * 60 * 60 * 24)
                  );

                  let checkOutText = "";
                  let dateDescription = "";
                  if (daysUntilCheckIn === 0) {
                    checkOutText = "Checking in today";
                    dateDescription = currentDate.toLocaleDateString("nb-NO");
                  } else if (daysUntilCheckIn > 0) {
                    checkOutText = `In ${daysUntilCheckIn} days`;
                    dateDescription = checkInDate.toLocaleDateString("nb-NO");
                  } else if (daysUntilCheckOut === 0) {
                    checkOutText = "Checking out today";
                    dateDescription = checkOutDate.toLocaleDateString("nb-NO");
                  } else {
                    checkOutText = `${daysUntilCheckOut} days ago`;
                    dateDescription = checkOutDate.toLocaleDateString("nb-NO");
                  }

                  return (
                    <Card key={index} className="mb-2 w-75">
                      <Card.Body>
                        <Card.Img
                          variant="top"
                          src={booking.customer.avatar.url}
                          className="rounded-circle"
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "10px auto",
                          }}
                        />
                        <Card.Title>{booking.customer.name}</Card.Title>
                        <Card.Text>{booking.customer.email}</Card.Text>
                        <Card.Text className="fw-bold">
                          {`${checkOutText} - (${dateDescription})`}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })
              ) : (
                <p>No guests currently in this venue.</p>
              )}

              <h3>Previous Bookings</h3>
              {venue.bookings && venue.bookings.length > 0 ? (
                venue.bookings.map((booking, index) => {
                  const checkOutDate = new Date(booking.dateTo);
                  const daysAgo = Math.floor(
                    (new Date() - checkOutDate) / (1000 * 60 * 60 * 24)
                  );
                  return daysAgo > 0 ? (
                    <Card key={index} className="mb-2 w-75">
                      <Card.Body>
                        <Card.Img
                          variant="top"
                          src={booking.customer.avatar.url}
                          className="rounded-circle"
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "10px auto",
                          }}
                        />
                        <Card.Title>{booking.customer.name}</Card.Title>
                        <Card.Text>{booking.customer.email}</Card.Text>
                        <Card.Text className="fw-bold">
                          {`${daysAgo} days ago`}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ) : null;
                })
              ) : (
                <p>No previous bookings for this venue.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={showCalendar}
        onHide={() => setShowCalendar(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Calendar - {selectedVenue?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex">
          {noBookingsMessage && <p>{noBookingsMessage}</p>}
          {selectedVenue?.bookings?.length > 0 && (
            <DatePicker
              inline
              selected={new Date()}
              onChange={() => {}}
              highlightDates={getHighlightedDates(selectedVenue)}
              excludeDates={getBookedDates(selectedVenue)}
            />
          )}
          <div className="w-75">
            {selectedVenue?.bookings?.map((booking, index) => (
              <Card
                key={booking.id}
                className={`mb-2 p-3 d-flex flex-row align-items-center`}
                style={{
                  border: `2px solid ${colors[index % colors.length]}`,
                }}
              >
                <Card.Img
                  variant="top"
                  src={booking.customer.avatar.url}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", margin: "10px auto" }}
                />
                <Card.Body>
                  <Card.Title>{booking.customer.name}</Card.Title>
                  <Card.Text>{booking.customer.email}</Card.Text>
                  <Card.Text>
                    <p>
                      <strong>From:</strong>{" "}
                      {new Date(booking.dateFrom).toLocaleDateString("nb-NO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <strong>To:</strong>{" "}
                      {new Date(booking.dateTo).toLocaleDateString("nb-NO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

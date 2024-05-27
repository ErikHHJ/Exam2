import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  eachDayOfInterval,
  parseISO,
  isWithinInterval,
  startOfToday,
} from "date-fns";
import { PostBooking } from "../fetches/PostBooking.jsx";

export function BookingPicker({ bookings, maxGuests }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [warning, setWarning] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);

  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  const handleButtonClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleConfirm = () => {
    const guestsNumber = parseInt(guests, 10);

    if (startDate && endDate && guestsNumber) {
      if (guestsNumber > maxGuests) {
        setWarning(`The number of guests cannot exceed ${maxGuests}.`);
        return;
      }
      if (isDateRangeAvailable(startDate, endDate)) {
        setBookingDetails({
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests: guestsNumber,
          venueId: id,
        });
        setWarning("");
        setIsDatePickerOpen(false);
      } else {
        setWarning("Selected dates overlap with an existing booking.");
      }
    } else {
      setWarning("Please fill in all fields.");
    }
  };

  const generateBookedDates = (bookings) => {
    let bookedDates = [];

    bookings.forEach((booking) => {
      const { dateFrom, dateTo } = booking;
      const start = parseISO(dateFrom);
      const end = parseISO(dateTo);

      const dates = eachDayOfInterval({ start, end });
      bookedDates = bookedDates.concat(dates);
    });

    return bookedDates;
  };

  const bookedDates = generateBookedDates(bookings);

  const isDateRangeAvailable = (start, end) => {
    return !bookedDates.some((date) => isWithinInterval(date, { start, end }));
  };

  return (
    <div>
      <button
        className="btn buttoncolor w-100 mt-3 mb-3"
        onClick={handleButtonClick}
      >
        Select Date Range
      </button>
      {isDatePickerOpen && (
        <div className="datepicker-modal">
          <DatePicker
            ref={datePickerRef}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              setWarning("");
            }}
            excludeDates={bookedDates}
            minDate={startOfToday()}
            inline
            placeholderText="Select a date range"
            renderCustomHeader={({
              monthDate,
              customHeaderCount,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  style={
                    customHeaderCount === 1 ? { visibility: "hidden" } : null
                  }
                  onClick={decreaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  ></span>
                </button>
                <span className="react-datepicker__current-month">
                  {monthDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  onClick={increaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  ></span>
                </button>
                <div>
                  <label>
                    Number of Guests:
                    <input
                      className="mt-3"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      style={{ width: "100px", marginLeft: "10px" }}
                    />
                  </label>
                  <br />
                  <button
                    onClick={handleConfirm}
                    style={{ marginLeft: "10px" }}
                    className="btn buttoncolor mt-3"
                  >
                    Confirm Booking
                  </button>
                </div>
                {warning && (
                  <div style={{ color: "red", marginTop: "10px" }}>
                    {warning}
                  </div>
                )}
              </div>
            )}
          />
        </div>
      )}
      {bookingDetails && (
        <div className="d-flex justify-content-center align-items-center flex-column border p-3 rounded">
          <h3>Booking Details</h3>
          <p>
            Check In Date:{" "}
            {new Date(bookingDetails.dateFrom).toLocaleDateString()}
          </p>
          <p>
            Check Out Date:{" "}
            {new Date(bookingDetails.dateTo).toLocaleDateString()}
          </p>
          <p>Number of Guests: {bookingDetails.guests}</p>
          <button
            className="btn buttoncolor w-100 mt-3"
            onClick={() => PostBooking(bookingDetails)}
          >
            Send Booking
          </button>
        </div>
      )}
    </div>
  );
}

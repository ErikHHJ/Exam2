import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval, parseISO } from "date-fns";

export function AvailabilityPicker({ bookings }) {
  const [startDate, setStartDate] = useState(new Date());

  // Helper function to generate an array of all booked dates
  const generateBookedDates = (bookings) => {
    let bookedDates = [];

    bookings.forEach((booking) => {
      const { dateFrom, dateTo } = booking;
      const start = parseISO(dateFrom);
      const end = parseISO(dateTo);

      // Get all dates within the booking range
      const dates = eachDayOfInterval({ start, end });
      bookedDates = bookedDates.concat(dates);
    });

    return bookedDates;
  };

  const bookedDates = generateBookedDates(bookings);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      excludeDates={bookedDates}
      placeholderText="Select a date"
      inline
    />
  );
}

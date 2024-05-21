import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import { eachDayOfInterval, parseISO } from "date-fns";

export function AvailabilityPicker({ bookings }) {
  const [startDate, setStartDate] = useState(new Date());

  // Helper function to generate date entries for each booking
  const generateDateEntries = (bookings) => {
    let dateEntries = [];

    bookings.forEach((booking, index) => {
      const { dateFrom, dateTo } = booking;
      const start = parseISO(dateFrom);
      const end = parseISO(dateTo);

      // Get all dates within the booking range
      const dates = eachDayOfInterval({ start, end });

      dates.forEach((date) => {
        dateEntries.push({
          date,
          className: `react-datepicker__day--highlighted-custom-${
            (index % 30) + 1
          }`,
        });
      });
    });

    return dateEntries;
  };

  const dateEntries = generateDateEntries(bookings);

  // Create a map of dates to class names
  const dateClassMap = dateEntries.reduce((acc, entry) => {
    const dateStr = entry.date.toISOString().split("T")[0];
    if (!acc[dateStr]) {
      acc[dateStr] = entry.className;
    }
    return acc;
  }, {});

  // Convert the map to the highlightDates format
  const highlightWithRanges = Object.entries(dateClassMap).map(
    ([date, className]) => ({
      [className]: [new Date(date)],
    })
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      highlightDates={highlightWithRanges}
      placeholderText="Select a date"
      inline
    />
  );
}

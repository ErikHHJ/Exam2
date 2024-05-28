import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";

export function SortBar({ filters, onFilterChange }) {
  const [minCheckoutDate, setMinCheckoutDate] = useState("");

  const handleDateChange = (field) => (dateValue) => {
    const date = new Date(dateValue);
    date.setHours(21, 0, 0, 0);
    onFilterChange(field)(date.toISOString());

    if (field === "checkIn") {
      const minDate = new Date(dateValue);
      minDate.setDate(minDate.getDate() + 1);
      setMinCheckoutDate(minDate.toISOString().split("T")[0]);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column col-10 p-4 round bg-white shadow mb-2">
      <h2 className="border-bottom">Where to?</h2>
      <Form className="d-flex flex-column flex-lg-row sortbar justify-content-evenly gap-3">
        <Form.Group>
          <Form.Control
            required
            type="number"
            placeholder="# of guests"
            value={filters.guests}
            min={1} // Add the min attribute here
            onChange={(e) => onFilterChange("guests")(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="text"
            placeholder="Country"
            value={filters.country}
            onChange={(e) => onFilterChange("country")(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="date"
            placeholder="Check-In"
            value={filters.checkIn.split("T")[0]}
            onChange={(e) => handleDateChange("checkIn")(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="date"
            placeholder="Check-Out"
            value={filters.checkOut.split("T")[0]}
            min={minCheckoutDate}
            onChange={(e) => handleDateChange("checkOut")(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic-button"
              className="bg-white text-black"
            >
              Amenities
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                <Form.Check
                  type="checkbox"
                  id="wifi"
                  label="WiFi"
                  checked={filters.amenities.wifi}
                  onChange={(e) => onFilterChange("wifi")(e.target.checked)}
                />
              </Dropdown.Item>
              <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                <Form.Check
                  type="checkbox"
                  id="pets"
                  label="Pets"
                  checked={filters.amenities.pets}
                  onChange={(e) => onFilterChange("pets")(e.target.checked)}
                />
              </Dropdown.Item>
              <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                <Form.Check
                  type="checkbox"
                  id="parking"
                  label="Parking"
                  checked={filters.amenities.parking}
                  onChange={(e) => onFilterChange("parking")(e.target.checked)}
                />
              </Dropdown.Item>
              <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                <Form.Check
                  type="checkbox"
                  id="breakfast"
                  label="Breakfast"
                  checked={filters.amenities.breakfast}
                  onChange={(e) =>
                    onFilterChange("breakfast")(e.target.checked)
                  }
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form>
    </div>
  );
}

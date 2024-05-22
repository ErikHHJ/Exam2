import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";

export function SortBar({ filters, onFilterChange }) {
  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column col-12 col-md-8 p-4 round bg-white shadow mb-2">
      <h2 className="border-bottom">Where would you like to go?</h2>
      <Form className="sortbar d-flex flex-row justify-content-evenly gap-3">
        <Form.Group>
          <Form.Control
            required
            type="number"
            placeholder="# of guests"
            value={filters.guests}
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
            type="datetime-local"
            placeholder="CheckIn"
            value={filters.checkIn}
            onChange={(e) => onFilterChange("checkIn")(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="datetime-local"
            placeholder="CheckOut"
            value={filters.checkOut}
            onChange={(e) => onFilterChange("checkOut")(e.target.value)}
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
                  label="breakfast"
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

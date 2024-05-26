import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { UpdateVenueButton } from "../fetches/UpdateVenueButton.jsx";

export function UpdateVenueModal({ show, handleClose, venue }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    if (show && venue) {
      setFormData({
        name: venue.name || "",
        description: venue.description || "",
        media: venue.media.length ? venue.media : [{ url: "", alt: "" }],
        price: venue.price || 0,
        maxGuests: venue.maxGuests || 0,
        rating: venue.rating || 0,
        meta: {
          wifi: venue.meta?.wifi || false,
          parking: venue.meta?.parking || false,
          breakfast: venue.meta?.breakfast || false,
          pets: venue.meta?.pets || false,
        },
        location: {
          address: venue.location?.address || "",
          city: venue.location?.city || "",
          zip: venue.location?.zip || "",
          country: venue.location?.country || "",
          continent: venue.location?.continent || "",
          lat: venue.location?.lat || 0,
          lng: venue.location?.lng || 0,
        },
      });
    }
  }, [show, venue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("media")) {
      const [field, index] = name.split("-");
      const updatedMedia = [...formData.media];
      updatedMedia[index][field] = value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        media: updatedMedia,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: {
        ...prevFormData.location,
        [name]: value,
      },
    }));
  };
  const handleMediaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedia = [...formData.media];
    const [field, mediaIndex, property] = name.split("-");
    updatedMedia[mediaIndex][property] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      media: updatedMedia,
    }));
  };

  const handleAddImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      media: [...prevFormData.media, { url: "", alt: "" }],
    }));
  };

  const updatedVenueData = {
    ...formData,
    media: formData.media.map((item) => ({
      ...item,
      alt: item.alt || `Media for ${formData.name}`,
    })),
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <h5>Details</h5>
              <Form.Group controlId="formName">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter title"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price per night per person</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMaxGuests">
                <Form.Label>Max Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  placeholder="Enter max guests"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <h5>Media</h5>
              <Button variant="secondary" onClick={handleAddImage}>
                Add Image
              </Button>
              {formData.media.map((media, index) => (
                <div key={index}>
                  <h5>Media {index + 1}</h5>
                  <Form.Group controlId={`formMediaUrl-${index}`}>
                    <Form.Label>Media URL</Form.Label>
                    <Form.Control
                      type="text"
                      name={`media-${index}-url`}
                      value={media.url}
                      onChange={(e) => handleMediaChange(index, e)}
                      placeholder="Enter media URL"
                    />
                  </Form.Group>
                  <Form.Group controlId={`formMediaAlt-${index}`}>
                    <Form.Label>Media Alt</Form.Label>
                    <Form.Control
                      type="text"
                      name={`media-${index}-alt`}
                      value={media.alt}
                      onChange={(e) => handleMediaChange(index, e)}
                      placeholder="Enter media alt text"
                    />
                  </Form.Group>
                </div>
              ))}
            </Col>
          </Row>
          <hr className="mt-5 mb-5" />
          <Row>
            <Col>
              <h5>Amenities</h5>
              <Form.Group controlId="formMetaWifi">
                <Form.Check
                  type="checkbox"
                  label="WiFi"
                  name="wifi"
                  checked={formData.meta.wifi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, wifi: e.target.checked },
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formMetaParking">
                <Form.Check
                  type="checkbox"
                  label="Parking"
                  name="parking"
                  checked={formData.meta.parking}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, parking: e.target.checked },
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formMetaBreakfast">
                <Form.Check
                  type="checkbox"
                  label="Breakfast"
                  name="breakfast"
                  checked={formData.meta.breakfast}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, breakfast: e.target.checked },
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formMetaPets">
                <Form.Check
                  type="checkbox"
                  label="Pets"
                  name="pets"
                  checked={formData.meta.pets}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, pets: e.target.checked },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <h5>Location</h5>
              <Form.Group controlId="formLocationAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.location.address}
                  onChange={handleLocationChange}
                  placeholder="Enter address"
                />
              </Form.Group>
              <Form.Group controlId="formLocationCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.location.city}
                  onChange={handleLocationChange}
                  placeholder="Enter city"
                />
              </Form.Group>
              <Form.Group controlId="formLocationZip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.location.zip}
                  onChange={handleLocationChange}
                  placeholder="Enter ZIP"
                />
              </Form.Group>
              <Form.Group controlId="formLocationCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.location.country}
                  onChange={handleLocationChange}
                  placeholder="Enter country"
                />
              </Form.Group>
              <Form.Group controlId="formLocationContinent">
                <Form.Label>Continent</Form.Label>
                <Form.Control
                  type="text"
                  name="continent"
                  value={formData.location.continent}
                  onChange={handleLocationChange}
                  placeholder="Enter continent"
                />
              </Form.Group>
              <Form.Group controlId="formLocationLat">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lat"
                  value={formData.location.lat}
                  onChange={handleLocationChange}
                  placeholder="Enter latitude"
                />
              </Form.Group>
              <Form.Group controlId="formLocationLng">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lng"
                  value={formData.location.lng}
                  onChange={handleLocationChange}
                  placeholder="Enter longitude"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {venue && (
          <UpdateVenueButton
            venueId={venue.id}
            updatedVenueData={updatedVenueData}
            onUpdateSuccess={handleClose}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
}

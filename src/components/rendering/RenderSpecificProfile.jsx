import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UpdateButton } from "../fetches/UpdateButton.jsx";
import { VenueCreationButton } from "../VenueCreationButton.jsx";
import { Link } from "react-router-dom";
import { DeleteModal } from "../modals/DeleteModal.jsx";
import { UpdateVenueModal } from "../modals/UpdateVenueModal.jsx";

export function RenderSpecificProfile({ profile }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateVenueModal, setShowUpdateVenueModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    venueManager: false,
    banner: "",
    avatar: "",
  });

  if (!profile) {
    return <div>Loading...</div>;
  }

  const profileData = profile.data;
  const userItem = JSON.parse(localStorage.getItem("user"));

  const avatarUrl =
    profileData.avatar.url ||
    "https://tinkercademy.com/wp-content/uploads/2017/04/Generic-Banner-05-Android-Dev.png";
  const bannerUrl =
    profileData.banner.url ||
    "https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/69f6c874076a4473940ec18ec5c7e635?t=1715765181&format=webp";
  const bio = profileData.bio || "This user has not written a bio yet.";
  const managerStatus = profileData.venueManager ? "Manager" : "Customer";
  const venuesCount = profileData._count.venues || 0;
  const bookingsCount = profileData._count.bookings || 0;

  const isOwnProfile = profileData.name === userItem.name;

  const handleEditProfile = () => {
    setFormData({
      bio: profileData.bio,
      venueManager: profileData.venueManager,
      banner: profileData.banner.url,
      avatar: profileData.avatar.url,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseUpdateVenueModal = () => setShowUpdateVenueModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = () => {
    profileData.venues = profileData.venues.filter(
      (venue) => venue.id !== selectedVenueId
    );
    setShowDeleteModal(false);
  };

  const handleUpdateVenue = (venue) => {
    setSelectedVenue(venue);
    setShowUpdateVenueModal(true);
  };

  const updatedProfileData = {
    bio: formData.bio,
    venueManager: formData.venueManager,
    banner: formData.banner,
    avatar: formData.avatar,
  };

  return (
    <div className="container d-flex flex-wrap mt-3">
      <div className="col-12 col-md-6 border d-flex flex-column justify-content-start align-items-center">
        <img className="banner w-100" src={bannerUrl} alt="Banner" />
        <img
          className="shadow profileavatar"
          src={avatarUrl}
          alt="Profile avatar"
        />
        <h1 className="headerfont">{profileData.name}</h1>
        <p>{bio}</p>
        <p className="text-muted">{profileData.email}</p>
        <p className="text-muted d-flex flex-column align-items-center justify-content">
          {managerStatus}
          {isOwnProfile && profileData.venueManager && (
            <Link to={"/manage"} className="btn buttoncolor border-0 rounded">
              Manage venues
            </Link>
          )}
        </p>
        <p className="text-muted">
          Venues: {venuesCount} <br />
          Bookings: {bookingsCount}
        </p>
        <div className="d-flex justify-content-center align-items-center flex-column">
          {isOwnProfile && (
            <Button
              className="btn buttoncolor border-0 rounded"
              variant="primary"
              onClick={handleEditProfile}
            >
              Edit profile
            </Button>
          )}
        </div>
      </div>
      <div className="col-12 col-md-6 border d-flex flex-column align-items-center justify-content-start">
        <h3>{isOwnProfile ? "Your venues" : `${profileData.name}'s venues`}</h3>
        {isOwnProfile && (
          <VenueCreationButton isVenueManager={profileData.venueManager} />
        )}
        {profileData.venues && profileData.venues.length > 0 ? (
          profileData.venues.map((venue, index) => (
            <div
              key={index}
              className="w-75 d-flex flex-row align-items-start justify-content-between border shadow rounded m-3 position-relative"
            >
              {isOwnProfile && (
                <div className="position-absolute top-0 end-0">
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleUpdateVenue(venue)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedVenueId(venue.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
              <Link
                className="text-decoration-none w-100 text-black"
                to={`/${venue.id}`}
              >
                <div className="w-100">
                  <img
                    src={
                      venue.media && venue.media.length > 0
                        ? venue.media[0].url
                        : "https://via.placeholder.com/150"
                    }
                    alt={venue.name}
                    className="smallcardimg w-100 rounded"
                  />
                </div>
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <p className="fw-bold">{venue.name}</p>
                </div>
              </Link>
            </div>
          ))
        ) : isOwnProfile ? (
          <p>You have no venues. Create one now!</p>
        ) : (
          <p>No venues</p>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formVenueManager">
              <Form.Check
                type="checkbox"
                label="Venue Manager"
                name="venueManager"
                checked={formData.venueManager}
                onChange={(e) =>
                  setFormData({ ...formData, venueManager: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBanner">
              <Form.Label>Banner URL</Form.Label>
              <Form.Control
                type="text"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <UpdateButton updatedProfileData={updatedProfileData} />
        </Modal.Footer>
      </Modal>

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        venueId={selectedVenueId}
      />

      <UpdateVenueModal
        show={showUpdateVenueModal}
        handleClose={handleCloseUpdateVenueModal}
        venue={selectedVenue}
      />
    </div>
  );
}

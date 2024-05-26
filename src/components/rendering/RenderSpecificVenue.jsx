import { Button, Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { StarDisplay } from "../StarDisplay.jsx";
import { IoIosPin } from "react-icons/io";
import { AvailabilityPicker } from "../datePickers/AvailabilityPicker.jsx";
import { BookingPicker } from "../datePickers/BookingPicker.jsx";

export function RenderSpecificVenue({ venue }) {
  if (!venue) {
    return <div>Loading...</div>;
  }

  const {
    media,
    location,
    id,
    name,
    price,
    meta,
    rating,
    description,
    owner,
    maxGuests,
    bookings,
  } = venue.data;
  console.log(venue.data);
  let locationString = "";

  if (location.continent) {
    locationString += location.continent;
  }

  if (location.country) {
    if (locationString.length === 0) {
      locationString += location.country;
    } else {
      locationString += `, ${location.country}`;
    }
  }

  if (location.city) {
    if (locationString.length === 0) {
      locationString += location.city;
    } else {
      locationString += `, ${location.city}`;
    }
  }

  if (location.address) {
    if (locationString.length === 0) {
      locationString += location.address;
    } else {
      locationString += `, ${location.address}`;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 m-5 bgcolor noborder d-flex justify-content-center align-items-center flex-column">
          <h1 className="fs-1">
            {name.length > 20 ? name.substring(0, 40) + "..." : name}
          </h1>

          {Array.isArray(media) && media.length > 0 ? (
            <div className="d-flex w-100 gap-3 flex-wrap align-items-center justify-content-center">
              {media.map((image, index) => (
                <img
                  key={`${image.url}-${index}`}
                  className="d-block specificimg rounded"
                  src={image.url}
                  alt={image.alt}
                />
              ))}
            </div>
          ) : (
            <div>No images available</div>
          )}
          <div className="mt-5 d-flex align-items-center w-100 justify-content-center flex-column gap-5">
            <div className="d-flex justify-content-evenly">
              <p className="fs-3">
                <IoIosPin /> {locationString}
              </p>
            </div>
            <div className="d-flex gap-5">
              <p className="fs-3 fw-light">{price} NOK/Night</p>
              <div className="vr"></div>
              <p className="fs-3 fw-light">Max-guests: {maxGuests}</p>
            </div>
          </div>
          <hr className="w-100 m-5" />
          <div className="d-flex flex-row align-items-center justify-content-space-between gap-5">
            <div className="d-flex flex-column align-items-center justify-content-center gap-2">
              <p className="fs-4 m-0 text-break">"{description}"</p>
              <Link to={`/profile/${owner.name}`}>
                <div className="p-4 d-flex flex-row align-items-center justify-content-center">
                  <img
                    className="owneravatar"
                    src={owner.avatar.url}
                    alt={owner.name + "'s avatar"}
                  />
                  <p className="fs-2 m-0">{owner.name} - Is the host</p>
                </div>
              </Link>
            </div>
          </div>
          <hr className="w-100 m-5" />
          <div className="d-flex align-items-center w-100 justify-content-center flex-row gap-5">
            <div className="d-flex flex-column align-items-center">
              <p>Includes parking:</p>
              {meta.parking ? (
                <FcCheckmark className="fs-2" />
              ) : (
                <FaXmark className="fs-2 red" />
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <p>Includes breakfast:</p>
              {meta.breakfast ? (
                <FcCheckmark className="fs-2" />
              ) : (
                <FaXmark className="fs-2" />
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <p>Includes wifi:</p>
              {meta.wifi ? (
                <FcCheckmark className="fs-2" />
              ) : (
                <FaXmark className="fs-2" />
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <p>Allows pets:</p>
              {meta.pets ? (
                <FcCheckmark className="fs-2" />
              ) : (
                <FaXmark className="fs-2" />
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <p>Rating:</p>
              <StarDisplay rating={rating} />
            </div>
          </div>
          <hr className="text-black w-100 m-5" />
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3>Check Availability</h3>
            <AvailabilityPicker bookings={bookings} />
            <BookingPicker bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}

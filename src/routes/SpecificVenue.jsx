import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RenderSpecificVenue } from "../components/rendering/RenderSpecificVenue";

export function SpecificVenue() {
  const { itemId } = useParams();
  const [venue, setVenue] = useState(null);
  const url = `https://v2.api.noroff.dev/holidaze/venues/${itemId}?_owner=true&_bookings=true`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [url]);
  useEffect(() => {
    if (venue) {
      document.title = `Holidaze | Venue: ${venue.data.name}`;
    }
  }, [venue]);

  return <RenderSpecificVenue venue={venue} />;
}

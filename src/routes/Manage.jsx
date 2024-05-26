import { ApiKey } from "../components/fetches/ApiKey";
import { useEffect, useState } from "react";

export function Manage() {
  const [profile, setProfile] = useState(null);
  const userItem = JSON.parse(localStorage.getItem("user"));
  const [venues, setVenues] = useState([]);

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
                const venueUrl = `https://v2.api.noroff.dev/holidaze/venues/${venue.id}`;
                const venueResponse = await fetch(venueUrl, options);
                if (venueResponse.ok) {
                  const venueData = await venueResponse.json();
                  return venueData.data; // Only add venue.data to the array
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

  useEffect(() => {
    console.log("Venues updated:", venues);
  }, [venues]);

  return (
    <div className="container d-flex flex-row">
      <div>
        {venues.map((venue) => (
          <div key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            <p>{venue.email}</p>
            <p>{venue.phone}</p>
            <p>{venue.address}</p>
            <p>{venue.maxGuests}</p>
            <p>{venue.price}</p>
            <p>{venue.imageUrl}</p>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

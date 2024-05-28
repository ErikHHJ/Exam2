import React, { useEffect, useState } from "react";
import { ApiKey } from "../components/fetches/ApiKey";
import { RenderBookings } from "../components/rendering/RenderBookings";

export function DashBoard() {
  const [profile, setProfile] = useState(null);
  const userItem = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    document.title = "Holidaze | My Bookings";
  }, []);

  const url = `https://v2.api.noroff.dev/holidaze/profiles/${userItem.name}?_bookings=true`;

  useEffect(() => {
    const fetchProfile = async () => {
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
        } else {
          throw new Error("Failed to make the request");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfile();
  }, [url, userItem.accessToken]);

  useEffect(() => {
    if (profile) {
      console.log("Profile data:", profile);
    }
  }, [profile]);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h1 className="headerfont text-decoration-underline">Dashboard</h1>
      <div className="w-100 d-flex justify-content-center align-items-center flex-row gap-1">
        {profile && profile.data.bookings && (
          <RenderBookings bookings={profile.data.bookings} />
        )}
      </div>
    </div>
  );
}

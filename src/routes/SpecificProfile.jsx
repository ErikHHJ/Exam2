import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiKey } from "../components/fetches/ApiKey";
import { RenderSpecificProfile } from "../components/rendering/RenderSpecificProfile.jsx";

export function SpecificProfile() {
  const { profileName } = useParams();
  const [profile, setProfile] = useState(null);
  const url = `https://v2.api.noroff.dev/holidaze/profiles/${profileName}?_venues=true`;

  useEffect(() => {
    const userItem = JSON.parse(localStorage.getItem("user"));

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userItem.accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": ApiKey,
      },
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to make the request");
        }
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [profileName]);

  // Logging the profile after the fetch effect
  console.log(profile);

  return (
    <div>
      <RenderSpecificProfile profile={profile} />
    </div>
  );
}

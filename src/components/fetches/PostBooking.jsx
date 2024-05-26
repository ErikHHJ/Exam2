import { ApiKey } from "./ApiKey.jsx";

export function PostBooking(data) {
  if (!localStorage.getItem("user")) {
    alert("You need to be logged in to book a room");
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  } else {
    try {
      const url = "https://v2.api.noroff.dev/holidaze/bookings";

      const userItem = JSON.parse(localStorage.getItem("user"));
      console.log(userItem.accessToken);

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userItem.accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": ApiKey,
        },
        body: JSON.stringify(data),
      };

      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            window.location.href = "/success";
          } else {
            throw new Error("Failed to make the request");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  }
}

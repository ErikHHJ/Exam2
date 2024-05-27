export function SendLogin(data, setError) {
  const url = "https://v2.api.noroff.dev/auth/login";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      return response.json();
    })
    .then((responseData) => {
      if (responseData && responseData.data) {
        localStorage.setItem("user", JSON.stringify(responseData.data));
        console.log("User logged in successfully:", responseData);
        window.location.href = "/venues";
      } else {
        throw new Error("Invalid response data");
      }
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      setError("Failed to login. Please check your credentials and try again.");
    });
}

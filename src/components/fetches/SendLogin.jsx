export function SendLogin(data) {
  try {
    const url = "https://v2.api.noroff.dev/auth/login";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        localStorage.setItem("user", JSON.stringify(responseData.data));
        console.log("User logged in successfully:", responseData);
        window.location.href = "/venues";
      });
  } catch (error) {
    const loginError = document.querySelector(".loginerror");
    loginError.style.display = "block";
  }
}

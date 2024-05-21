export function SendLogin(data) {
  try {
    console.log(data);
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
        window.location.href = "/";
      });
  } catch (error) {
    const loginError = document.querySelector(".loginerror");
    loginError.style.display = "block";
  }
}

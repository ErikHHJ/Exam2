export async function SendRegister(data) {
  const url = "https://v2.api.noroff.dev/auth/register";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const registerError = document.querySelector(".registererror");
      registerError.style.display = "block";
      throw new Error("Failed to register user");
    }
    const responseData = await response.json();
    console.log("User registered successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw error;
  }
}

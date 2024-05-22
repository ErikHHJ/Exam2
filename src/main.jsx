import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Home } from "./routes/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Venues } from "./routes/Venues.jsx";
import { Login } from "./routes/Login.jsx";
import { Register } from "./routes/Register.jsx";
import { SpecificVenue } from "./routes/SpecificVenue.jsx";
import { SpecificProfile } from "./routes/SpecificProfile.jsx";
import { Success } from "./routes/Success.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/venues",
        element: <Venues />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/:itemId",
        element: <SpecificVenue />,
      },
      {
        path: "/profile/:profileName",
        element: <SpecificProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

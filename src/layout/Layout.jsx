import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Logo } from "../components/Logo.jsx";

export function Layout({ children }) {
  const [loginText, setLoginText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setLoginText("Logout");
    } else {
      setLoginText("Login");
    }
  }, [isLoggedIn]);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      location.href = "/login";
    } else {
      location.href = "/login";
    }
  };

  return (
    <>
      <Navbar bg="transparent" expand="lg" className="borderbottom">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Logo />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
          {/* Hamburger icon */}
          <Navbar.Collapse id="basic-navbar-nav">
            {" "}
            {/* Content in the collapse */}
            <Nav className="ms-auto">
              {" "}
              {/* Changed to ms-auto for right alignment */}
              <Nav.Link as={Link} to="/" className="fs-4 fw-bold">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/venues" className="fs-4 fw-bold">
                Venues
              </Nav.Link>
              <Nav.Link as={Link} to="/manage" className="fs-4 fw-bold">
                Manage
              </Nav.Link>
              <Nav.Link
                style={{ color: isLoggedIn ? "red" : "lightgreen" }}
                onClick={handleLoginClick}
                className="fs-4 fw-bold"
              >
                {loginText}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
      <footer className="bordertop d-flex flex-row justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center p-5">
          <Logo />
        </div>
      </footer>
    </>
  );
}

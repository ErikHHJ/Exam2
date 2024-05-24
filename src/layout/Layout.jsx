import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Logo } from "../components/Logo.jsx";

export function Layout({ children }) {
  const [loginText, setLoginText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userItem = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userItem) {
      setIsLoggedIn(true);
    }
  }, [userItem]);

  useEffect(() => {
    setLoginText(isLoggedIn ? "Logout" : "Login");
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/dashboard" className="fs-4 fw-bold">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={`/profile/${userItem.name}`}
                    className="fs-4 fw-bold"
                  >
                    Profile
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to={"/venues"} className="fs-4 fw-bold">
                Venues
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

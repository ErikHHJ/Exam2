import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Logo } from "../components/Logo";
import "@fontsource/poppins/400.css";
import "@fontsource/playfair-display/400-italic.css";
export function Layout({ children }) {
  return (
    <>
      <Navbar className="borderbottom" bg="transparent" expand="lg">
        <Container>
          <Navbar.Brand>
            {" "}
            <Logo />{" "}
          </Navbar.Brand>
          <Nav className="justify-content-end pe-3">
            <Nav.Link as={Link} to="/" className="fs-4 fw-bold">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/venues" className="fs-4 fw-bold">
              Venues
            </Nav.Link>
            <Nav.Link as={Link} to="/book" className="fs-4 fw-bold">
              Book
            </Nav.Link>
            <Nav.Link as={Link} to="/manage" className="fs-4 fw-bold">
              Manage
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="fs-4 fw-bold">
              Login
            </Nav.Link>
          </Nav>
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

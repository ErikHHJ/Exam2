import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Holidaze | Home";
  }, []);
  return (
    <>
      <div
        className="bg-image bg"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="d-flex flex-column justify-content-center">
          <h1 className="headerfont fs-1 text-white fw-bold text-center">
            Your Dream Vacation
          </h1>
          <h1 className="headerfont fs-1 text-white fw-bold text-center mb-3">
            Starts Here
          </h1>
          <Link to={"/venues"}>
            <Button variant="" className="buttoncolor rounded w-100">
              Start planning
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-5">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <div className="mb-3">
              <h2 className="headerfont secondarycolor fs-2 fs-sm-4">
                Living accommodations around the globe
              </h2>
              <p className="secondarycolor">
                Experience our accommodations in all types of environments
              </p>
            </div>
            <Link to="/venues">
              <Button variant="" className="buttoncolor">
                Explore
              </Button>
            </Link>
          </Col>
          <Col md={6} className="p-0">
            <Row className="g-0">
              <Col xs={6} className="p-2 position-relative">
                <img
                  src={image2}
                  className="img-fluid w-100"
                  alt="Accommodation 1"
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{ zIndex: 1 }}
                >
                  <img
                    src={image3}
                    className="img-fluid"
                    alt="Accommodation 2"
                    style={{ width: "50%" }}
                  />
                </div>
              </Col>
              <Col xs={6} className="p-2">
                <img src={image3} className="img-fluid" alt="Accommodation 2" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

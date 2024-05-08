import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Home() {
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
          <Button variant="" className="buttoncolor rounded">
            Start planning
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center p-5 vh-100 column">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="headerfont mb-3 secondarycolor">
            Living accommodations around the globe
          </h2>
          <p className="mb-3 secondarycolor">
            Experience our accommodations in all types of environments
          </p>
          <Link to="/venues">
            <Button variant="" className="buttoncolor">
              Explore
            </Button>
          </Link>
        </div>
        <div className="d-flex justify-content-center w-50 h-70 p-5 bilder">
          <div
            className="bg-image w-100 h-100"
            style={{
              backgroundImage: `url(${image2})`,

              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="bg-image w-50 h-50 position-relative litthoyre"
              style={{
                backgroundImage: `url(${image3})`,

                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

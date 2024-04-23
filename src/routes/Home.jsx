import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";

export function Home() {
  return (
    <>
      <div
        className="bg-image bg"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <h1 className="headerfont fs-1 text-white fw-bold">
          Your Dream Vacation Starts Here
        </h1>
      </div>
      <div className="d-flex justify-content-center align-items-center p-5 vh-100 column">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="headerfont mb-3 secondarycolor">
            Living accommodations around the globe
          </h2>
          <p className="mb-3 secondarycolor">
            Experience our accommodations in all types of environments
          </p>
          <button className="buttoncolor btn mb-3">Browse Venues</button>
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

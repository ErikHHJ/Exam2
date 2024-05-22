import { Button } from "react-bootstrap";
import { IoIosCheckmark } from "react-icons/io";
export function Success() {
  return (
    <div className=" container d-flex align-items-center justify-content-center">
      <div className="row d-flex align-items-center justify-content-center ">
        <div className="border p-5 m-5 d-flex align-items-center justify-content-center flex-column col-12">
          <IoIosCheckmark className="success" />
          <h1>Thank you for your booking!</h1>
          <p className="mt-5">
            Your booking is now confirmed. <br /> You will receive an email with
            the details of your booking shortly. <br />
            Payment will be processed upon arrival.
          </p>
          <Button className="btn buttoncolor rounded" href="/venues">
            Back to Venues
          </Button>
        </div>
      </div>
    </div>
  );
}

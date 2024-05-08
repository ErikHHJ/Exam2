import { useEffect, useState } from "react";
import { RenderAllVenues } from "../components/rendering/RenderAllVenues";
import { Spinner } from "react-bootstrap";

export function Venues() {
  const [venues, setVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(10);
  const url = "https://v2.api.noroff.dev/holidaze/venues";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVenues(data.data);
        setDisplayedVenues(data.data.slice(0, itemsToShow));
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom) {
        setItemsToShow((prevItemsToShow) => prevItemsToShow + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDisplayedVenues(venues.slice(0, itemsToShow));
  }, [itemsToShow, venues]);

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center">
      <div className="sortbar d-flex flex-row justify-content-evenly col-12 col-md-8  p-4 form-control rounded">
        <div className="sortbarsection"></div>
        <div className="sortbarsection">Check In</div>
        <div className="sortbarsection">Check Out</div>
        <div className="sortbarsection">Persons</div>
      </div>
      <RenderAllVenues venues={displayedVenues} />
      {displayedVenues.length >= venues.length ? (
        <p>No more items to show</p>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

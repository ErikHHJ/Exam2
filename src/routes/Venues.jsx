import { useEffect, useState } from "react";
import { RenderAllVenues } from "../components/rendering/RenderAllVenues";
import { Spinner } from "react-bootstrap";
import { SortBar } from "../components/SortBar";
import { SortButton } from "../components/SortButton";

export function Venues() {
  const [venues, setVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(10);
  const [filters, setFilters] = useState({
    guests: "",
    country: "",
    checkIn: "",
    checkOut: "",
    amenities: {
      wifi: false,
      pets: false,
      parking: false,
      breakfast: false,
    },
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilterChange = (filterName) => (value) => {
    if (filterName in filters.amenities) {
      setFilters({
        ...filters,
        amenities: {
          ...filters.amenities,
          [filterName]: value,
        },
      });
    } else {
      setFilters({ ...filters, [filterName]: value });
    }
  };

  const handleFilterVenues = () => {
    const filteredVenues = venues.filter((venue) => {
      const country = venue.country ? venue.country.toLowerCase() : "";
      const amenities = venue.meta ? venue.meta : {};

      const matchesCountry = country.includes(filters.country.toLowerCase());

      const accommodatesGuests =
        parseInt(venue.maxGuests) >= parseInt(filters.guests);

      const isAvailable = !venue.bookings.some((booking) => {
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);
        const checkInDate = new Date(filters.checkIn);
        const checkOutDate = new Date(filters.checkOut);

        bookingStart.setUTCHours(0, 0, 0, 0);
        bookingEnd.setUTCHours(0, 0, 0, 0);

        return (
          checkInDate.getTime() < bookingEnd.getTime() &&
          checkOutDate.getTime() > bookingStart.getTime()
        );
      });

      const matchesAmenities =
        amenities.wifi === filters.amenities.wifi &&
        amenities.pets === filters.amenities.pets &&
        amenities.parking === filters.amenities.parking &&
        amenities.breakfast === filters.amenities.breakfast;

      return (
        matchesCountry && accommodatesGuests && isAvailable && matchesAmenities
      );
    });

    setIsFiltering(true);
    setDisplayedVenues(filteredVenues);
    setItemsToShow(filteredVenues.length);
    if (filteredVenues.length === 0) {
      setError("No results found for the given criteria.");
    } else {
      setError(null);
    }
  };

  const url =
    "https://v2.api.noroff.dev/holidaze/venues?_bookings=true&limit=100";

  const fetchVenues = async (page) => {
    const response = await fetch(`${url}&page=${page}`);
    const data = await response.json();
    return data.data;
  };

  useEffect(() => {
    const fetchAllVenues = async () => {
      setIsLoading(true);
      let allVenues = [];
      let page = 1;
      let isFetching = true;

      while (isFetching) {
        const newVenues = await fetchVenues(page);
        allVenues = [...allVenues, ...newVenues];
        if (newVenues.length < 100) {
          isFetching = false;
        } else {
          page += 1;
        }
      }

      setVenues(allVenues);
      setDisplayedVenues(allVenues.slice(0, 10));
      setIsLoading(false);
      console.log(allVenues);
    };

    fetchAllVenues();
  }, []);

  const handleScroll = () => {
    if (isFiltering) return;
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    const hasMoreItemsToShow = itemsToShow < venues.length;

    if (nearBottom && hasMoreItemsToShow) {
      setItemsToShow((prevItemsToShow) =>
        Math.min(prevItemsToShow + 10, venues.length)
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemsToShow, venues.length, isFiltering]);

  useEffect(() => {
    if (!isFiltering) {
      setDisplayedVenues(venues.slice(0, itemsToShow));
    }
  }, [itemsToShow, venues, isFiltering]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <SortBar
        className="shadow"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <SortButton
        filters={filters}
        allVenues={venues}
        setDisplayedVenues={setDisplayedVenues}
        onFilterVenues={handleFilterVenues}
      />

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <RenderAllVenues venues={displayedVenues} />
          {isLoading ? <Spinner animation="border" /> : null}
          {!isFiltering && itemsToShow >= venues.length ? (
            <p>No more items to show</p>
          ) : null}
        </>
      )}
    </div>
  );
}

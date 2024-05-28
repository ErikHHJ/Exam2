import React, { useEffect, useState } from "react";
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
    setIsFiltering(true);

    let filteredVenues = venues.filter((venue) => {
      const matchesCountry =
        !filters.country ||
        (venue.location.country &&
          venue.location.country.toLowerCase() ===
            filters.country.toLowerCase());
      const meetsGuestsCriteria =
        !filters.guests || venue.maxGuests >= parseInt(filters.guests);
      const amenitiesMatch = Object.keys(filters.amenities).every(
        (key) =>
          !filters.amenities[key] || venue.meta[key] === filters.amenities[key]
      );
      const isAvailable = !venue.bookings.some((booking) => {
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);
        const checkInDate = new Date(filters.checkIn);
        const checkOutDate = new Date(filters.checkOut);
        return checkInDate < bookingEnd && checkOutDate > bookingStart;
      });

      return (
        matchesCountry && meetsGuestsCriteria && amenitiesMatch && isAvailable
      );
    });

    filteredVenues.sort((a, b) => new Date(b.created) - new Date(a.created));

    setDisplayedVenues(filteredVenues);
    setError(
      filteredVenues.length > 0
        ? null
        : "No results found for the given criteria."
    );
  };

  const fetchVenues = async (page) => {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues?_bookings=true&limit=100&page=${page}`
    );
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
        const filteredNewVenues = newVenues.filter(
          (venue) => venue.media.length > 0
        );
        allVenues = [...allVenues, ...filteredNewVenues];
        if (newVenues.length < 100) {
          isFetching = false;
        } else {
          page += 1;
        }
      }

      allVenues.sort((a, b) => new Date(b.created) - new Date(a.created));
      setVenues(allVenues);
      setDisplayedVenues(
        allVenues
          .slice(0, itemsToShow)
          .sort((a, b) => new Date(b.created) - new Date(a.created))
      );
      setIsLoading(false);
    };

    fetchAllVenues();
  }, []);

  useEffect(() => {
    if (!isFiltering) {
      setDisplayedVenues(venues.slice(0, itemsToShow));
    }
  }, [itemsToShow, venues, isFiltering]);
  useEffect(() => {
    document.title = "Holidaze | All venues";
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (isFiltering && nearBottom) return;

      if (nearBottom && itemsToShow < venues.length) {
        setItemsToShow((prevItemsToShow) =>
          Math.min(prevItemsToShow + 10, venues.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemsToShow, venues.length, isFiltering]);

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

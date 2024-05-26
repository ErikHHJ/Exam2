import { Button } from "react-bootstrap";
export function SortButton({
  allVenues,
  filters,
  setDisplayedVenues,
  onFilterVenues,
}) {
  const handleClick = () => {
    onFilterVenues();
  };

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      className="buttoncolor border-0 rounded"
    >
      Search Venues
    </Button>
  );
}

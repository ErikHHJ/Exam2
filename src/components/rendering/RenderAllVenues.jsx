import { Card } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export function RenderAllVenues({ venues }) {
  return (
    <div className="container">
      <div className="row d-flex align-items-center justify-content-center gap-1">
        {venues.map((venue) => (
          <Card
            className="col-12 col-md-3 col-lg-3 bgcolor noborder shadow mb-5 bg-body rounded venuecards"
            key={venue.id}
          >
            <Carousel
              interval={null}
              prevIcon={<span className="carousel-control-prev-icon" />}
              nextIcon={<span className="carousel-control-next-icon" />}
            >
              {venue.media.map((image, index) => (
                <Carousel.Item key={`${venue.id}-${index}`}>
                  <Link to={`/${venue.id}`}>
                    <img
                      className="d-block carousel-image rounded"
                      src={image.url}
                      alt={image.alt}
                    />
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title className="text-break">
                {venue.name.length > 20
                  ? venue.name.substring(0, 40) + "..."
                  : venue.name}
              </Card.Title>
              <Card.Text className="text-muted fs-4">
                {venue.location.country}
              </Card.Text>
              <Card.Text className="text-muted">
                {venue.price} NOK/night
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

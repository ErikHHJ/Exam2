import { Card } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export function RenderAllVenues({ venues }) {
  return (
    <div className="container">
      <div className="row">
        {venues.map((venue) => (
          <Card
            className="col-12 col-md-4 col-lg-3 m-5 bgcolor noborder shadow"
            key={venue.id}
          >
            <Carousel
              interval={null}
              prevIcon={<span className="carousel-control-prev-icon" />}
              nextIcon={<span className="carousel-control-next-icon" />}
            >
              {venue.media.map((image, index) => (
                <Carousel.Item key={`${image.url}-${index}`}>
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
              <Card.Title className="text-break">{venue.name}</Card.Title>
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

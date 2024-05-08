import { Card } from "react-bootstrap";
import { Carousel } from "react-bootstrap";

export function RenderAllVenues({ venues }) {
  return (
    <div className="d-flex flex-wrap col-12 col-md-11">
      {venues.map((venue) => (
        <Card className="col-12 col-lg-5 m-5" key={venue.id}>
          <Carousel
            interval={null}
            prevIcon={<span className="carousel-control-prev-icon" />}
            nextIcon={<span className="carousel-control-next-icon" />}
          >
            {venue.media.map((image, index) => (
              <Carousel.Item key={`${image.url}-${index}`}>
                <img
                  className="d-block carousel-image"
                  src={image.url}
                  alt={image.alt}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title>{venue.name}</Card.Title>
            <Card.Text>{venue.description}</Card.Text>
            <Card.Text>{venue.price} Per night</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

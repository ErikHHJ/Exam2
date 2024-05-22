import { Button } from "react-bootstrap";

export function RenderSpecificProfile({ profile }) {
  if (!profile) {
    return <div>Loading...</div>;
  }

  const profileData = profile.data;
  const userItem = JSON.parse(localStorage.getItem("user"));

  const avatarUrl =
    profileData.avatar.url ||
    "https://tinkercademy.com/wp-content/uploads/2017/04/Generic-Banner-05-Android-Dev.png";
  const bannerUrl =
    profileData.banner.url ||
    "https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/69f6c874076a4473940ec18ec5c7e635?t=1715765181&format=webp";
  const bio = profileData.bio || "This user has not written a bio yet.";
  const btnShow =
    profileData.bio === "" && profileData.name === userItem.name
      ? "d-block"
      : "d-none";
  const managerStatus = profileData.venueManager ? "Manager" : "Customer";
  const venuesCount = profileData._count.venues || 0;
  const bookingsCount = profileData._count.bookings || 0;

  const isOwnProfile = profileData.name === userItem.name;

  return (
    <div className="container d-flex flex-wrap mt-3">
      <div className="col-12 col-md-6 border d-flex flex-column justify-content-center align-items-center">
        <img className="banner w-100" src={bannerUrl} alt="Banner" />
        <img
          className="shadow profileavatar"
          src={avatarUrl}
          alt="Profile avatar"
        />
        <h1 className="headerfont">{profileData.name}</h1>
        <p className="text-muted">{profileData.email}</p>
        <p className="text-muted">{managerStatus}</p>
        <p className="text-muted">
          Venues: {venuesCount} <br />
          Bookings: {bookingsCount}
        </p>
        <div>
          <p>{bio}</p>
          <Button className={btnShow} variant="primary">
            Edit bio
          </Button>
        </div>
      </div>
      <div className="col-12 col-md-6 border d-flex flex-column align-items-center justify-content-center">
        <h3>{isOwnProfile ? "Your venues" : `${profileData.name}'s venues`}</h3>

        {profileData.venues && profileData.venues.length > 0 ? (
          profileData.venues.map((venue, index) => (
            <div
              key={index}
              className="w-75 d-flex flex-row align-items-start justify-content-between border rounded m-3"
            >
              <img
                src={
                  venue.media && venue.media.length > 0
                    ? venue.media[0].url
                    : "https://via.placeholder.com/150"
                }
                alt={venue.name}
                className="smallcardimg w-50"
              />
              <p>{venue.name}</p>
            </div>
          ))
        ) : isOwnProfile ? (
          <p>You have no venues. Create one now!</p>
        ) : (
          <p>No venues</p>
        )}
      </div>
    </div>
  );
}

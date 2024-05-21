import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

export function StarDisplay({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} color="gold" />
      ))}
      {halfStar === 1 && <FaStarHalf color="gold" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar key={`empty-${index}`} color="grey" />
      ))}
    </div>
  );
}

export default StarDisplay;

import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaGasPump, FaTachometerAlt, FaCogs, FaUserFriends, FaCheckCircle } from "react-icons/fa";

function CarCard({ car, onBookNow }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState(car.image);

  return (
    <div className="car-card">
      <div className="car-card-image-wrapper">
        <img
          src={imgSrc}
          alt={car.title}
          className="car-card-image"
          loading="lazy"
          onError={() => {
            if (car.fallbackImage && imgSrc !== car.fallbackImage) {
              setImgSrc(car.fallbackImage);
            }
          }}
        />
        <span className={`car-tag ${car.tag ? car.tag.toLowerCase() : ""}`}>{car.tag || car.category}</span>
        <button
          className={`favorite-btn ${isLiked ? "liked" : ""}`}
          onClick={() => setIsLiked(!isLiked)}
          aria-label="Add to favorites"
        >
          {isLiked ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="car-card-body">
        <div className="car-header">
          <span className="car-brand">{car.brand}</span>
          <h3 className="car-title">{car.title}</h3>
        </div>

        <div className="car-specs">
          <div className="spec-item" title="Speed / Acceleration">
            <FaTachometerAlt className="spec-icon" />
            <span>{car.speed}</span>
          </div>
          <div className="spec-item" title="Transmission">
            <FaCogs className="spec-icon" />
            <span>{car.transmission}</span>
          </div>
          <div className="spec-item" title="Fuel Type">
            <FaGasPump className="spec-icon" />
            <span>{car.fuel}</span>
          </div>
          <div className="spec-item" title="Seating Capacity">
            <FaUserFriends className="spec-icon" />
            <span>{car.seats} Seats</span>
          </div>
        </div>

        <div className="car-card-footer">
          <div className="car-price-box">
            <span className="price-label">Daily Rental</span>
            <div className="price-value">
              <span className="currency">$</span>
              <span className="amount">{car.dailyRate}</span>
              <span className="unit">/day</span>
            </div>
          </div>

          <button className="book-btn" onClick={() => onBookNow(car)}>
            <FaCheckCircle className="btn-icon" /> Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;

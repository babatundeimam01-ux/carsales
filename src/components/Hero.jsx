import React from "react";
import { FaCar, FaShieldAlt, FaKey, FaArrowRight } from "react-icons/fa";

function Hero({ onExploreClick }) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <FaShieldAlt className="hero-badge-icon" /> Premium Fleet & Verified Service
        </div>
        <h1 className="hero-title">
          Drive Excellence with <span className="highlight">AL RIZIQ</span>
        </h1>
        <p className="hero-subtitle">
          Experience unmatched luxury, performance, and reliability. Rent or purchase your dream vehicle with seamless booking and VIP service.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onExploreClick}>
            Explore Fleet <FaArrowRight />
          </button>
          <a href="#offers" className="btn-secondary">
            View Special Offers
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Luxury Models</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">VIP Support</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

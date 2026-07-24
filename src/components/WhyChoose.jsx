import React from "react";
import { FaShieldAlt, FaHandHoldingUsd, FaHeadset, FaBolt } from "react-icons/fa";

function WhyChoose() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "100% Insured & Verified",
      desc: "Every car in our fleet undergoes strict multi-point technical inspection and full insurance coverage."
    },
    {
      icon: <FaHandHoldingUsd />,
      title: "Best Price Guarantee",
      desc: "Competitive pricing with complete price transparency — no hidden fees or surprise charges."
    },
    {
      icon: <FaBolt />,
      title: "Instant Digital Booking",
      desc: "Reserve your preferred vehicle in under 2 minutes with instant digital confirmation."
    },
    {
      icon: <FaHeadset />,
      title: "24/7 VIP Concierge",
      desc: "Round-the-clock dedicated support team ready to assist with doorstep delivery & inquiries."
    }
  ];

  return (
    <section className="why-choose-section" id="why-choose">
      <div className="section-header">
        <span className="section-subtitle">THE AL RIZIQ DIFFERENCE</span>
        <h2 className="section-title">Why Choose AL RIZIQ?</h2>
      </div>

      <div className="features-grid">
        {features.map((feat, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feat.icon}</div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;

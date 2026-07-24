import React, { useState } from "react";
import { FaGift, FaCopy, FaCheck, FaFire } from "react-icons/fa";

function Offer() {
  const [copied, setCopied] = useState(false);
  const promoCode = "ALRIZIQ20";

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="offer-banner" id="offers">
      <div className="offer-content">
        <div className="offer-badge">
          <FaFire className="fire-icon" /> Limited Time Deal
        </div>
        <h2 className="offer-title">Get 20% OFF Your First Luxury Rental</h2>
        <p className="offer-desc">
          Use the exclusive promo code at checkout to claim instant discounts on all flagship sports and luxury vehicles.
        </p>

        <div className="promo-box">
          <div className="promo-code-container">
            <span className="promo-label">PROMO CODE:</span>
            <span className="promo-code">{promoCode}</span>
          </div>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy Code</>}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Offer;

import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaBell, FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

function Navbar({ cartCount = 2, onSearchClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="left">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
          </button>
          <div className="brand">
            <img src={logo} alt="AL RIZIQ" className="logo" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="brand-text">
              <h1 className="brand-title">AL RIZIQ</h1>
              <p className="brand-tagline">Premium Cars, Trusted Deals</p>
            </div>
          </div>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#fleet" onClick={() => setMenuOpen(false)}>Fleet</a>
          <a href="#offers" onClick={() => setMenuOpen(false)}>Offers</a>
          <a href="#why-choose" onClick={() => setMenuOpen(false)}>Why Us</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="right">
          <button className="icon-btn" onClick={onSearchClick} title="Search">
            <FaSearch className="icon" />
          </button>
          <button className="icon-btn" title="Notifications">
            <FaBell className="icon" />
            <span className="badge-dot"></span>
          </button>
          <div className="cart" title="Cart / Bookings">
            <FaShoppingCart className="icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

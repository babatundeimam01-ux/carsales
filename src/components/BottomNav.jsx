import React from "react";
import { FaHome, FaCar, FaTag, FaHeart, FaHeadset } from "react-icons/fa";

function BottomNav({ activeTab = "home", setActiveTab }) {
  const navItems = [
    { id: "home", label: "Home", icon: <FaHome />, href: "#hero" },
    { id: "fleet", label: "Fleet", icon: <FaCar />, href: "#fleet" },
    { id: "offers", label: "Offers", icon: <FaTag />, href: "#offers" },
    { id: "why-us", label: "Why Us", icon: <FaHeart />, href: "#why-choose" },
    { id: "contact", label: "Support", icon: <FaHeadset />, href: "#contact" }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={`bottom-nav-item ${activeTab === item.id ? "active" : ""}`}
          onClick={() => setActiveTab(item.id)}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

export default BottomNav;

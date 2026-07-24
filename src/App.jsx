import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";

function App() {
  const [cartCount, setCartCount] = useState(2);
  const [activeTab, setActiveTab] = useState("home");

  const handleBookingAdded = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleSearchClick = () => {
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <Navbar cartCount={cartCount} onSearchClick={handleSearchClick} />
      <main className="main-content">
        <Home onBookingAdded={handleBookingAdded} />
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;

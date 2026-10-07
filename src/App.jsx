import React, { useState } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";
import AuthPage from "./components/AuthPage";
import UserMenu from "./components/UserMenu";
import CarListing from "./components/CarListing";
import BookingsPage from "./components/BookingsPage";

function AppInner() {
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const { currentUser, loading } = useAuth();

  const handleBookingAdded = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleSearchClick = () => {
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return <div className="loading-container"><p>Loading...</p></div>;
  }

  return (
    <div className="app">
      <Navbar cartCount={cartCount} onSearchClick={handleSearchClick} />
      <div className="top-right-auth">
        {currentUser ? (
          <UserMenu />
        ) : (
          <button className="login-link-btn" onClick={() => setActiveTab("login")}>
            Log In / Sign Up
          </button>
        )}
      </div>
      <main className="main-content">
        {activeTab === "home" && <Home onBookingAdded={handleBookingAdded} />}
        {activeTab === "login" && <AuthPage onSuccess={() => setActiveTab("home")} />}
        {activeTab === "cars" && <CarListing />}
        {activeTab === "bookings" && <BookingsPage />}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

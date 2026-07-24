import React, { useState, useMemo } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import CarCard from "../components/CarCard";
import Offer from "../components/Offer";
import WhyChoose from "../components/WhyChoose";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCar, FaTimes, FaCheck } from "react-icons/fa";

const SAMPLE_CARS = [
  {
    id: 1,
    title: "Mercedes-AMG GT Coupe",
    brand: "Mercedes-Benz",
    category: "Sports",
    tag: "Top Speed",
    dailyRate: 450,
    speed: "0-60 in 3.1s",
    transmission: "Automatic",
    fuel: "Petrol V8",
    seats: 2,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "BMW M5 Competition",
    brand: "BMW",
    category: "Sedan",
    tag: "Popular",
    dailyRate: 380,
    speed: "0-60 in 3.2s",
    transmission: "Automatic",
    fuel: "Twin-Turbo V8",
    seats: 5,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Porsche 911 Carrera S",
    brand: "Porsche",
    category: "Sports",
    tag: "Featured",
    dailyRate: 490,
    speed: "0-60 in 3.3s",
    transmission: "PDK Auto",
    fuel: "Twin-Turbo Boxer",
    seats: 4,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Range Rover Autobiography",
    brand: "Land Rover",
    category: "SUV",
    tag: "Luxury",
    dailyRate: 420,
    speed: "0-60 in 4.4s",
    transmission: "Automatic",
    fuel: "Hybrid V8",
    seats: 7,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Lamborghini Urus S",
    brand: "Lamborghini",
    category: "SUV",
    tag: "Super SUV",
    dailyRate: 650,
    speed: "0-60 in 3.1s",
    transmission: "Automatic",
    fuel: "V8 Twin-Turbo",
    seats: 5,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Tesla Model S Plaid",
    brand: "Tesla",
    category: "Electric",
    tag: "EV Plaid",
    dailyRate: 350,
    speed: "0-60 in 1.99s",
    transmission: "Direct Drive",
    fuel: "Tri-Motor EV",
    seats: 5,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Rolls-Royce Ghost",
    brand: "Rolls-Royce",
    category: "Luxury",
    tag: "VIP Flagship",
    dailyRate: 950,
    speed: "0-60 in 4.6s",
    transmission: "Automatic",
    fuel: "6.75L V12",
    seats: 5,
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Audi RS7 Sportback",
    brand: "Audi",
    category: "Sedan",
    tag: "Performance",
    dailyRate: 390,
    speed: "0-60 in 3.5s",
    transmission: "Quattro Auto",
    fuel: "V8 Twin-Turbo",
    seats: 5,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80"
  }
];

const CATEGORIES = ["All", "Sports", "SUV", "Luxury", "Sedan", "Electric"];

function Home({ onBookingAdded }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookingModalCar, setBookingModalCar] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredCars = useMemo(() => {
    return SAMPLE_CARS.filter((car) => {
      const matchesCategory =
        selectedCategory === "All" || car.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleBookNow = (car) => {
    setBookingModalCar(car);
    setBookingConfirmed(false);
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    if (onBookingAdded) onBookingAdded();
    setTimeout(() => {
      setBookingModalCar(null);
      setBookingConfirmed(false);
    }, 2500);
  };

  const scrollToFleet = () => {
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-page">
      <Hero onExploreClick={scrollToFleet} />

      <Offer />

      <section className="fleet-section" id="fleet">
        <div className="section-header">
          <span className="section-subtitle">OUR EXCLUSIVE FLEET</span>
          <h2 className="section-title">Explore Premium Vehicles</h2>
          <p className="section-description">
            Choose from top tier luxury sedans, high performance sports cars, and rugged VIP SUVs.
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={CATEGORIES}
        />

        <Category
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {filteredCars.length > 0 ? (
          <div className="cars-grid">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onBookNow={handleBookNow} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <FaCar className="no-results-icon" />
            <h3>No Vehicles Found</h3>
            <p>Try adjusting your search terms or selecting a different category filter.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <WhyChoose />

      <footer className="footer-section" id="contact">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>AL RIZIQ</h2>
            <p>Premium Cars, Trusted Deals. Your premier luxury vehicle destination.</p>
          </div>

          <div className="footer-contact">
            <h3>Get In Touch</h3>
            <p><FaPhoneAlt /> +234 (0) 800 AL RIZIQ</p>
            <p><FaEnvelope /> info@alriziq.com</p>
            <p><FaMapMarkerAlt /> Victoria Island, Lagos, Nigeria</p>
          </div>

          <div className="footer-hours">
            <h3>Operating Hours</h3>
            <p>Monday - Saturday: 8:00 AM - 9:00 PM</p>
            <p>Sunday: 10:00 AM - 6:00 PM</p>
            <p className="highlight-text">24/7 Hotline Available for Bookings</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AL RIZIQ. All rights reserved.</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingModalCar && (
        <div className="modal-backdrop" onClick={() => setBookingModalCar(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setBookingModalCar(null)}>
              <FaTimes />
            </button>

            {!bookingConfirmed ? (
              <form onSubmit={confirmBooking} className="booking-form">
                <h3>Reserve {bookingModalCar.title}</h3>
                <p className="modal-subtitle">${bookingModalCar.dailyRate} / day • {bookingModalCar.category}</p>

                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="e.g. John Doe" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+2348060121814" required />
                </div>
                <div className="form-group">
                  <label>Rental Date</label>
                  <input type="date" required />
                </div>

                <button type="submit" className="btn-primary full-width">
                  Confirm Reservation
                </button>
              </form>
            ) : (
              <div className="booking-success">
                <FaCheck className="success-icon" />
                <h3>Booking Confirmed!</h3>
                <p>We have reserved <strong>{bookingModalCar.title}</strong> for you. Our team will contact you shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

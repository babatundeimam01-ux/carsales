import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getCars } from "../services/carService";
import { createBooking } from "../services/bookingService";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import CarCard from "../components/CarCard";
import Offer from "../components/Offer";
import WhyChoose from "../components/WhyChoose";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCar, FaTimes, FaCheck } from "react-icons/fa";
import toyotaSiennaImg from "../assets/cars/toyota-sienna.jpeg";
import corrollaImg from "../assets/images/corolla.jpeg";
import toyotaCorollaImg from "../assets/images/Toyota corrolla.jpeg";
import toyotaRav4 from "../assets/images/Toyota RAV4.jpeg";

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
  title: "Toyota RAV4",
  brand: "Toyota",
  category: "SUV",
  dailyRate: 120,
  image: toyotaRav4,
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
    title: "Honda accord 2010 model",
    brand: "Honda",
    category: "Sedan",
    tag: "Reliable",
    dailyRate: 350,
    speed: "0-60 in 8.5s",
    transmission: "Automatic",
    fuel: "1.8L Petrol",
    seats: 5,
    image: corollaImg,
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
    title: "Toyota Corolla 2010 model",
    brand: "Audi",
    category: "Sedan",
    tag: "Reliable",
    dailyRate: 390,
    speed: "0-60 in 3.5s",
    transmission: "Quattro Auto",
    fuel: "V8 Twin-Turbo",
    seats: 5,
    image: toyotaCorollaImg,
  },
  {
    id: 9,
    title: "Toyota Sienna Limited",
    brand: "Toyota",
    category: "Minivan",
    tag:  "Reliable",
    dailyRate: 180,
    speed: "0-60 in 7.4s",
    transmission: "Automatic",
    fuel: "3.5L V6 Petrol",
    seats: 8,
    image: toyotaSiennaImg,
  }
];

const CATEGORIES = ["All", "Sports", "SUV", "Luxury", "Sedan", "Electric", "Minivan"];

function Home({ onBookingAdded }) {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookingModalCar, setBookingModalCar] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [firestoreCars, setFirestoreCars] = useState([]);
  const [savingBooking, setSavingBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingForm, setBookingForm] = useState({ fullName: "", phone: "", rentalDate: "", days: 1 });

  // Load cars added from Firestore (via the Car Listing admin page)
  useEffect(() => {
    getCars()
      .then((list) =>
        setFirestoreCars(
          list.map((c) => ({
            id: c.id,
            title: c.name,
            brand: c.brand,
            category: c.category || "SUV",
            dailyRate: c.dailyRate,
            seats: c.seats,
            transmission: c.transmission,
            fuel: c.fuel,
            image: c.imageUrl,
            speed: "—",
          }))
        )
      )
      .catch((err) => console.warn("Could not load Firestore cars:", err.message));
  }, []);

  // Combine sample cars with Firestore cars (no duplicates by title)
  const allCars = useMemo(() => {
    const merged = [...SAMPLE_CARS];
    firestoreCars.forEach((fc) => {
      if (!merged.some((c) => c.title.toLowerCase() === fc.title.toLowerCase())) {
        merged.push(fc);
      }
    });
    return merged;
  }, [firestoreCars]);

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      const matchesCategory =
        selectedCategory === "All" || car.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allCars, searchTerm, selectedCategory]);

  const handleBookNow = (car) => {
    setBookingModalCar(car);
    setBookingConfirmed(false);
  };

  async function confirmBooking(e) {
    e.preventDefault();
    setBookingError("");
    setSavingBooking(true);
    try {
      await createBooking({
        carId: String(bookingModalCar.id),
        carName: bookingModalCar.title,
        userId: currentUser?.uid || null,
        userName: currentUser?.displayName || bookingForm.fullName,
        userEmail: currentUser?.email || "",
        fullName: bookingForm.fullName,
        phone: bookingForm.phone,
        rentalDate: bookingForm.rentalDate,
        days: bookingForm.days,
      });
      setBookingConfirmed(true);
      if (onBookingAdded) onBookingAdded();
      setTimeout(() => {
        setBookingModalCar(null);
        setBookingConfirmed(false);
        setBookingForm({ fullName: "", phone: "", rentalDate: "", days: 1 });
      }, 2500);
    } catch (err) {
      setBookingError("Could not save booking: " + err.message);
    } finally {
      setSavingBooking(false);
    }
  }

  const scrollToFleet = () => {
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
  <div className="home-page">
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

                {bookingError && <p className="booking-error">{bookingError}</p>}

                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="fullName" placeholder="e.g. John Doe" value={bookingForm.fullName} onChange={(e) => setBookingForm((f) => ({ ...f, fullName: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="+2348060121814" value={bookingForm.phone} onChange={(e) => setBookingForm((f) => ({ ...f, phone: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Rental Date</label>
                  <input type="date" name="rentalDate" value={bookingForm.rentalDate} onChange={(e) => setBookingForm((f) => ({ ...f, rentalDate: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Number of Days</label>
                  <input type="number" name="days" min="1" value={bookingForm.days} onChange={(e) => setBookingForm((f) => ({ ...f, days: e.target.value }))} required />
                </div>
                <p className="booking-total">Total: <strong>${bookingModalCar.dailyRate * (bookingForm.days || 1)}</strong></p>

                <button type="submit" className="btn-primary full-width" disabled={savingBooking}>
                  {savingBooking ? "Saving..." : "Confirm Reservation"}
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
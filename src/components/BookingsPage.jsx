import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getBookings, getUserBookings, updateBookingStatus, deleteBooking } from "../services/bookingService";
import { FaTrash, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

export default function BookingsPage() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      // Logged-in users see their own bookings; extend here for admin view if needed
      const list = currentUser ? await getUserBookings(currentUser.uid) : [];
      setBookings(list);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentUser !== null) load();
    else setLoading(false);
  }, [currentUser]);

  async function handleStatus(id, status) {
    await updateBookingStatus(id, status);
    load();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this booking?")) return;
    await deleteBooking(id);
    load();
  }

  if (loading) {
    return <div className="loading-container"><FaSpinner className="spinner" /> <p>Loading bookings...</p></div>;
  }

  if (!currentUser) {
    return <p className="empty-msg">Please log in to see your bookings.</p>;
  }

  return (
    <div className="bookings-page">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="empty-msg">You have no bookings yet. Book a car from the home page!</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="booking-row">
            <div className="booking-info">
              <span className="booking-car">{b.carName}</span>
              <span className="booking-meta">
                {b.rentalDate}  •  {b.days} day(s)  •  Total: ${b.days ? (b.total || "") : ""}
              </span>
              <span className={`booking-status status-${b.status}`}>{b.status}</span>
            </div>
            <div className="booking-actions">
              {b.status !== "confirmed" && (
                <button className="icon-btn confirm" title="Confirm" onClick={() => handleStatus(b.id, "confirmed")}>
                  <FaCheck />
                </button>
              )}
              {b.status !== "cancelled" && (
                <button className="icon-btn cancel" title="Cancel" onClick={() => handleStatus(b.id, "cancelled")}>
                  <FaTimes />
                </button>
              )}
              <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(b.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

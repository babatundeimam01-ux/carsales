import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const BOOKINGS_COLLECTION = "bookings";

// Create a new booking
export async function createBooking({ carId, carName, userId, userName, userEmail, fullName, phone, rentalDate, days }) {
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    carId,
    carName,
    userId: userId || null,
    userName: userName || "",
    userEmail: userEmail || "",
    fullName,
    phone,
    rentalDate,
    days: Number(days) || 1,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get all bookings (admin view), newest first
export async function getBookings() {
  const q = query(collection(db, BOOKINGS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get bookings for one user
export async function getUserBookings(userId) {
  const q = query(collection(db, BOOKINGS_COLLECTION), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Update booking status: "pending" | "confirmed" | "cancelled"
export async function updateBookingStatus(bookingId, status) {
  await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), { status });
}

// Delete a booking
export async function deleteBooking(bookingId) {
  await deleteDoc(doc(db, BOOKINGS_COLLECTION, bookingId));
}

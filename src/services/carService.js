import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const CARS_COLLECTION = "cars";

// ---------- IMAGE UPLOAD (Storage) ----------

// Upload an image file to Storage and return its public download URL
export async function uploadCarImage(file, carName) {
  const safeName = (carName || "car").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const fileName = `${safeName}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const storageRef = ref(storage, `car-images/${fileName}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return { url: downloadURL, path: `car-images/${fileName}` };
}

// Delete an image from Storage given its full path
export async function deleteCarImage(imagePath) {
  if (!imagePath) return;
  try {
    await deleteObject(ref(storage, imagePath));
  } catch (err) {
    console.warn("Could not delete image:", err.message);
  }
}

// ---------- CARS (Firestore) ----------

// Add a new car listing to Firestore
export async function addCar({ name, brand, category, dailyRate, seats, transmission, fuel, description, imageUrl, imagePath }) {
  const docRef = await addDoc(collection(db, CARS_COLLECTION), {
    name,
    brand,
    category,
    dailyRate: Number(dailyRate),
    seats: Number(seats) || 4,
    transmission: transmission || "Automatic",
    fuel: fuel || "Petrol",
    description: description || "",
    imageUrl: imageUrl || "",
    imagePath: imagePath || "",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get all car listings, newest first
export async function getCars() {
  const q = query(collection(db, CARS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Delete a car listing (and its image)
export async function deleteCar(car) {
  if (car.imagePath) await deleteCarImage(car.imagePath);
  await deleteDoc(doc(db, CARS_COLLECTION, car.id));
}

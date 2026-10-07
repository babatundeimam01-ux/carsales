import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addCar, getCars, deleteCar, uploadCarImage } from "../services/carService";
import { FaPlus, FaTrash, FaImage, FaTimes, FaSpinner } from "react-icons/fa";

export default function CarListing() {
  const { currentUser, logout } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "", brand: "", category: "", dailyRate: "", seats: "",
    transmission: "Automatic", fuel: "Petrol", description: "",
    imageFile: null, imagePreview: "",
  });

  useEffect(() => {
    if (!currentUser) return;
    fetchCars();
  }, [currentUser]);

  async function fetchCars() {
    try {
      const list = await getCars();
      setCars(list);
    } catch (err) {
      console.error("Error loading cars:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "imageFile" && files && files[0]) {
      setForm((f) => ({ ...f, imageFile: files[0], imagePreview: URL.createObjectURL(files[0]) }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setUploading(true);
    try {
      let imageUrl = "", imagePath = "";
      if (form.imageFile) {
        const result = await uploadCarImage(form.imageFile, form.name);
        imageUrl = result.url;
        imagePath = result.path;
      }
      await addCar({
        name: form.name,
        brand: form.brand,
        category: form.category,
        dailyRate: form.dailyRate,
        seats: form.seats,
        transmission: form.transmission,
        fuel: form.fuel,
        description: form.description,
        imageUrl,
        imagePath,
      });
      setMessage("Car listing added successfully!");
      setForm((f) => ({ name: "", brand: "", category: "", dailyRate: "", seats: "", transmission: "Automatic", fuel: "Petrol", description: "", imageFile: null, imagePreview: "" }));
      fetchCars();
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(car) {
    if (!window.confirm(`Delete "${car.name}"?`)) return;
    try {
      await deleteCar(car);
      setMessage("Car deleted.");
      fetchCars();
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" /> <p>Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="car-listing-page">
      <h2>Manage Car Listings</h2>
      {!currentUser ? (
        <p>Please log in to manage car listings.</p>
      ) : (
        <>
          {message && <p className="message-banner">{message}</p>}

          <form onSubmit={handleSubmit} className="car-form">
            <h3><FaPlus /> Add New Car</h3>

            <div className="form-row">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Car name (e.g. Toyota Corolla)" required />
              <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand (e.g. Toyota)" required />
            </div>

            <div className="form-row">
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. SUV)" required />
              <input name="dailyRate" type="number" value={form.dailyRate} onChange={handleChange} placeholder="Daily rate ($)" required />
              <input name="seats" type="number" value={form.seats} onChange={handleChange} placeholder="Seats" />
            </div>

            <div className="form-row">
              <select name="transmission" value={form.transmission} onChange={handleChange}>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
              <select name="fuel" value={form.fuel} onChange={handleChange}>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>

            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} />

            <label className="image-upload-label">
              <input name="imageFile" type="file" accept="image/*" onChange={handleChange} hidden />
              {form.imagePreview ? (
                <div className="image-preview">
                  <img src={form.imagePreview} alt="Car preview" />
                  <span><FaImage /> Click to change image</span>
                </div>
              ) : (
                <div className="image-placeholder"><FaImage /> <span>Upload car image</span></div>
              )}
            </label>

            <button type="submit" className="submit-btn" disabled={uploading}>
              {uploading ? <><FaSpinner className="spinner" /> Saving...</> : "Add Car Listing"}
            </button>
          </form>

          <div className="cars-table">
            <h3>Current Listings ({cars.length})</h3>
            {cars.length === 0 ? (
              <p>No car listings yet.</p>
            ) : (
              cars.map((car) => (
                <div key={car.id} className="car-row">
                  <img src={car.imageUrl} alt={car.name} className="car-thumb" />
                  <div className="car-info">
                    <span className="car-name">{car.name}</span>
                    <span className="car-meta">{car.brand}  •  {car.category}  •  ${car.dailyRate}/day</span>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(car)}>
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

import React from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

function SearchBar({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by make, model, or keyword (e.g., Porsche, SUV, AMG)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => setSearchTerm("")}>
            <FaTimes />
          </button>
        )}
      </div>

      <div className="filter-select-container">
        <FaFilter className="filter-icon" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;

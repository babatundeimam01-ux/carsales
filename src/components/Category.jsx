import React from "react";

function Category({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="categories-wrapper">
      <div className="categories-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;

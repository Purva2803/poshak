
import React, { useContext, useState } from "react";
import { CartContext } from "../context/Cartcontext";

export const ProductFilter = ({ products, setFilteredProducts }) => {
  const [ratingCategory, setRatingCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleFilter = () => {
    let filteredProducts = products;

    // Filter by rating category
    if (ratingCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating.toString() === ratingCategory
      );
    }

    // Filter by price range
    if (minPrice && maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
      );
    }

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredProducts(filteredProducts);
  };

  const handleReset = () => {
    setRatingCategory('');
    setMinPrice('');
    setMaxPrice('');
    setCategory('');
    setFilteredProducts(products);
  };

  return (
    <div>
      <h3>Filter Products</h3>
      <div>
        <label>Rating Category:</label>
        <select value={ratingCategory} onChange={(e) => setRatingCategory(e.target.value)}>
          <option value="">All</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>
      <div>
        <label>Price Range:</label>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="sarees">Sarees</option>
          <option value="salwar-kurta">Salwar Kurta</option>
          <option value="lehengas">Lehengas</option>
        </select>
      </div>
       <div>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};



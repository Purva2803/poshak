import React, { useState, useEffect } from 'react';

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?search=${searchTerm}`);
        const data = await response.json();
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const getProducts = async (term) => {
      const filteredItems = filteredProducts.filter((product) => {
        return product.name.toLowerCase().includes(term.toLowerCase());
      });
      setFilteredProducts(filteredItems);
    };
  
    useEffect(() => {
      if (searchTerm.length > 0) {
        fetchProducts();
      } else {
        setFilteredProducts([]);
      }
    }, [searchTerm]);
  
    useEffect(() => {
      if (filteredProducts.length > 0) {
        getProducts(searchTerm);
      }
    }, [filteredProducts, searchTerm]);
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        {searchTerm && (
          <div>
            {filteredProducts.map((product) => (
              <div key={product._id}>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  



import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { NavLink } from "react-router-dom";
import { ProductFilter } from "./Filter";
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";



export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  // const { addToCart } = useContext(CartContext);
  // const { addToWishlist } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { selectedCategory } = useContext(CartContext);
  console.log(selectedCategory);

  const getData = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products); // Initialize filteredProducts with all products
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFilterProducts = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  const AddToCart = async (product) => {
    try {
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          product,
        }),
      });
      const data = await response.json();
      console.log(data);
      setCartItems([...cartItems, product]);
    } catch (error) {
      console.log(error);
    }
  };
  const AddToWishlist = async (product) => {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
       data : [product]
        }),
      });
      const data = await response.json();
      console.log(data);
      setWishlist([...wishlist, product]);
    } catch (error) {
      console.log(error);
    }
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };


  

  const myProducts = products.filter((product) => product.category === selectedCategory.toLowerCase());

  return (
    <div>
      {selectedCategory && window.location.pathname === `/product/${selectedCategory}` ? (
        // Render filtered products if a category is selected
        myProducts.map((product) => (
          <div key={product._id}>
            <div>
              <NavLink to={`/products/${product._id}`} key={product._id}>
                <img src={product.image} alt={product.name} height={"200"} width={"200"} />
              </NavLink>
              <h2>{product.name}</h2>
              <h3>{product.price}</h3>
              <h4>{product.dealer}</h4>
              <h5>{product.category}</h5>
              <h5>{product.rating}</h5>
              {isInCart(product._id) ? (
                <NavLink to="/cart">
                  <button>Go to Cart</button>
                </NavLink>
              ) : (
                <button onClick={() => AddToCart(product)}>Add to Cart</button>
              )}
              <button onClick={() => AddToWishlist(product)}>
                <FaHeart />
              </button>
            </div>
          </div>
        ))
      ) : (
        // Render all products if no category is selected
        <>
          <h1 style={{ textAlign: "center", color: "red", backgroundColor: "black", padding: "10px", borderRadius: "10px", margin: "10px", fontFamily: "Arial" }}>
            Product Page
          </h1>
          <ProductFilter products={products} setFilteredProducts={handleFilterProducts} />
          {filteredProducts.map((product) => (
            <div key={product._id}>
              <div>
                <NavLink to={`/products/${product._id}`} key={product._id}>
                  <img src={product.image} alt={product.name} height={"200"} width={"200"} />
                </NavLink>
                <h2>{product.name}</h2>
                <h3>{product.price}</h3>
                <h4>{product.dealer}</h4>
                <h5>{product.category}</h5>
                <h5>{product.rating}</h5>
                {isInCart(product._id) ? (
                  <NavLink to="/cart">
                    <button>Go to Cart</button>
                  </NavLink>
                ) : (
                  <button onClick={() => AddToCart(product)}>Add to Cart</button>
                )}
                <button onClick={() => setWishlist(product)}>
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
;

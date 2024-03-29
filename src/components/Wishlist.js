import React from "react";
import { CartContext } from "../context/Cartcontext";
import { useContext } from "react";
import { useState,useEffect } from "react";
import "../components/css/wishlist.css"



export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/user/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        console.log(data);
        setWishlist(data.wishlist ?? []); // Provide an empty array as default value
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/api/user/wishlist/:productId`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      const updatedList = wishlist.filter((product) => product._id !== productId);
      setWishlist(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedWishlist = wishlist.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          quantity: (product.quantity || 1) + 1,
        };
      }
      return product;
    });
  
    setWishlist(updatedWishlist);
  };

  const decreaseQuantity = (productId) => {
    const updatedWishlist = wishlist.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          quantity: Math.max((product.quantity || 1) - 1, 1),
        };
      }
      return product;
    });
  
    setWishlist(updatedWishlist);
  };

  return (
    <div className="wishlist-container">
      <header className="wishlist-header">
        Items in wishlist: {wishlist.length}
      </header>
      <main>
        <ul className="wishlist-items-list">
          {wishlist.map((product) => (
            <li key={product._id} className="wishlist-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h4>{product.name}</h4>
                <h5>{product.price}</h5>
                <h6>{product.dealer}</h6>
                <p>Quantity: {product.quantity || 1}</p>
              </div>
              <div className="quantity-buttons">
                <button onClick={() => removeFromWishlist(product._id)}>
                  Remove
                </button>
                <button onClick={() => increaseQuantity(product._id)}>+1</button>
                <button onClick={() => decreaseQuantity(product._id)}>-1</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );

};





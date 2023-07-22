import React from "react";
import { useState, useEffect } from "react";
import {  AuthContext} from "../context/AuthContext";
import { NavLink, Navigate } from "react-router-dom";
import "../App.css";
import { NotificationManager } from "react-notifications";
import { useContext } from "react";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer" + localStorage.getItem("token"),
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        console.log(data);
        setCartItems(data.cart);
        console.log(token)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch("/api/user/cart/:productId", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ productId }),
      });
      if (response.status === 401) {
        window.location.href = "/login";
      } else if (response.status === 200) {
        const data = await response.json();
        NotificationManager.success(
          "Item Removed Successfully",
          "Success",
          2000
        );
        setCartItems(cartItems.filter((item) => item._id !== productId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const increaseQuantity = (productId) => {
    const updatedcartItems = cartItems.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          quantity: (product.quantity || 1) + 1,
          price: product.price * ((product.quantity || 1) + 1),
        };
      }
      return product;
    });

    setCartItems(updatedcartItems);
  };

  const decreaseQuantity = (productId) => {
    const updatedcartItems = cartItems.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          quantity: Math.max((product.quantity || 1) - 1, 1),
          price: product.price * Math.max((product.quantity || 1) - 1, 1),
        };
      }
      return product;
    });

    setCartItems(updatedcartItems);
  };

  return (
    <div>
      <div>
        {token ? (
          cartItems && cartItems.length > 0 ? (
            <header>Items in cart: {cartItems.length}</header>
          ) : (
            <div>No items in cart</div>
          )
        ) : (
          <Navigate to="/login" />
        )}
      </div>
  
      <main>
        <ul>
          {cartItems.map((product) => (
            <li key={product._id}>
              <img
                src={product.image}
                alt={product.name}
                height={"200"}
                width={"200"}
              />
              <h3>{product.name}</h3>
              <h4>
                price: <span>{product.price}</span>
              </h4>
              <h5>
                dealer: <span>{product.dealer}</span>
              </h5>
              <h5>category: {product.category}</h5>
  
              <button onClick={() => increaseQuantity(product._id)}>+</button>
              <button onClick={() => decreaseQuantity(product._id)}>-</button>
              <p>Quantity: {product.quantity || 1}</p>
              <button onClick={() => removeFromCart(product._id)}>
                Remove
              </button>
              <NavLink to={`/checkout/${product._id}`}>
                <button onClick={() => {}}>Check Out</button>
              </NavLink>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
  
};

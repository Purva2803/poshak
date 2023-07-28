import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import "../components/css/singleproduct.css"

import { categories } from "../backend/db/categories";
import { CartContext } from "..";
import { NavLink } from "react-router-dom";



export const SingleProductPage = () => {
  const { AddToCart, AddToWishlist,cartItems } = useContext(CartContext);
  const { productId } = useParams();
  console.log(productId);
  const [product, setProduct] = useState([]);
   // Define or import the cartItems state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const isInCart = (productId) => {
    return cartItems.some((item) => item._id == productId);
  };

  const getData = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setProduct(data.product);
      console.log(data.product);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [productId]);
 
 
  const category = categories.find((categori) => categori.category == product.category);
  console.log(category);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  

  // return (
  //   <div className="center-container">
  //   <div className="product-container">
  //     <>
  //       <img src={product.image} alt={product.title} className="product-image" />
  //       <h2 className="product-name">{product.name}</h2>
  //       <h3 className="product-dealer">Dealer: {product.dealer}</h3>
  //       <h4 className="product-category">Category: {product.category}</h4>
  //       <h5 className="product-price">Price: {product.price}</h5>
  //       <button className="wishlist-button" onClick={() => AddToWishlist(product)}>
  //         Add to Wishlist
  //       </button>
  //       {isInCart(product._id) ? (
  //         <NavLink to="/cart" className="go-to-cart-button">
  //           Go to Cart
  //         </NavLink>
  //       ) : (
  //         <button className="add-to-cart-button" onClick={() => AddToCart(product)}>
  //           Add to Cart
  //         </button>
  //       )}
  //       <p className="product-description">{category.description}</p>
  //     </>
  //   </div>
  //   </div>
  // );

  return (
    <div className="center-container">
      <div className="product-card">
        <img src={product.image} alt={product.title} className="product-image" />
        <h2>{product.name}</h2>
        <h3>Dealer: {product.dealer}</h3>
        <h4>Category: {product.category}</h4>
        <h5>Price: {product.price}</h5>
        <button onClick={() => AddToWishlist(product)}>Add to wishlist</button>
        {isInCart(product._id) ? (
          <NavLink to="/cart">
            <button onClick={() => {}}>Go to Cart</button>
          </NavLink>
        ) : (
          <button onClick={() => AddToCart(product)}>Add to Cart</button>
        )}
        <p>{category.description}</p>
      </div>
    </div>
  );
};

  
  


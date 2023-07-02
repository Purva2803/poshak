import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";

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
  console.log(product);
  console.log(categories);
  console.log(product.category);
 
  const category = categories.find((categori) => categori.category == product.category);
  console.log(category);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // _id: uuid(),
  // image: "https://cdn.sareeka.com/image/data2020/embroidered-silk-saree-141027.jpg",
  // name: "Traditional Silk Saree",
  // category: "Sarees",
  // price: "$99.99",
  // dealer: "Indian Saree Emporium",

  return (
    <div>
      <>
       
        <img src={product.image} alt={product.title} height={"200"} width={"200"}/>
        <h2>{product.name}</h2>
        <h3>dealer :{product.dealer}</h3>
        <h4>category :{product.category}</h4>
        <h5>price :{product.price}</h5>
        <button onClick={() => AddToWishlist(product)}>Add to wishlist</button>
        {isInCart(product._id) ? (
                <NavLink to="/cart">
                  <button onClick={() => {}}>Go to Cart</button>
                </NavLink>
              ) : (
                <button onClick={() => AddToCart(product)}>Add to Cart</button>
              )}
        <p>{category.description}</p>
       
                
      </>
    </div>
  );
  
};

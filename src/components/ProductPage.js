import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { NavLink } from "react-router-dom";
import { ProductFilter } from "./Filter";
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { NotificationManager } from 'react-notifications';




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

      NotificationManager.success('Added to cart', 'Success', 2000);




      
      
      setCartItems([...cartItems, product]);
    } catch (error) {
      NotificationManager.info('Please login to add to cart', 'Info', 2000);
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
        product,
        }),
      });
      const data = await response.json();

      NotificationManager.success('Added to wishlist', 'Success', 2000);
      
      setWishlist([...wishlist, product]);
    } catch (error) {
      NotificationManager.info('Please login to add to wishlist', 'Info', 2000);
      console.log(error);
    }
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };


  
const myProducts = products.filter((product) => product.category == selectedCategory);
  return (
    <div>
      {selectedCategory && window.location.pathname === `/product/${selectedCategory}` ? (
        // Render filtered products if a category is selected
        <div style={styles.container}>
      {myProducts.map((product) => (
        <div key={product._id} style={styles.card}>
          <div>
            <NavLink to={`/products/${product._id}`} key={product._id}>
              <img src={product.image} alt={product.name} height={"200"} width={"200"} />
            </NavLink>
            <h2>{product.name}</h2>
            <h3>price :{product.price}</h3>
            <h4>dealer :{product.dealer}</h4>
            <h5>category :{product.category}</h5>
            <h5>Rating :{product.rating}</h5>
            {isInCart(product._id) ? (
              <NavLink to="/cart">
                <button>Go to Cart</button>
              </NavLink>
            ) : (
              <button onClick={() => AddToCart(product)}>Add to Cart</button>
            )}
            <button onClick={() => AddToWishlist(product)} style={styles.wishlistButton}>
              <FaHeart />
            </button>
          </div>
        </div>
      ))}
    </div>
        
      ) : (
        // Render all products if no category is selected
        <>
          {/* <h1 style={{ textAlign: "center", color: "red", backgroundColor: "black", padding: "10px", borderRadius: "10px", margin: "10px", fontFamily: "Arial" }}>
            Product Page
          </h1> */}
          <ProductFilter products={products} setFilteredProducts={handleFilterProducts} />
          <div style={styles.container}>
          {filteredProducts.map((product) => (
            
            <div key={product._id} style={styles.card}>
              <div>
                <NavLink to={`/products/${product._id}`} key={product._id}>
                  <img src={product.image} alt={product.name} height={"200"} width={"200"} />
                </NavLink>
                <h2>{product.name}</h2>
                <h3>price :{product.price}</h3>
                <h4>dealer :{product.dealer}</h4>
                <h5>category :{product.category}</h5>
                <h5>rating :{product.rating}</h5>
                {isInCart(product._id) ? (
                  <NavLink to="/cart">
                    <button>Go to Cart</button>
                  </NavLink>
                ) : (
                  <button onClick={() => AddToCart(product)}>Add to Cart</button>
                )}
                <button onClick={() => AddToWishlist(product)} style={styles.wishlistButton}>
                  <FaHeart />
                </button>
              </div>
            </div>
           
          ))} 
        </div>
        </>
      )}
    </div>
  );
};
;

// const styles = {
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: '80px', // Add margin to the bottom of the container to make room for the footer
//   },
//   card: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '1rem',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     margin: '0.5rem',
//     width: '200px',
//     position: 'sticky',
//     zIndex: 1, // Ensure the cards are behind the footer
//   },
// };

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '80px', // Add margin to the bottom of the container to make room for the footer
  },
  card: {
    display: 'flex',
    flexDirection: 'column', // Set flexDirection to 'column' to position elements vertically
    alignItems: 'center', // Align items horizontally at the center
    justifyContent: 'center', // Center the content vertically
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    margin: '0.5rem',
    width: '400px', // Set the card width to 400px as desired
    height: '500px', // Set the card height to 500px as desired
    position: 'relative',
    zIndex: 1, // Ensure the cards are behind the footer
  },
  image: {
    width: '100%',
    height: '300px', // Set the image height to 300px as desired
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'left', 
    marginBottom: '5px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'right', 
    marginBottom: '5px',
  },
  description: {
    fontSize: '16px',
    textAlign: 'left', // Align the description to the left
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the button horizontally
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  wishlistButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "10px",
    fontSize: "18px",
    backgroundColor: "transparent",
    color: "red",
    border: "none",
    cursor: "pointer",
  }
};

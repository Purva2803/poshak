import React, { createContext, useState ,useEffect} from "react";
import { NotificationManager } from 'react-notifications';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]); // Array of all products
    const [selectedCategory, setSelectedCategory] = useState('');


   
   const [showDropdown, setShowDropdown] = useState(false);
  const handleCategory = (category) => {
    setSelectedCategory(category);
  };
   ; // Array of filtered products
  
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

  
    const removeFromCart = (productId) => {
      if(productId){
      const updatedCart = cartItems.filter((product) => product._id !== productId);
      NotificationManager.success('Item Removed Successfully', 'Success', 2000);
      setCartItems(updatedCart);
      }
      else
      {
        NotificationManager.info('no items in the cart', 'Info!', 2000);
      }

    };
    
 
    const removeFromWishlist = (productId) => {
    
     const response = fetch("/api/user/wishlist/productId", {

        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          productId,
        }),
      });
      const data =  response.json();
     
      const updatedWishlist = wishlist.filter(
        (product) => product._id !== productId
      );
      NotificationManager.success('Item Removed Successfully', 'Success', 2000);
      setWishlist(updatedWishlist);

    };
  
    useEffect(() => {

      const getData = async () => {
        try {
          const response = await fetch("/api/products");
          const data = await response.json();
          setProducts(data.products);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }, []);
  
    return (
      <CartContext.Provider
        value={{
          cartItems,
          AddToCart,
          removeFromCart,
          wishlist,
          AddToWishlist,
          removeFromWishlist,
          setWishlist,
          setCartItems,
          products,
          selectedCategory,
          handleCategory,
          
          showDropdown,
          setShowDropdown


          
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  
    



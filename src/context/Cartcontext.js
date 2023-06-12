import React, { createContext, useState ,useEffect} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]); // Array of all products
    const [selectedCategory, setSelectedCategory] = useState('');


    const [isLoggedin, setIsLoggedin] = useState(false);
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

  
    const removeFromCart = (productId) => {
      const updatedCart = cartItems.filter((product) => product._id !== productId);
      setCartItems(updatedCart);
    };
    const handleLoginSuccess = () => {
      setIsLoggedin(true);
      setShowDropdown(false);
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
      console.log(data);
      const updatedWishlist = wishlist.filter(
        (product) => product._id !== productId
      );
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
          handleLoginSuccess,
          setIsLoggedin,
          isLoggedin,
          setShowDropdown


          
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  
    



import "./App.css";
import logo from "./logo.png";
import Mockman from "mockman-js"
import { NavLink } from "react-router-dom";
import {Route,Routes} from "react-router-dom";
import {HomePage} from "./components/HomePage";
import { FaHeart,FaCartArrowDown,FaGithub,FaLinkedin,FaTwitter } from 'react-icons/fa';
import {ProductPage} from "./components/ProductPage";

import { Footer } from "./components/Footer";
import { CartPage } from "./components/CartPage";
import { SingleProductPage } from "./components/SingleProductPage";
import { Wishlist } from "./components/Wishlist";
import  Login  from "./components/Login";
import SignupPage from "./components/Sign-UP";
import { Logout } from "./components/Logout";
import { Checkout } from "./components/Checkout";
import { useState ,useEffect} from "react";
import { products } from "./backend/db/products"
import { useNavigate } from "react-router-dom";
import { CartContext } from "./context/Cartcontext";
import { useContext } from "react";

import { CgProfile } from "react-icons/cg";
import { Search } from "./components/Search";



function ProtectedRoute({ component: Component, isLoggedin, ...rest }) {
  const Navigate = useNavigate();
  return (
    <Route
      {...rest}
      element={
        isLoggedin ? <Component /> : <Navigate to="/login" replace />
      }
    />
  );
}

function App() {
 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { handleLoginSuccess,isLoggedin,setIsLoggedin} = useContext(CartContext);
  const navigate = useNavigate();



  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

   const handleCartClick = () => {
    if (isLoggedin) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const handleWishlistClick = () => {
    if (isLoggedin) {
      navigate('/wishlist');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="App">
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>
          Home
        </NavLink>

        <div style={styles.searchContainer}>
          
            <Search />
         
         
        </div>
         <div style={styles.dropdownContainer}>
          <NavLink to="/product" style={styles.link}>
            Explore
          </NavLink>
         </div>
        <div style={styles.dropdownContainer}>
          <button onClick={handleDropdownToggle} style={styles.link}>
            <CgProfile style={styles.icon} />
          </button>
        
          <>
            <button onClick={handleCartClick}>
              <FaCartArrowDown style={styles.icon} />
            </button>
            <button onClick={handleWishlistClick}>
              <FaHeart style={styles.icon} />
            </button>
          </>

          
        
        
       
          {showDropdown && (
            <div style={styles.dropdownContainer}>
              {/* Dropdown content */}
              {isLoggedin ? (
                <>
                  <NavLink
                    to="/logout"
                    style={styles.link}
                    onClick={() => setIsLoggedin(false)}
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" style={styles.link}>
                    Login
                  </NavLink>
                  <NavLink to="/signup" style={styles.link}>
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>


       
      
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:category" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:productId" element={<SingleProductPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout/:productId" element={<Checkout />} />
        <Route path="/thankyou" element={<h1>Thank you for placing the order</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route
  path="/"
  element={
    <>
      <HomePage />


    </>
  }
/>

      </Routes>

      <Footer />
    </div>
  );
}







const styles = {
  nav: {
    backgroundColor: '#10000e',
    color: '#FFD700',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    margin: '0 20px',
    color: '#FFD700', // Golden yellow color
  },
  icon: {
    color: '#FFD700', // Golden yellow color
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block',
  },

};

export default App;


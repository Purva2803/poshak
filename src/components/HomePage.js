import React from "react";
import poshak from "../assests/poshak.png"; 
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/Cartcontext";






export const HomePage = () => {
  const { selectedCategory, handleCategory } = useContext(CartContext);


 
  


    return (
      <div style={styles.container}>
        <img src={poshak} alt="poshak" style={styles.image} />
        <h2 style={styles.heading}>
          Welcome to POSHAK, your ultimate destination for Indian clothing! With a touch of elegance and a dash of tradition, we bring you the finest collection of fashion straight from the heart of India. From vibrant sarees to intricately designed lehengas, our carefully curated range showcases the rich heritage and craftsmanship of our diverse culture. Get ready to embrace your inner diva and experience the essence of "India ka H&M" with POSHAK. Indulge in fashion that celebrates your unique style and lets you make a statement like never before. Step into our virtual aisles and discover the magic of Indian fashion at its best!
        </h2>
        <div style={styles.categories}>
          <div  onClick={()=>handleCategory("sarees")}>
        <Link to={`/product/sarees`} style={styles.categoryLink} >

          Sarees
        </Link>
        </div >
        <div onClick={()=>handleCategory("salwarKameez")}>
        <Link to={`/product/salwarKameez`} style={styles.categoryLink}>
          Salwar Kameez
        </Link>
        </div>
        <div onClick={()=>handleCategory("lehengas")}>
        <Link to={`/product/lehengas`} style={styles.categoryLink}>
          Lehengas
        </Link>
        </div>
      </div>
      </div>
    );
  };
  

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      margin: '20px',
    },
    image: {
      height: '300px', // Adjust the height as needed
      width: 'auto', // Maintain the aspect ratio
      marginBottom: '20px', // Add some space below the image
      float: 'left', // Float the image to the left
      borderRadius: '10px', // Add a border radius
      marginRight: '20px', // Add some space between the image and the description
    },
    heading: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      lineHeight: '1.5',
      marginTop: '20px',
      marginBottom: '20px',
    },
    categories: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      flexWrap: 'wrap',
    },
    categoryLink: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100px',
      height: '100px',
      background: '#FFD700',
      border: '1px solid #ccc',
      borderRadius: '4px',
      color: '#333',
      fontSize: '18px',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      margin: '10px', // Add some margin around the category links
      padding: '10px', // Add some padding to the category links
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
    },
  };
  
  
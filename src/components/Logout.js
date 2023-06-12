
import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user session or token stored in local storage
    localStorage.removeItem("token");

    // Redirect the user to the login page (or any desired page)
    navigate("/login");
  };

  return (
    
      <button onClick={handleLogout}>Logout</button>
   
  );
};


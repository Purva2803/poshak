import React from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';


export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    NotificationManager.success('Logged out successfully', 'Success', 2000);

    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button> ; 
};

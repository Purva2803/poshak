import React, { createContext, useState } from "react";

import {  useEffect, useContext } from 'react';
import { AuthContext } from ".."

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, setUser } = useContext(AuthContext);

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
      console.log(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
      console.log(event.target.value);
    }
  };

  const handleGuestLogin = () => {
    setEmail("adarshbalika@gmail.com");
    setPassword("adarshbalika");
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
   
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        window.alert("Login successful");
        localStorage.setItem("token", data.encodedToken);
        setToken(data.encodedToken);
        window.location.href = "/";
      } else {
        window.alert("Login unsuccessful");
        
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="email" style={{ fontWeight: 'bold', marginTop: '1rem' }}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email.."
          value={email}
          onChange={handleChange}
          style={{ padding: '0.5rem', marginTop: '0.5rem', width: '300px' }}
        />
        <label htmlFor="password" style={{ fontWeight: 'bold', marginTop: '1rem' }}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password.."
          value={password}
          onChange={handleChange}
          style={{ padding: '0.5rem', marginTop: '0.5rem', width: '300px' }}
        />
        <button
          type="button"
          onClick={handleGuestLogin}
          style={{ padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Log in as a Guest
        </button>
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};





export default Login;
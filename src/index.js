import React from "react";
import ReactDOM from "react-dom";
import { CartProvider,CartContext } from "./context/Cartcontext";
import { AuthProvider,AuthContext } from "./context/AuthContext";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

export {CartContext,AuthContext};
// Call makeServer
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

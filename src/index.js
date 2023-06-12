import React from "react";
import ReactDOM from "react-dom";
import { CartProvider,CartContext } from "./context/Cartcontext";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

export {CartContext};

// Call make Server
makeServer();



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
    <App />
    </CartProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

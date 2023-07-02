
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setUser((prev) => ({ ...prev, cart: [], wishlist: [] }));
    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, cart: [], wishlist: [] })
      );
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


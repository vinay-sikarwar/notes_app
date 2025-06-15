// src/db/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fakeUser = {
        userName: "Vinay",
        profilePhoto: "https://placehold.co/100x100",
        resourcesAccessed: [
          "Engineering Mathematics-I",
          "Basic Electrical Engineering",
        ],
        uploadApprove: "no",
      };
      setUser(fakeUser);
      setLoading(false);
    }, 500);
  }, []);

  const loggedIn = user;

  return (
    <AuthContext.Provider value={{ user, setUser, loggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

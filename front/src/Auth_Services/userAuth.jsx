import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';
import { login, logout, register } from './Auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    let hasRedirected = false; // To prevent multiple redirects
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // User is logged in
        localStorage.setItem("user", JSON.stringify(firebaseUser)); // Store user in localStorage
        if (!hasRedirected && window.location.pathname === "/") {
          navigate("/dashboard"); // Redirect to dashboard only if on the homepage
          hasRedirected = true;
        }
      } else {
        setUser(null); // User is logged out
        localStorage.removeItem("user"); // Remove user from localStorage
        if (!hasRedirected && window.location.pathname.startsWith("/dashboard")) {
          navigate("/"); // Redirect to homepage only if on a protected route
          hasRedirected = true;
        }
      }
      setLoading(false); // Stop loading after auth state is checked
    });
  
    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);
  




  // Login function
  const loginUser = async (email, password) => {
    try {
      const userCredential = await login(email, password);
      setUser(userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // Logout function
  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Register function
  const registerUser = async (email, password) => {
    try {
      const userCredential = await register(email, password);
      setUser(userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

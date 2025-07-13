// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI";
import { authToasts } from "../utils/toastMessages";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout(navigate);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl border-b border-gray-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 
              className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent cursor-pointer hover:from-yellow-200 hover:via-orange-300 hover:to-pink-300 transition-all duration-300 transform hover:scale-105"
              onClick={handleLogoClick}
            >
              ClubWise
            </h1>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium text-lg hover:scale-105 transform"
              >
                Home
              </a>
              
              {isAuthenticated && (
                <a 
                  href="/clubs" 
                  className="text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium text-lg hover:scale-105 transform"
                >
                  Clubs
                </a>
              )}
              
              {isAuthenticated && user?.role === "admin" && (
                <a 
                  href="/admin/dashboard" 
                  className="text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium text-lg hover:scale-105 transform"
                >
                  Dashboard
                </a>
              )}
            </div>
          </div>
          
          {/* Right Side - Auth Section */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400 font-medium">Welcome back,</p>
                    <p className="text-yellow-300 font-bold text-lg">{user?.name || "User"}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border border-red-500/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <a 
                  href="/login" 
                  className="text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium text-lg hover:scale-105 transform"
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex flex-col space-y-3">
            <a 
              href="/" 
              className="text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium"
            >
              Home
            </a>
            
            {isAuthenticated && (
              <a 
                href="/clubs" 
                className="text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium"
              >
                Clubs
              </a>
            )}
            
            {isAuthenticated && user?.role === "admin" && (
              <a 
                href="/admin/dashboard" 
                className="text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium"
              >
                Dashboard
              </a>
            )}
            
            {isAuthenticated && (
              <div className="pt-2">
                <p className="text-sm text-gray-400">Welcome, <span className="text-yellow-300 font-bold">{user?.name || "User"}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 border-t border-gray-700/50 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent font-display">
              ClubWise
            </h3>
            <span className="text-gray-400 font-body">•</span>
            <p className="text-gray-300 font-body">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-yellow-300 transition-all duration-300 font-medium hover:scale-105 transform font-body"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-yellow-300 transition-all duration-300 font-medium hover:scale-105 transform font-body"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-yellow-300 transition-all duration-300 font-medium hover:scale-105 transform font-body"
            >
              Contact
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-yellow-300 transition-all duration-300 font-medium hover:scale-105 transform font-body"
            >
              Support
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-gray-400 text-sm font-body">
            Made with ❤️ for amazing communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

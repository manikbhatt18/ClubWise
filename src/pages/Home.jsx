// pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <Hero />
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Home;

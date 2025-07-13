// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Clubs from "./pages/Clubs";
import ClubDetails from "./pages/ClubDetails";
import Error from "./pages/Error";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateClub from "./pages/admin/CreateClub";
import EditClub from "./pages/admin/EditClub";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            style: {
              background: '#065f46',
              border: '1px solid #10b981',
            },
          },
          error: {
            style: {
              background: '#7f1d1d',
              border: '1px solid #ef4444',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:clubId" element={<ClubDetails />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-club" element={<CreateClub />} />
        <Route path="/admin/edit-club/:clubId" element={<EditClub />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;


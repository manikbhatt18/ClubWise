import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClubs, joinClub, leaveClub } from "../services/operations/clubAPI";
import { permissionToasts, generalToasts } from "../utils/toastMessages";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [joiningClub, setJoiningClub] = useState(null);
  const [leavingClub, setLeavingClub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      permissionToasts.loginRequired();
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchClubs();
  }, [navigate]);

  const fetchClubs = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🔍 Fetching clubs with token:", token ? "Token exists" : "No token");
      const response = await getAllClubs(token);
      console.log("📋 Clubs response:", response);
      setClubs(response.clubs || []);
    } catch (error) {
      console.error("❌ Error fetching clubs:", error);
      toast.error("Failed to fetch clubs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async (clubId) => {
    if (joiningClub) return; // Prevent multiple clicks
    
    setJoiningClub(clubId);
    try {
      const token = localStorage.getItem("token");
      console.log("🤝 Joining club:", clubId, "with token:", token ? "Token exists" : "No token");
      await joinClub(clubId, token);
      console.log("✅ Successfully joined club:", clubId);
      // Refresh clubs list
      await fetchClubs();
    } catch (error) {
      console.error("❌ Error joining club:", error);
      const errorMessage = error.response?.data?.message || "Failed to join club. Please try again.";
      toast.error(errorMessage);
    } finally {
      setJoiningClub(null);
    }
  };

  const handleLeaveClub = async (clubId) => {
    if (leavingClub) return; // Prevent multiple clicks
    
    setLeavingClub(clubId);
    try {
      const token = localStorage.getItem("token");
      console.log("👋 Leaving club:", clubId, "with token:", token ? "Token exists" : "No token");
      await leaveClub(clubId, token);
      console.log("✅ Successfully left club:", clubId);
      // Refresh clubs list
      await fetchClubs();
    } catch (error) {
      console.error("❌ Error leaving club:", error);
      const errorMessage = error.response?.data?.message || "Failed to leave club. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLeavingClub(null);
    }
  };

  const isUserMember = (club) => {
    return club.members?.some(member => 
      member._id === user?._id || member === user?._id
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="text-white text-xl">Loading clubs...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Discover Amazing Clubs
            </h1>
            <p className="text-gray-400 text-lg">
              Join clubs that match your interests and connect with like-minded people
            </p>
            {user && (
              <p className="text-purple-400 text-sm mt-2">
                Welcome, {user.name} ({user.role})
              </p>
            )}
          </div>

          {clubs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-xl mb-4">No clubs available</div>
              <p className="text-gray-500">Check back later for new clubs!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club) => {
                const isMember = isUserMember(club);
                const isJoining = joiningClub === club._id;
                const isLeaving = leavingClub === club._id;
                
                return (
                  <div
                    key={club._id}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300"
                  >
                    <div className="mb-4">
                      {club.image && (
                        <img
                          src={club.image}
                          alt={club.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {club.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {club.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>Members: {club.members?.length || 0}</span>
                        <span>Category: {club.category}</span>
                      </div>
                      {isMember && (
                        <div className="text-green-400 text-sm mb-2">
                          ✓ You are a member
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      {isMember ? (
                        <button
                          onClick={() => handleLeaveClub(club._id)}
                          disabled={isLeaving}
                          className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                        >
                          {isLeaving ? "Leaving..." : "Leave Club"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoinClub(club._id)}
                          disabled={isJoining}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                        >
                          {isJoining ? "Joining..." : "Join Club"}
                        </button>
                      )}
                      
                      <button
                        onClick={() => navigate(`/clubs/${club._id}`)}
                        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Clubs; 
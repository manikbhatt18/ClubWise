import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClubById, joinClub, leaveClub } from "../services/operations/clubAPI";
import { permissionToasts } from "../utils/toastMessages";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ClubDetails = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  
  const [club, setClub] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joiningClub, setJoiningClub] = useState(false);
  const [leavingClub, setLeavingClub] = useState(false);

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
    fetchClubDetails();
  }, [clubId, navigate]);

  const fetchClubDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🔍 Fetching club details for ID:", clubId);
      const response = await getClubById(clubId, token);
      setClub(response.club);
      console.log("✅ Club details fetched:", response.club);
    } catch (error) {
      console.error("❌ Error fetching club details:", error);
      toast.error("Failed to fetch club details");
      navigate("/clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async () => {
    if (joiningClub) return;
    
    setJoiningClub(true);
    try {
      const token = localStorage.getItem("token");
      await joinClub(clubId, token);
      await fetchClubDetails(); // Refresh club data
    } catch (error) {
      console.error("Error joining club:", error);
    } finally {
      setJoiningClub(false);
    }
  };

  const handleLeaveClub = async () => {
    if (leavingClub) return;
    
    setLeavingClub(true);
    try {
      const token = localStorage.getItem("token");
      await leaveClub(clubId, token);
      await fetchClubDetails(); // Refresh club data
    } catch (error) {
      console.error("Error leaving club:", error);
    } finally {
      setLeavingClub(false);
    }
  };

  const isUserMember = () => {
    return club?.members?.some(member => 
      member._id === user?._id || member === user?._id
    );
  };

  const isUserCreator = () => {
    return club?.createdBy?._id === user?._id || club?.createdBy === user?._id;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Technology": "bg-blue-500",
      "Music": "bg-purple-500",
      "Art": "bg-pink-500",
      "Dance": "bg-red-500",
      "Literature": "bg-yellow-500",
      "Photography": "bg-indigo-500",
      "Drama": "bg-orange-500",
      "Science": "bg-green-500",
      "Sports": "bg-cyan-500",
      "Gaming": "bg-violet-500",
      "Business": "bg-emerald-500",
      "Coding": "bg-slate-500",
      "Cultural": "bg-amber-500",
      "Others": "bg-gray-500",
    };
    return colors[category] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="text-white text-xl">Loading club details...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">❌</div>
            <div className="text-white text-xl mb-4">Club not found</div>
            <button
              onClick={() => navigate("/clubs")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Back to Clubs
            </button>
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
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/clubs")}
              className="text-purple-400 hover:text-purple-300 mb-4 flex items-center"
            >
              ← Back to Clubs
            </button>
          </div>

          {/* Club Header */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Club Image */}
              <div className="lg:w-1/3">
                {club.image ? (
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-6xl text-white opacity-80">🏢</span>
                  </div>
                )}
              </div>

              {/* Club Info */}
              <div className="lg:w-2/3 space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <h1 className="text-4xl font-bold text-white">{club.name}</h1>
                    <span className={`${getCategoryColor(club.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {club.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {club.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{club.members?.length || 0}</div>
                    <div className="text-gray-400 text-sm">Members</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{club.category}</div>
                    <div className="text-gray-400 text-sm">Category</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {club.createdBy?.name || "Unknown"}
                    </div>
                    <div className="text-gray-400 text-sm">Created By</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {new Date(club.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-gray-400 text-sm">Created On</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {isUserMember() ? (
                    <button
                      onClick={handleLeaveClub}
                      disabled={leavingClub}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      {leavingClub ? "Leaving..." : "Leave Club"}
                    </button>
                  ) : (
                    <button
                      onClick={handleJoinClub}
                      disabled={joiningClub}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {joiningClub ? "Joining..." : "Join Club"}
                    </button>
                  )}

                  {isUserCreator() && (
                    <button
                      onClick={() => navigate(`/admin/edit-club/${club._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Edit Club
                    </button>
                  )}

                  {user?.role === "admin" && (
                    <button
                      onClick={() => navigate(`/admin/edit-club/${club._id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Admin Edit
                    </button>
                  )}
                </div>

                {/* Member Status */}
                {isUserMember() && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-green-400 font-medium">You are a member of this club</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Members Section */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Club Members</h2>
            
            {club.members && club.members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {club.members.map((member, index) => (
                  <div
                    key={member._id || member}
                    className="bg-gray-700 rounded-lg p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {member.name || "Unknown Member"}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {member.email || "No email"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-xl mb-2">No members yet</div>
                <p className="text-gray-500">Be the first to join this club!</p>
              </div>
            )}
          </div>

          {/* Club Details */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Club Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Club ID</label>
                  <div className="text-white font-mono text-sm bg-gray-700 p-2 rounded">
                    {club._id}
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Created By</label>
                  <div className="text-white">
                    {club.createdBy?.name || "Unknown"}
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Created On</label>
                  <div className="text-white">
                    {new Date(club.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Category</label>
                  <div className="text-white">
                    {club.category || "Uncategorized"}
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Total Members</label>
                  <div className="text-white">
                    {club.members?.length || 0} members
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Last Updated</label>
                  <div className="text-white">
                    {new Date(club.updatedAt || club.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClubDetails; 
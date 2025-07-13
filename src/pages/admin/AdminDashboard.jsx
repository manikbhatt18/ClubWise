import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClubs, deleteClub } from "../../services/operations/clubAPI";
import { permissionToasts, generalToasts } from "../../utils/toastMessages";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AdminDashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchClubs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getAllClubs(token);
      console.log("Fetched clubs:", res.clubs);
      setClubs(res.clubs || []);
    } catch (err) {
      toast.error("Failed to fetch clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clubId) => {
    
    const token = localStorage.getItem("token");
  console.log("🪪 Using token for deleteClub:", token); 
    try {
      await deleteClub(clubId, token);
      toast.success("Club deleted successfully!");
      fetchClubs(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete club");
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const getGradientClass = (index) => {
    const gradients = [
      "from-purple-500 via-pink-500 to-red-500",
      "from-blue-500 via-cyan-500 to-teal-500",
      "from-green-500 via-emerald-500 to-teal-500",
      "from-orange-500 via-red-500 to-pink-500",
      "from-indigo-500 via-purple-500 to-pink-500",
      "from-yellow-500 via-orange-500 to-red-500",
      "from-pink-500 via-rose-500 to-red-500",
      "from-cyan-500 via-blue-500 to-indigo-500",
    ];
    return gradients[index % gradients.length];
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
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Manage and oversee all clubs on the platform
            </p>
            <button
              onClick={() => navigate("/admin/create-club")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ✨ Create New Club
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl shadow-lg">
              <div className="text-white">
                <div className="text-3xl font-bold">{clubs.length}</div>
                <div className="text-blue-100">Total Clubs</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl shadow-lg">
              <div className="text-white">
                <div className="text-3xl font-bold">
                  {clubs.reduce((total, club) => total + (club.members?.length || 0), 0)}
                </div>
                <div className="text-green-100">Total Members</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg">
              <div className="text-white">
                <div className="text-3xl font-bold">
                  {clubs.filter(club => club.members?.length > 0).length}
                </div>
                <div className="text-purple-100">Active Clubs</div>
              </div>
            </div>
          </div>

          {/* Clubs Grid */}
          {clubs.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-12 border border-gray-600">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Clubs Found</h3>
                <p className="text-gray-400 mb-8 text-lg">
                  Get started by creating your first club and building a community!
                </p>
                <button
                  onClick={() => navigate("/admin/create-club")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Create Your First Club
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club, index) => (
                <div
                  key={club._id}
                  className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 hover:border-purple-500"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(index)} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  {/* Club Image */}
                  <div className="relative h-48 overflow-hidden">
                    {club.image ? (
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getGradientClass(index)} flex items-center justify-center`}>
                        <span className="text-4xl text-white opacity-80">🏢</span>
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`${getCategoryColor(club.category)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
                        {club.category}
                      </span>
                    </div>
                    {/* Members Count */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        👥 {club.members?.length || 0} members
                      </span>
                    </div>
                  </div>

                  {/* Club Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {club.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {club.description || "No description available"}
                    </p>

                    {/* Club Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-300 text-sm">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Category: {club.category || "Uncategorized"}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Members: {club.members?.length || 0}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Created: {new Date(club.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/edit-club/${club._id}`)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(club._id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        🗑️ Delete
                      </button>
                      <button
                        onClick={() => navigate(`/clubs/${club._id}`)}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        👁️ View
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

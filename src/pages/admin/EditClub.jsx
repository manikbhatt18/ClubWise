import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateClub, getClubById } from "../../services/operations/clubAPI";
import { validationToasts, permissionToasts } from "../../utils/toastMessages";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const EditClub = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  
  const clubCategories = [
    "Technology",
    "Music",
    "Art",
    "Dance",
    "Literature",
    "Photography",
    "Drama",
    "Science",
    "Sports",
    "Gaming",
    "Business",
    "Coding",
    "Cultural",
    "Others"
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [fetchingClub, setFetchingClub] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const userData = localStorage.getItem("user");
    if (!userData) {
      permissionToasts.loginRequired();
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== "admin") {
      permissionToasts.adminRequired();
      navigate("/clubs");
      return;
    }

    fetchClubData();
  }, [clubId, navigate]);

  const fetchClubData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🔍 Fetching club data for ID:", clubId);
      const response = await getClubById(clubId, token);
      const club = response.club;
      
      if (!club) {
        toast.error("Club not found");
        navigate("/admin/dashboard");
        return;
      }

      console.log("✅ Club data fetched:", club);

      setFormData({
        name: club.name || "",
        description: club.description || "",
        category: club.category || "",
      });
      setCurrentImage(club.image || "");
      setPreviewUrl(club.image || "");
    } catch (error) {
      console.error("❌ Error fetching club:", error);
      toast.error("Failed to fetch club data");
      navigate("/admin/dashboard");
    } finally {
      setFetchingClub(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      validationToasts.requiredFields();
      return false;
    }
    if (formData.name.trim().length < 3) {
      validationToasts.invalidInput("club name (minimum 3 characters)");
      return false;
    }
    if (!formData.description.trim()) {
      validationToasts.requiredFields();
      return false;
    }
    if (formData.description.trim().length < 10) {
      validationToasts.invalidInput("description (minimum 10 characters)");
      return false;
    }
    if (!formData.category) {
      validationToasts.requiredFields();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    const submitFormData = new FormData();
    submitFormData.append("name", formData.name.trim());
    submitFormData.append("description", formData.description.trim());
    submitFormData.append("category", formData.category);
    if (imageFile) {
      submitFormData.append("image", imageFile);
    }

    try {
      await updateClub(clubId, submitFormData, token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error updating club:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchingClub) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="text-white text-xl">Loading club data...</div>
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Edit Club</h2>
            <p className="text-gray-400">Update club information and settings</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 border border-gray-700 space-y-6">
            <div>
              <label className="block mb-2 font-medium text-white">Club Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter club name"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this club is about..."
                disabled={isLoading}
                rows="4"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 resize-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {clubCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">Club Image</label>
              
              {/* Current Image Display */}
              {currentImage && !previewUrl.includes('blob:') && (
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Current Image:</p>
                  <img
                    src={currentImage}
                    alt="Current club image"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}
              
              {/* New Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer disabled:opacity-50"
              />
              
              {/* Preview of New Image */}
              {previewUrl && previewUrl.includes('blob:') && (
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">New Image Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                disabled={isLoading}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Update Club"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditClub; 
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { clubToasts, generalToasts } from "../../utils/toastMessages";

const {
  CREATE_CLUB_API,
  GET_ALL_CLUBS_API,
  GET_CLUB_BY_ID_API,
  GET_MY_CLUBS_API,
  GET_CLUB_MEMBERS_API,
  JOIN_CLUB_API,
  LEAVE_CLUB_API,
  UPDATE_CLUB_API,
  DELETE_CLUB_API,
} = endpoints;

// Create a new club (admin only)
export const createClub = async (formData, token) => {
  const toastId = generalToasts.loading("Creating club...");
  try {
    const response = await apiConnector("POST", CREATE_CLUB_API, formData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });
    clubToasts.createSuccess();
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to create club. Please try again.";
    clubToasts.createError(errorMessage);
    throw error;
  }
};

// Get all clubs
export const getAllClubs = async (token) => {
  try {
    const response = await apiConnector("GET", GET_ALL_CLUBS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET ALL CLUBS RESPONSE 👉", response);
    return response;
  } catch (error) {
    clubToasts.fetchError("clubs");
    throw error;
  }
};

// Get clubs the logged-in user has joined
export const getMyClubs = async (token) => {
  try {
    const response = await apiConnector("GET", GET_MY_CLUBS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  } catch (error) {
    clubToasts.fetchError("your clubs");
    throw error;
  }
};

// Get members of a specific club
export const getClubMembers = async (clubId, token) => {
  try {
    const response = await apiConnector("GET", GET_CLUB_MEMBERS_API(clubId), null, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  } catch (error) {
    clubToasts.fetchError("club members");
    throw error;
  }
};

// Get a single club by ID
export const getClubById = async (clubId, token) => {
  try {
    const response = await apiConnector("GET", GET_CLUB_BY_ID_API(clubId), null, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  } catch (error) {
    clubToasts.fetchError("club");
    throw error;
  }
};

// Join a club
export const joinClub = async (clubId, token) => {
  console.log("🚀 JOIN CLUB API Call - Club ID:", clubId, "Token:", token ? "Exists" : "Missing");
  const toastId = generalToasts.loading("Joining club...");
  try {
    const response = await apiConnector("POST", JOIN_CLUB_API(clubId), {}, {
      Authorization: `Bearer ${token}`,
    });
    console.log("✅ JOIN CLUB SUCCESS:", response);
    clubToasts.joinSuccess();
    return response;
  } catch (error) {
    console.error("❌ JOIN CLUB ERROR:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "Failed to join club. Please try again.";
    clubToasts.joinError(errorMessage);
    throw error;
  }
};

// Leave a club
export const leaveClub = async (clubId, token) => {
  console.log("🚀 LEAVE CLUB API Call - Club ID:", clubId, "Token:", token ? "Exists" : "Missing");
  const toastId = generalToasts.loading("Leaving club...");
  try {
    const response = await apiConnector("POST", LEAVE_CLUB_API(clubId), {}, {
      Authorization: `Bearer ${token}`,
    });
    console.log("✅ LEAVE CLUB SUCCESS:", response);
    clubToasts.leaveSuccess();
    return response;
  } catch (error) {
    console.error("❌ LEAVE CLUB ERROR:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "Failed to leave club. Please try again.";
    clubToasts.leaveError(errorMessage);
    throw error;
  }
};

// Update a club (admin only)
export const updateClub = async (clubId, updateData, token) => {
  console.log("🚀 UPDATE CLUB API Call - Club ID:", clubId, "Token:", token ? "Exists" : "Missing");
  console.log("📝 Update data:", updateData);
  
  const toastId = generalToasts.loading("Updating club...");
  try {
    const response = await apiConnector("PUT", UPDATE_CLUB_API(clubId), updateData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });
    console.log("✅ UPDATE CLUB SUCCESS:", response);
    clubToasts.updateSuccess();
    return response;
  } catch (error) {
    console.error("❌ UPDATE CLUB ERROR:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "Failed to update club. Please try again.";
    clubToasts.updateError(errorMessage);
    throw error;
  }
};

// Delete a club (admin only)
export const deleteClub = async (clubId, token) => {
  console.log("📡 DELETE API Call with token:", token); 
  const toastId = generalToasts.loading("Deleting club...");
  try {
    const response = await apiConnector("DELETE", DELETE_CLUB_API(clubId), {}, {
      Authorization: `Bearer ${token}`,
    });
    clubToasts.deleteSuccess();
    console.log("DELETE CLUB RESPONSE 👉", response);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete club. Please try again.";
    clubToasts.deleteError(errorMessage);
    console.error("DELETE CLUB ERROR 👉", error.response?.data || error.message);
    throw error;
  }
};

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { authToasts, generalToasts } from "../../utils/toastMessages";
import toast from "react-hot-toast";


const {
  SIGNUP_API,
  LOGIN_API,
    PROFILE_API,
} = endpoints;

export const signup = async (formData, navigate) => {
  const toastId = generalToasts.loading("Creating your account...");
  try {
    const response = await apiConnector("POST", SIGNUP_API, formData)
    console.log("Signup response:", response); // Debug log
    
    if (response?.data?.success || response?.success) {
      toast.dismiss(toastId);
      authToasts.signupSuccess();
      // Add a small delay to ensure toast is shown before navigation
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.dismiss(toastId);
      authToasts.signupError("Signup failed. Please try again.");
    }
  } catch (error) {
    toast.dismiss(toastId);
    console.error("Signup error:", error);
    const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
    authToasts.signupError(errorMessage);
  }
}

export const login = async (formData, navigate) => {
  const toastId = generalToasts.loading("Signing you in...");
  try {
    const response = await apiConnector(
      "POST",
      LOGIN_API,
      formData,
      {
        "Content-Type": "application/json",
      }
    )

    if (response?.success) {
      authToasts.loginSuccess();

      // Store token if needed (you can skip this if you're using cookies)
      localStorage.setItem("token", response.token)

      // Optional: Save user in context or localStorage
      localStorage.setItem("user", JSON.stringify(response.user))

      // 🔐 Role-based redirection
      if (response.user.role === "admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/clubs")
      }
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Login failed. Please check your credentials.";
    authToasts.loginError(errorMessage);
  }
}

export const logout = (navigate) => {
  try {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Show success message
    authToasts.logoutSuccess();
    
    // Navigate to home page
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
    // Even if there's an error, still clear storage and navigate
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }
};

export const getProfile = async () => {
  return await apiConnector("GET", PROFILE_API);
};


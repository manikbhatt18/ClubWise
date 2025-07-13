import toast from "react-hot-toast";

// Authentication related toast messages
export const authToasts = {
  signupSuccess: () => toast.success("Account created successfully! Please login."),
  signupError: (message) => toast.error(message || "Signup failed. Please try again."),
  loginSuccess: () => toast.success("Login successful! Welcome back!"),
  loginError: (message) => toast.error(message || "Login failed. Please check your credentials."),
  logoutSuccess: () => toast.success("Logged out successfully!"),
  sessionExpired: () => toast.error("Session expired. Please login again."),
};

// Club related toast messages
export const clubToasts = {
  createSuccess: () => toast.success("Club created successfully!"),
  createError: (message) => toast.error(message || "Failed to create club. Please try again."),
  updateSuccess: () => toast.success("Club updated successfully!"),
  updateError: (message) => toast.error(message || "Failed to update club. Please try again."),
  deleteSuccess: () => toast.success("Club deleted successfully!"),
  deleteError: (message) => toast.error(message || "Failed to delete club. Please try again."),
  joinSuccess: () => toast.success("Successfully joined the club!"),
  joinError: (message) => toast.error(message || "Failed to join club. Please try again."),
  leaveSuccess: () => toast.success("Successfully left the club!"),
  leaveError: (message) => toast.error(message || "Failed to leave club. Please try again."),
  fetchError: (type) => toast.error(`Failed to fetch ${type}. Please try again.`),
};

// Form validation toast messages
export const validationToasts = {
  requiredFields: () => toast.error("Please fill in all required fields"),
  invalidEmail: () => toast.error("Please enter a valid email address"),
  passwordTooShort: () => toast.error("Password must be at least 6 characters long"),
  nameTooShort: () => toast.error("Name must be at least 2 characters long"),
  invalidInput: (field) => toast.error(`Please enter a valid ${field}`),
};

// General toast messages
export const generalToasts = {
  loading: (message) => toast.loading(message || "Loading..."),
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast(message, { icon: "ℹ️" }),
  warning: (message) => toast(message, { icon: "⚠️" }),
};

// Network related toast messages
export const networkToasts = {
  connectionError: () => toast.error("Connection error. Please check your internet connection."),
  serverError: () => toast.error("Server error. Please try again later."),
  timeoutError: () => toast.error("Request timeout. Please try again."),
};

// Permission related toast messages
export const permissionToasts = {
  unauthorized: () => toast.error("You are not authorized to perform this action."),
  adminRequired: () => toast.error("Admin privileges required for this action."),
  loginRequired: () => toast.error("Please login to perform this action."),
}; 
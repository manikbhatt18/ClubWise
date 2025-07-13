import { useState } from "react"
import { signup } from "../services/operations/authAPI"
import { useNavigate } from "react-router-dom"
import { validationToasts } from "../utils/toastMessages"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      validationToasts.requiredFields();
      return false;
    }
    if (formData.name.trim().length < 2) {
      validationToasts.nameTooShort();
      return false;
    }
    if (!formData.email.includes("@")) {
      validationToasts.invalidEmail();
      return false;
    }
    if (formData.password.length < 6) {
      validationToasts.passwordTooShort();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true)
    try {
      await signup(formData, navigate)
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20 relative z-10">
        <div className="relative animate-fade-in-up">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
          
          <form
            onSubmit={handleSubmit}
            className="relative card-glass text-white p-10 rounded-3xl shadow-2xl w-[450px] space-y-6 backdrop-blur-sm"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.1), 0 0 40px rgba(59, 130, 246, 0.1)"
            }}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 text-gradient-primary font-display">
                Join ClubWise
              </h2>
              <p className="text-gray-400 font-body">Create your account and start exploring amazing clubs</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-body">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 input-enhanced rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-body">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 input-enhanced rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-body">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 input-enhanced rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-body">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 input-enhanced rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="spinner"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-400 font-body">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  disabled={isLoading}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Signup

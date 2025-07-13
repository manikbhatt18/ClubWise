// components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 min-h-[100vh] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-6 flex items-center mb-20 relative z-10">
        {/* Left Side - Content */}
        <div className="flex-1 pr-8 animate-fade-in-up">
          <h2 className="text-responsive-xl font-display mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Welcome to ClubWise
          </h2>
          <p className="text-responsive-lg mb-8 text-gray-300 leading-relaxed font-body">
            Join, manage, and explore clubs easily with our all-in-one platform. 
            Discover amazing communities and connect with like-minded people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/clubs">
              <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg">
                Explore Clubs
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div className="flex-1 flex justify-center animate-slide-in-right">
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center glow-blue">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full flex items-center justify-center glow-purple">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-300/40 to-purple-300/40 rounded-full flex items-center justify-center glow-pink">
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-bounce">🏢</div>
                    <div className="text-2xl font-bold text-white font-display">ClubWise</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce glow-yellow"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse glow-pink"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-green-400 rounded-full animate-ping glow-blue"></div>
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-down">
          <h3 className="text-4xl font-bold mb-4 text-gradient-primary font-display">
            Why Choose ClubWise?
          </h3>
          <p className="text-xl text-gray-300 font-body">
            Everything you need to discover, join, and manage your favorite clubs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Feature Card 1 */}
          <div className="card-glass rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="text-2xl font-bold mb-4 text-blue-400 font-display">Discover Clubs</h4>
            <p className="text-gray-300 leading-relaxed font-body">
              Browse through hundreds of clubs across various categories. Find your perfect community with our advanced search and filtering system.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                Smart Search
              </span>
              <span className="inline-block bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium ml-2">
                Categories
              </span>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="card-glass rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="text-2xl font-bold mb-4 text-purple-400 font-display">Easy Joining</h4>
            <p className="text-gray-300 leading-relaxed font-body">
              Join clubs with just one click. No complicated forms or waiting periods. Start connecting with members instantly.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                One-Click Join
              </span>
              <span className="inline-block bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium ml-2">
                Instant Access
              </span>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="card-glass rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-2xl font-bold mb-4 text-pink-400 font-display">Stay Connected</h4>
            <p className="text-gray-300 leading-relaxed font-body">
              Get real-time updates, notifications, and stay connected with your club members. Never miss important events or announcements.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-pink-600/20 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
                Real-time Updates
              </span>
              <span className="inline-block bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium ml-2">
                Notifications
              </span>
            </div>
          </div>

          {/* Feature Card 4 */}
          <div className="card-glass rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-2xl font-bold mb-4 text-green-400 font-display">Manage Activities</h4>
            <p className="text-gray-300 leading-relaxed font-body">
              Organize events, manage memberships, and track participation. Complete tools for club leaders and administrators.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Event Management
              </span>
              <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium ml-2">
                Member Tracking
              </span>
            </div>
          </div>

          {/* Feature Card 5 */}
          <div className="card-glass rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="text-4xl mb-4">🌟</div>
            <h4 className="text-2xl font-bold mb-4 text-yellow-400 font-display">Build Community</h4>
            <p className="text-gray-300 leading-relaxed font-body">
              Create meaningful connections, share experiences, and build lasting friendships within your favorite clubs.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                Social Features
              </span>
              <span className="inline-block bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium ml-2">
                Networking
              </span>
            </div>
          </div>

          {/* Feature Card 6 */}
          <div className="card-glass rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-2xl font-bold mb-4 text-orange-400 font-display">Analytics & Insights</h4>
            <p className="text-gray-300 leading-relaxed font-body">
              Track your club's growth, member engagement, and activity statistics. Make data-driven decisions for your community.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                Growth Tracking
              </span>
              <span className="inline-block bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium ml-2">
                Engagement Metrics
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center card-glass rounded-3xl p-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h3 className="text-3xl font-bold mb-4 text-gradient-secondary font-display">
            Ready to Start Your Club Journey?
          </h3>
          <p className="text-xl text-gray-300 mb-8 font-body">
            Join thousands of users who have already discovered their perfect communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/clubs">
              <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg">
                Browse All Clubs
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

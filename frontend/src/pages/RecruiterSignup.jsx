import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Mail, Lock, UserRound, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const RecruiterSignup = () => {
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md border border-gray-200 rounded-lg p-6 ">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-700 mb-1.5">
                Recruiter Sign Up
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back! Please sign in to continue
              </p>
            </div>

            <form className="space-y-4">
              {/* Logo Upload */}
              <div className="flex flex-col items-center mb-4">
                <label className="relative cursor-pointer flex items-center justify-between flex-col">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company logo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="h-5 w-5 text-gray-400" />
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  <span className="block text-xs mt-2 text-gray-500">
                    {logoPreview ? "Change logo" : "Upload company logo"}
                  </span>
                </label>
              </div>

              <div className="space-y-3">
                <div className="border border-gray-300 rounded flex items-center p-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                  <UserRound className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                    required
                  />
                </div>

                <div className="border border-gray-300 rounded flex items-center p-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                  <Mail className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Work email address"
                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                    required
                  />
                </div>

                <div className="border border-gray-300 rounded flex items-center p-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                  <Lock className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="password"
                    placeholder="Create password"
                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <label
                htmlFor="terms-checkbox"
                className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer"
              >
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5"
                  required
                />
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>
              </label>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium cursor-pointer"
              >
                Create Account
              </button>

              <div className="text-center text-sm text-gray-600 pt-2">
                Already have an account?{" "}
                <Link
                  to="/recruiter-login"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RecruiterSignup;

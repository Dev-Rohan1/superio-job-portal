import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const RecruiterSignup = () => {
  const [companyImg, setCompanyImg] = useState(null);

  return (
    <section className="flex min-h-[100vh] items-center justify-between">
      <div className="m-auto rounded-md border border-gray-300">
        <form className="p-10">
          <h1 className="mb-2 text-center text-2xl font-semibold">
            Recruiter Signup
          </h1>
          <p className="">Welcome back! Please sign in to continue</p>
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <img
                className="w-[60px]"
                src={
                  companyImg
                    ? URL.createObjectURL(companyImg)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                onChange={(e) => setCompanyImg(e.target.files[0])}
                type="file"
                hidden
              />
              <span>Upload company logo</span>
            </label>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-gray-300 p-2">
            <img className="w-[20px]" src={assets.person_icon} alt="" />
            <input
              className="w-full border-0 outline-none"
              type="text"
              placeholder="Company name"
            />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-gray-300 p-2">
            <img className="w-[20px]" src={assets.email_icon} alt="" />
            <input
              className="w-full border-0 outline-none"
              type="text"
              placeholder="Email id"
            />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-gray-300 p-2">
            <img src={assets.lock_icon} alt="" />
            <input
              className="w-full border-0 outline-none"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            className="mt-3 block w-full rounded-md bg-blue-500 py-2 text-white"
            type="submit"
          >
            Login
          </button>
          <span className="mt-3 block text-center">
            You have an account?{" "}
            <Link to={"/recruiter-login"}>Login</Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default RecruiterSignup;

import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const RecruiterLogin = () => {
  return (
    <section className="flex min-h-[60vh] items-center justify-between">
      <div className="m-auto rounded-md border border-gray-300">
        <form className="p-10">
          <h1 className="mb-2 text-center text-2xl font-semibold">
            Recruiter Login
          </h1>
          <p className="">Welcome back! Please login to continue</p>
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
            Don’t have an account? <Link to={"/recruiter-signup"}>Sign up</Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default RecruiterLogin;

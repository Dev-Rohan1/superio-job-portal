import { useClerk, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { openSignIn, user } = useClerk();

  return (
    <header className="mb-8 border-b border-gray-300">
      <nav className="mb-3 flex items-center justify-between pt-5">
        <Link to={"/"}>
          <img src={assets.logo} alt="" />
        </Link>
        {user ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Applied Job</Link>
            <span>|</span>
            <span>{user.fullName}</span>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to={"/recruiter-login"}>Recruiter</Link>
            <button
              onClick={() => openSignIn()}
              className="cursor-pointer rounded-full bg-blue-500 px-7 py-2 text-white"
            >
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

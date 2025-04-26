import React, { useContext, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const Hero = () => {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const searchHandler = (e) => {
    e.preventDefault();

    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);

    if (titleRef.current.value || locationRef.current.value) {
      navigate("/all-jobs/all");
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg py-16 px-6 md:px-20">
      <div className="text-center max-w-2xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-4 leading-tight sm:leading-snug"
          variants={SlideUp(0.4)}
          initial="hidden"
          animate="visible"
        >
          There Are <span className="text-blue-700">93,178</span> Postings Here
          For You!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-gray-600 mb-10"
          variants={SlideUp(0.4)}
          initial="hidden"
          animate="visible"
        >
          Your next big career move starts right here — explore the best job
          opportunities and take the first step toward your future!
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={searchHandler}
          className="bg-white rounded-lg shadow p-3 flex flex-col sm:flex-row gap-4 sm:gap-2 items-stretch sm:items-center w-full"
          variants={SlideUp(0.5)}
          initial="hidden"
          animate="visible"
        >
          {/* Job Title Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 md:py-2.5 bg-white w-full">
            <Search className="text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              name="job"
              placeholder="Title"
              aria-label="Title"
              autoComplete="on"
              className="w-full outline-none text-sm bg-transparent placeholder-gray-500"
              ref={titleRef}
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 md:py-2.5 bg-white w-full">
            <MapPin className="text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              aria-label="Location"
              autoComplete="on"
              className="w-full outline-none text-sm bg-transparent placeholder-gray-500"
              ref={locationRef}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 md:py-3 px-6 rounded-md transition text-sm cursor-pointer"
          >
            Search
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Hero;

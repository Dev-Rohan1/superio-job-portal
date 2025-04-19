import React from "react";
import { assets } from "../assets/assets";

const Download = () => {
  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h3 className="text-lg font-semibold text-blue-600 uppercase tracking-wider">
            Download & Enjoy
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Get the Superio <span className="text-blue-600">Job Search</span>{" "}
            App
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
            Search through millions of jobs and find the right fit. Simply swipe
            right to apply to your dream job in seconds.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src={assets.play_store}
                alt="Get on Google Play"
                className="h-12 sm:h-14 w-auto"
              />
            </a>
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src={assets.app_store}
                alt="Download on the App Store"
                className="h-12 sm:h-14 w-auto"
              />
            </a>
          </div>
        </div>

        {/* App Image */}
        <div className="w-full lg:w-[45%] mt-10 lg:mt-0 flex justify-center">
          <img
            src={assets.download_image}
            alt="Superio App Preview"
            className="w-full max-w-md lg:max-w-none h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Download;

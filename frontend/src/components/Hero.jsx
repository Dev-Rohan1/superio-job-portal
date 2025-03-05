import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";

const Hero = () => {
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const { setSearchFilter, searchFilter, setIsSearched } =
    useContext(AppContext);

  const onSeacherHandler = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);
  };

  return (
    <section>
      <div className="rounded-md bg-gradient-to-r from-purple-800 to-purple-900 py-20 text-center text-white">
        <h1 className="text-4xl font-bold">Over 10,000+ jobs to apply</h1>
        <p className="m-auto mt-4 max-w-xl text-base font-light">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="m-auto mt-8 max-w-xl rounded-md bg-white">
          <div className="flex items-center gap-3 p-3">
            <div className="flex w-full items-center gap-2">
              <div className="flex h-[42px] items-center rounded-md border border-gray-300 px-2">
                <img className="mr-2" src={assets.search_icon} alt="" />
                <input
                  className="h-full w-full border-none text-gray-500 outline-none"
                  type="text"
                  placeholder="Search jobs"
                  ref={titleRef}
                />
              </div>
              <div className="flex h-[42px] items-center rounded-md border border-gray-300 px-2">
                <img className="mr-2" src={assets.location_icon} alt="" />
                <input
                  className="h-full w-full border-none text-gray-500 outline-none"
                  type="text"
                  placeholder="Location"
                  ref={locationRef}
                />
              </div>
            </div>
            <div
              onClick={onSeacherHandler}
              className="flex h-[42px] cursor-pointer items-center justify-center rounded-md bg-blue-500 px-4 hover:bg-blue-400"
            >
              <button className="text-white">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-around rounded-md border border-gray-300 py-8">
        <span className="text-lg font-medium">Trusted By</span>
        <img className="h-7" src={assets.microsoft_logo} alt="" />
        <img className="h-7" src={assets.walmart_logo} alt="" />
        <img className="h-7" src={assets.accenture_logo} alt="" />
        <img className="h-7" src={assets.samsung_logo} alt="" />
        <img className="h-7" src={assets.amazon_logo} alt="" />
        <img className="h-7" src={assets.adobe_logo} alt="" />
      </div>
    </section>
  );
};

export default Hero;

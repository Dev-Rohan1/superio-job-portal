import React from "react";
import { assets } from "../assets/assets";
import { CheckCheck } from "lucide-react";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <section>
      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8 mb-6">
        {/* Image Container */}
        <div className="lg:w-[50%] lg:h-[400px] w-full flex">
          <img
            src={assets.counter_image}
            alt="People working together"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Content Container */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          <div className="py-6 lg:py-0 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Millions of Jobs. Find the one that{" "}
              <span className="text-blue-600">suits you.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCheck className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Bring to the table win-win survival
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCheck className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Capitalize on low hanging fruit to identify
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCheck className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  But I must explain to you how all this
                </span>
              </li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors ">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        <div className="text-center p-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            <CountUp start={0} end={4} duration={3} enableScrollSpy={true} />
            <span>M</span>
          </div>
          <span className="text-gray-600">4 million daily active users</span>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            <CountUp start={0} end={12} duration={3} enableScrollSpy={true} />
            <span>K</span>
          </div>
          <span className="text-gray-600">Over 12k open job positions</span>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            <CountUp start={0} end={20} duration={3} enableScrollSpy={true} />
            <span>M</span>
          </div>
          <span className="text-gray-600">Over 20 million stories shared</span>
        </div>
      </div>
    </section>
  );
};

export default Counter;

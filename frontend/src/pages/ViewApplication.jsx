import React, { useState, useEffect, useRef } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplication = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section>
      <div>
        {/* Jobs Applied Section */}
        <table className="mx-auto w-full rounded-md border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                User Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Job Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Resume
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((job, index) => (
              <tr
                key={job._id || index}
                className="border-b border-gray-200 transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-700">
                  {job._id || index + 1}
                </td>
                <td className="flex items-center space-x-2 px-4 py-3 text-gray-700">
                  <img
                    src={job.imgSrc}
                    alt={`${job.name} profile`}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{job.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{job.jobTitle}</td>
                <td className="px-4 py-3 text-gray-700">{job.location}</td>
                <td className="px-4 py-3 text-center text-gray-700">
                  <a
                    href={job.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rounded-md bg-blue-100 py-1.5 text-blue-500 hover:bg-blue-200"
                  >
                    <span>Resume</span>
                    <img
                      src={assets.resume_download_icon}
                      alt="Download Resume"
                      className="h-4 w-4"
                    />
                  </a>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className=""
                      aria-expanded={openDropdownIndex === index}
                      aria-haspopup="true"
                    >
                      <span className="text-xl leading-none">...</span>
                    </button>
                    {openDropdownIndex === index && (
                      <div className="absolute top-10 right-0 z-10 w-32 space-y-2 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                        <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                          Accepted
                        </button>
                        <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                          Rejected
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ViewApplication;

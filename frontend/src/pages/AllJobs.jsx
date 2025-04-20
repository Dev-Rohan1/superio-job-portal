import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobCategories, JobLocations } from "../assets/assets";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";

function AllJobs() {
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { jobs, searchFilter, setSearchFilter, setIsSearched, isSearched } =
    useContext(AppContext);
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [searchInput, setSearchInput] = useState({
    title: "",
    location: "",
    selectedCategories: [],
    selectedLocations: [],
  });

  const jobsPerPage = 6;

  // Set initial data when category changes
  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    let filteredData = [...jobs];

    if (category !== "all") {
      filteredData = filteredData.filter(
        (job) => job.category.toLowerCase() === category.toLowerCase()
      );
    }

    setJobData(filteredData);

    // Apply initial search filter from context
    if (isSearched) {
      setSearchInput({
        title: searchFilter.title || "",
        location: searchFilter.location || "",
        selectedCategories: [],
        selectedLocations: [],
      });
    } else {
      setSearchInput({
        title: "",
        location: "",
        selectedCategories: [],
        selectedLocations: [],
      });
    }

    setCurrentPage(1);
  }, [category, jobs, isSearched, searchFilter]);

  // Apply filtering logic
  useEffect(() => {
    let results = [...jobData];

    if (searchInput.title) {
      results = results.filter((job) =>
        job.title.toLowerCase().includes(searchInput.title.toLowerCase())
      );
    }

    if (searchInput.location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(searchInput.location.toLowerCase())
      );
    }

    if (searchInput.selectedCategories.length > 0) {
      results = results.filter((job) =>
        searchInput.selectedCategories.includes(job.category)
      );
    }

    if (searchInput.selectedLocations.length > 0) {
      results = results.filter((job) =>
        searchInput.selectedLocations.includes(job.location)
      );
    }

    setFilteredJobs(results);
    setCurrentPage(1);
  }, [jobData, searchInput]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryToggle = (category) => {
    setSearchInput((prev) => {
      const newCategories = prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category];
      return {
        ...prev,
        selectedCategories: newCategories,
      };
    });
  };

  const handleLocationToggle = (location) => {
    setSearchInput((prev) => {
      const newLocations = prev.selectedLocations.includes(location)
        ? prev.selectedLocations.filter((l) => l !== location)
        : [...prev.selectedLocations, location];
      return {
        ...prev,
        selectedLocations: newLocations,
      };
    });
  };

  const clearAllFilters = () => {
    setSearchInput({
      title: "",
      location: "",
      selectedCategories: [],
      selectedLocations: [],
    });
    setSearchFilter({
      title: "",
      location: "",
    });
    setIsSearched(false);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs
    .reverse()
    .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <>
      <Navbar />
      <section>
        {/* Filter toggle button (mobile) */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <Filter size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-16">
          {/* Filter Panel */}
          <div
            className={`lg:w-1/4 p-4 rounded-lg  border border-gray-200 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="space-y-6">
              {/* Filters */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Job Title
                </h2>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={searchInput.title}
                  onChange={handleSearchChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Job Location
                </h2>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={searchInput.location}
                  onChange={handleSearchChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Categories
                </h2>
                <ul className="space-y-2">
                  {JobCategories.map((cat, i) => (
                    <li key={i} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${i}`}
                        checked={searchInput.selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="h-4 w-4"
                      />
                      <label
                        htmlFor={`category-${i}`}
                        className="ml-2 text-gray-700"
                      >
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Locations
                </h2>
                <ul className="space-y-2">
                  {JobLocations.map((loc, i) => (
                    <li key={i} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`location-${i}`}
                        checked={searchInput.selectedLocations.includes(loc)}
                        onChange={() => handleLocationToggle(loc)}
                        className="h-4 w-4"
                      />
                      <label
                        htmlFor={`location-${i}`}
                        className="ml-2 text-gray-700"
                      >
                        {loc}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-700 mb-2 capitalize">
                {category === "all"
                  ? "Latest All Jobs"
                  : `Jobs in ${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    }`}
                {filteredJobs.length > 0 && (
                  <span className="ml-2 text-gray-500 text-lg">
                    ({filteredJobs.length}{" "}
                    {filteredJobs.length === 1 ? "job" : "jobs"})
                  </span>
                )}
              </h1>
              <p className="text-gray-600">
                Get your desired job from top companies
              </p>
            </div>

            <div className="space-y-4">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))
              ) : (
                <div className="text-center bg-white p-6 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    No jobs found
                  </h3>
                  <p className="text-gray-500 mb-3">
                    Try adjusting your search filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 text-gray-700 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-md border text-center cursor-pointer ${
                      currentPage === i + 1
                        ? "bg-blue-50 text-blue-500 border-blue-300"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 text-gray-700 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AllJobs;

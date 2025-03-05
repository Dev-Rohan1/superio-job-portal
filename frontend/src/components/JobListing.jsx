import React, { useContext, useState, useEffect } from "react";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import JobList from "./JobList";

const JobListing = () => {
  const { setSearchFilter, searchFilter, isSearched, jobs } =
    useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [categorySelected, setCategorySelected] = useState([]);
  const [locationSelected, setLocationSelected] = useState([]);
  const [filterJobs, setFilterJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setCategorySelected((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category],
    );
  };

  const handleLocationChange = (location) => {
    setLocationSelected((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location],
    );
  };

  useEffect(() => {
    const categorySearch = (job) =>
      categorySelected.length === 0 || categorySelected.includes(job.category);

    const locationSearch = (job) =>
      locationSelected.length === 0 || locationSelected.includes(job.location);

    const titleSearch = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const locationFilter = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilterJobs = jobs
      .slice()
      .reverse()
      .filter((job) => {
        return (
          categorySearch(job) &&
          locationSearch(job) &&
          titleSearch(job) &&
          locationFilter(job)
        );
      });

    setFilterJobs(newFilterJobs);
  }, [jobs, categorySelected, locationSelected, searchFilter]);

  return (
    <section className="mt-16 mb-20">
      <div className="flex gap-10" id="job-list">
        {/* Sidebar */}
        <div className="w-[25%]">
          <div>
            {/* Current Search */}
            {isSearched &&
              (searchFilter.title !== "" || searchFilter.location !== "") && (
                <div>
                  <h2 className="mb-2 text-xl font-medium">Current Search</h2>
                  <div className="flex items-center gap-2">
                    {searchFilter.title !== "" && (
                      <span className="flex items-center gap-2 rounded-md border border-blue-300 bg-blue-50 px-3 py-1">
                        {searchFilter.title}
                        <img
                          src={assets.cross_icon}
                          alt="Clear search title"
                          onClick={() =>
                            setSearchFilter((prev) => ({ ...prev, title: "" }))
                          }
                          className="cursor-pointer"
                        />
                      </span>
                    )}
                    {searchFilter.location !== "" && (
                      <span className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-1">
                        {searchFilter.location}
                        <img
                          src={assets.cross_icon}
                          alt="Clear search location"
                          onClick={() =>
                            setSearchFilter((prev) => ({
                              ...prev,
                              location: "",
                            }))
                          }
                          className="cursor-pointer"
                        />
                      </span>
                    )}
                  </div>
                </div>
              )}

            {/* Search by Categories */}
            <div>
              <h2 className="mb-2 text-xl font-medium">Search by Categories</h2>
              <ul>
                {JobCategories.map((category, index) => (
                  <li key={index} className="mb-2 flex items-center gap-1">
                    <label
                      htmlFor={`category-${index}`}
                      className="flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        checked={categorySelected.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search by Location */}
            <div className="mt-6">
              <h2 className="mb-2 text-xl font-medium">Search by Location</h2>
              <ul>
                {JobLocations.map((location, index) => (
                  <li key={index} className="mb-2 flex items-center gap-1">
                    <label
                      htmlFor={`location-${index}`}
                      className="flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        id={`location-${index}`}
                        checked={locationSelected.includes(location)}
                        onChange={() => handleLocationChange(location)}
                      />
                      {location}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="w-[75%]">
          <h1 className="mb-2 text-3xl">Latest jobs</h1>
          <p className="mb-6">Get your desired job from top companies</p>
          {filterJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                {filterJobs
                  .slice((currentPage - 1) * 6, currentPage * 6)
                  .map((job, index) => (
                    <JobList job={job} key={job.id || index} />
                  ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <img
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  src={assets.left_arrow_icon}
                  alt="Previous page"
                  className="cursor-pointer"
                />

                {Array.from({ length: Math.ceil(filterJobs.length / 6) }).map(
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 ${
                        currentPage === index + 1
                          ? "border border-blue-500 bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ),
                )}

                <img
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(filterJobs.length / 6),
                      ),
                    )
                  }
                  src={assets.right_arrow_icon}
                  alt="Next page"
                  className="cursor-pointer"
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListing;

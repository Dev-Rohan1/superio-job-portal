import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";

const FeaturedJob = () => {
  const { jobs } = useContext(AppContext);

  return (
    <section className="mt-26">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">Featured Jobs</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Know your worth and find the job that qualifies your life
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {jobs
          .reverse()
          .slice(0, 6)
          .map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/all-jobs/all")}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          See more
        </button>
      </div>
    </section>
  );
};

export default FeaturedJob;

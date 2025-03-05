import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const JobList = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border border-gray-300 p-4">
      <img src={assets.company_icon} alt="" />
      <h2 className="mt-1 text-lg font-medium">{job.title}</h2>
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded border border-blue-300 bg-blue-50 px-2 py-1.5 text-sm">
          {job.location}
        </span>
        <span className="rounded border border-red-300 bg-red-50 px-2 py-1.5 text-sm">
          {job.level}
        </span>
      </div>
      <p
        className="mt-2 text-gray-500"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 155) }}
      ></p>
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => navigate(`/job-apply/${job._id}`)}
          className="cursor-pointer rounded bg-blue-500 px-4 py-1.5 text-white"
        >
          Apply now
        </button>
        <button
          onClick={() => navigate(`/job-apply/${job._id}`)}
          className="cursor-pointer rounded border border-gray-300 px-4 py-1.5"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobList;

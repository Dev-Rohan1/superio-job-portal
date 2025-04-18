import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { MapPin, Clock } from "lucide-react";
import moment from "moment";
import kConverter from "k-convert";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const FeaturedJob = () => {
  const { jobs } = useContext(AppContext);
  const navigate = useNavigate();

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
          .map((job) => (
            <div
              onClick={() => navigate(`/apply-job/${job._id}`)}
              key={job._id}
              className="flex gap-4 rounded-lg border border-gray-300 p-5 hover:shadow transition cursor-pointer"
            >
              <img
                className="w-[60px] h-[60px] object-contain"
                src={job.companyId?.logo || assets.company_icon}
                alt={`${job.companyId?.name || "Company"} Logo`}
              />
              <div className="flex-1">
                <h1 className="text-xl text-gray-700 font-semibold mb-1">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.suitcase_icon}
                      alt="Company"
                      className="w-4 h-4"
                    />
                    <span>{job.companyId?.name || "Unknown Company"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{moment(job.date).fromNow()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.money_icon}
                      alt="Salary"
                      className="w-4 h-4"
                    />
                    <span>
                      CTC:{" "}
                      {job.salary
                        ? kConverter.convertTo(job.salary)
                        : "Not disclosed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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

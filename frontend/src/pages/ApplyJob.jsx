import kConverter from "k-convert";
import { Clock, MapPin, User } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import JobCard from "../components/JobCard";

const ApplyJob = () => {
  const [jobData, setJobData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    const data = jobs.find((job) => job._id === id);
    setJobData(data || null);
    setIsLoading(false);
  }, [id, jobs]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Job Not Found</h2>
          <p className="text-gray-600 mt-2">
            The job you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section>
        {/* Job Header */}
        <div className="flex flex-col lg:flex-row justify-between border border-blue-200 rounded-lg bg-blue-50 p-8 lg:p-12  mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 flex-shrink-0 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
              <img
                src={jobData.companyId?.logo || assets.company_icon}
                alt={jobData.companyId?.name || "Company logo"}
                className="w-12 h-12 object-cover"
                onError={(e) => {
                  e.target.src = assets.company_icon;
                }}
              />
            </div>
            <div className="flex-1 mb-6 md:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-3">
                {jobData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1.5">
                  <img src={assets.suitcase_icon} alt="suitcase_icon" />
                  <span>{jobData.companyId?.name || "Unknown Company"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={20} />
                  <span>{jobData.level}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={19} />
                  <span>{jobData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.money_icon} alt="money_icon" />
                  <span>
                    CTC:{" "}
                    {jobData.salary
                      ? kConverter.convertTo(jobData.salary)
                      : "Not disclosed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:mt-6 flex flex-col items-start gap-2.5">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 shadow-sm cursor-pointer">
              Apply now
            </button>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock size={18} />
              <span>Posted {moment(jobData.date).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 xl:w-2/3">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">
              Job Description
            </h1>
            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            ></div>
            <button className="bg-blue-600 mt-6 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 shadow-sm hover:shadow-md cursor-pointer transform hover:-translate-y-0.5">
              Apply now
            </button>
          </div>

          <div className="w-full lg:w-1/2 xl:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Other Jobs at{" "}
              <span className="text-blue-600">{jobData.companyId.name}</span>
            </h2>
            <div className="space-y-4">
              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.companyId.name === jobData.companyId.name
                )
                .filter((job) => true)
                .reverse()
                .slice(0, 3)
                .map((job, index) => (
                  <JobCard job={job} key={index} />
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyJob;

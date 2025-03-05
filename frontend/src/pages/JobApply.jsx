import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { assets } from "../assets/assets";
import kConverter from "k-convert";
import moment from "moment";
import JobList from "../components/JobList";

const JobApply = () => {
  const { jobs } = useContext(AppContext);
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    if (!Array.isArray(jobs) || !id) return;

    const data = jobs.find((job) => job._id === id);
    setJobData(data || null);
  }, [id, jobs]);

  if (!jobData) {
    return <div>Loading job details...</div>;
  }

  return (
    <section>
      <div className="flex items-center justify-between rounded-xl border border-blue-300 bg-blue-50 px-16 py-14">
        <div className="flex items-center gap-4">
          <div className="flex h-26 w-26 items-center justify-center rounded-lg border border-gray-200 bg-white">
            <img
              className="w-[60px]"
              src={assets.company_icon}
              alt="Company Logo"
            />
          </div>
          <div>
            <h2 className="mb-3 text-3xl font-medium text-gray-700">
              {jobData.title}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src={assets.suitcase_icon} alt="Company Icon" />
                <span>{jobData.companyId?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.location_icon} alt="Location Icon" />
                <span>{jobData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.person_icon} alt="Job Level Icon" />
                <span>{jobData.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.money_icon} alt="Salary Icon" />
                <span>CTC: {kConverter.convertTo(jobData.salary)}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="rounded bg-blue-500 px-5 py-2 text-white">
            Apply now
          </button>
          <span className="mt-2 block">
            Posted {moment(jobData.date).fromNow()}
          </span>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="w-full">
          <h3 className="mt-10 mb-2 text-2xl font-medium">Job description</h3>
          <p className="mb-6">
            Join our technology team as a Cloud Engineer, where you will be
            responsible for designing and managing our cloud infrastructure. You
            will collaborate with development and operations teams to ensure the
            efficient deployment and scaling of applications.
          </p>
          <div dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
          <button className="mt-6 mb-10 rounded bg-blue-500 px-5 py-2 text-white">
            Apply now
          </button>
        </div>

        <div className="w-[50%]">
          {jobs
            .filter(
              (job) =>
                job._id !== jobData._id &&
                job.companyId.name === jobData.companyId.name,
            )
            .filter((job) => true)
            .slice(0, 3)
            .map((job, index) => {
              return <JobList key={index} job={job} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default JobApply;

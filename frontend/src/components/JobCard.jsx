import React from "react";
import moment from "moment";
import kConverter from "k-convert";
import { assets } from "../assets/assets";
import { MapPin, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      key={job._id}
      onClick={() => {
        navigate(`/apply-job/${job._id}`);
        scrollTo(0, 0);
      }}
      className="flex gap-4 rounded-lg border border-gray-200 p-5 hover:shadow transition cursor-pointer"
    >
      <img
        className="w-[50px] h-[50px] object-contain"
        src={job.companyId?.image || assets.company_icon}
        alt={`${job.companyId?.name || "Company"} Logo`}
      />
      <div className="flex-1">
        <h1 className="text-xl text-gray-700 font-semibold mb-1">
          {job.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-3">
          <div className="flex items-center gap-2">
            <img src={assets.suitcase_icon} alt="Company" />
            <span>{job.companyId?.name || "Unknown Company"}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={20} />
            <span>{job.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={19} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={19} />
            <span>{moment(job.date).fromNow()}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.money_icon} alt="Salary" />
            <span>
              CTC:{" "}
              {job.salary ? kConverter.convertTo(job.salary) : "Not disclosed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

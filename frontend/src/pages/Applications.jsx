import moment from "moment";
import React, { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const handleSaveResume = () => {
    // Add logic to save the resume (e.g., upload to server)
    console.log("Resume saved:", resume);
    setIsEdit(false); // Exit edit mode after saving
  };

  return (
    <section className="p-4">
      <div>
        {/* Resume Section */}
        <h2 className="mb-4 text-lg font-medium">Your Resume</h2>
        {isEdit ? (
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <span className="cursor-pointer rounded border border-blue-300 bg-blue-50 px-4 py-1.5 text-sm">
                Select Resume
              </span>
              <input
                onChange={(e) => setResume(e.target.files[0])}
                type="file"
                accept="application/pdf"
                hidden
              />
              <img
                src={assets.profile_upload_icon}
                alt="Upload Icon"
                className="h-5 w-5"
              />
            </label>
            <button
              onClick={handleSaveResume}
              className="rounded bg-blue-500 px-6 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button className="cursor-pointer rounded bg-blue-500 px-6 py-2 text-sm text-white transition-colors hover:bg-blue-600">
              View Resume
            </button>
            <button
              onClick={() => setIsEdit(true)}
              className="cursor-pointer rounded border border-gray-300 px-6 py-2 text-sm transition-colors hover:bg-gray-50"
            >
              Edit
            </button>
          </div>
        )}

        {/* Jobs Applied Section */}
        <h2 className="mt-10 mb-4 text-lg font-medium">Jobs Applied</h2>
        <table
          style={{ maxWidth: "95%" }}
          className="mx-auto w-full rounded-md border border-gray-300"
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Company
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Job Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => (
              <tr key={index} className="transition-colors hover:bg-gray-50">
                <td className="flex items-center gap-2 px-4 py-3 text-gray-700">
                  <img
                    src={assets.company_icon}
                    alt="Company Icon"
                    className="h-6 w-6"
                  />
                  {job.company}
                </td>
                <td className="px-4 py-3 text-gray-700">{job.title}</td>
                <td className="px-4 py-3 text-gray-700">{job.location}</td>
                <td className="px-4 py-3 text-gray-700">
                  {moment(job.date).format("ll")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded px-3 py-1 text-sm font-medium ${
                      job.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : job.status === "Pending"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Applications;

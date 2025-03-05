import React from "react";
import { assets, manageJobsData } from "../assets/assets";
import moment from "moment";

const ManageJob = () => {
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
                Job Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">
                Applications
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">
                Visible
              </th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-700">{job._id}</td>
                <td className="px-4 py-3 text-gray-700">
                  {" "}
                  {moment(job.date).format("ll")}
                </td>
                <td className="px-4 py-3 text-gray-700">{job.location}</td>
                <td className="px-4 py-3 text-gray-700">
                  {moment(job.date).format("ll")}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {job.applicants}
                </td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageJob;

import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";

const ManageJobs = () => {
  return (
    <section>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicants
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visible
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {manageJobsData.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                  {job.title}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {job.location}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {moment(job.date).format("ll")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-medium">
                    {job.applicants || 0}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageJobs;

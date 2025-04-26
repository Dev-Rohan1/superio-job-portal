import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast"; // ✅ Make sure toast is imported

const ManageJobs = () => {
  const [manageJobData, setManageJobData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchManageJobsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/company/company/posted-jobs`,
        {
          headers: {
            token: companyToken,
          },
        }
      );
      if (data.success) {
        setManageJobData(data.jobData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/company/change-visiblity`,
        {
          id,
        },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchManageJobsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchManageJobsData();
  }, []);

  useEffect(() => {
    document.title = "Superio - Job Portal | Dashboard";
  }, []);

  return (
    <section>
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader />
        </div>
      ) : !manageJobData || manageJobData.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No jobs found.</div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          {" "}
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
              {manageJobData.reverse().map((job, index) => (
                <tr
                  key={job._id}
                  className="hover:bg-gray-50 transition-colors"
                >
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
                    <input
                      onChange={() => changeJobVisiblity(job._id)}
                      type="checkbox"
                      checked={job.visible}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageJobs;

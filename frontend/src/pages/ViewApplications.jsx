import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const ViewApplications = () => {
  const [viewApplicationsPageData, setViewApplicationsPageData] =
    useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchViewApplicationsPageData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/company/view-applications`,
        {},
        {
          headers: { token: companyToken },
        }
      );
      if (data?.success) {
        setViewApplicationsPageData(data.viewApplicationData || []);
      } else {
        toast.error(data?.message || "Failed to load applications.");
      }
    } catch (error) {
      console.error(error?.response?.data || "Error fetching applications");
      toast.error(
        error?.response?.data?.message || "Failed to fetch applications"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdatingStatus(id);
    try {
      const { data } = await axios.post(
        `${backendUrl}/company/change-status`,
        { id, status },
        {
          headers: { token: companyToken },
        }
      );

      if (data?.success) {
        toast.success(data?.message || "Status updated successfully.");
        await fetchViewApplicationsPageData(); // Reload applications to reflect the update
      } else {
        toast.error(data?.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.response?.data?.message || "Error updating status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    document.title = "Superio - Job Portal | Dashboard";
  }, []);

  useEffect(() => {
    fetchViewApplicationsPageData();
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader />
        </div>
      ) : !viewApplicationsPageData || viewApplicationsPageData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No applications found.
        </div>
      ) : (
        <div className="shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                    Job Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {viewApplicationsPageData.reverse().map((job, index) => (
                  <tr
                    key={job._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <img
                          src={job?.userId?.image || assets.default_profile}
                          alt={job?.userId?.name || "Applicant"}
                          className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                          onError={(e) =>
                            (e.target.src = assets.default_profile)
                          }
                        />
                        <div className="ml-3 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {job?.userId?.name || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 max-w-[180px] truncate">
                      {job?.jobId?.title}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">
                      {job?.jobId?.location}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      {job?.date ? moment(job.date).format("ll") : "N/A"}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {job?.userId?.resume ? (
                        <a
                          href={job.userId.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                          aria-label="View resume"
                        >
                          View
                          <img
                            src={assets.resume_download_icon}
                            alt=""
                            className="ml-1.5 h-3 w-3"
                          />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">No resume</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {updatingStatus === job._id ? (
                        <div className="flex justify-center">
                          <LoaderCircle className="animate-spin h-5 w-5 text-gray-500" />
                        </div>
                      ) : job.status === "Pending" ? (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(job._id, "Accepted")
                            }
                            className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded cursor-pointer"
                            disabled={updatingStatus === job._id}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(job._id, "Rejected")
                            }
                            className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded cursor-pointer"
                            disabled={updatingStatus === job._id}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            job.status === "Accepted"
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewApplications;

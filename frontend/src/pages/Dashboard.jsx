import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  return (
    <section>
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 min-h-screen w-64 border-r-2 border-gray-300">
          <ul>
            <li className="px-4 py-2">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "font-bold text-blue-500" : ""}`
                }
                to="/dashboard/manage-job"
              >
                <img src={assets.home_icon} alt="Manage Job" />
                Manage Job
              </NavLink>
            </li>
            <li className="px-4 py-2">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "font-bold text-blue-500" : ""}`
                }
                to="/dashboard/add-job"
              >
                <img src={assets.add_icon} alt="Add Job" />
                Add Job
              </NavLink>
            </li>
            <li className="px-4 py-2">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "font-bold text-blue-500" : ""}`
                }
                to="/dashboard/view-application"
              >
                <img src={assets.person_tick_icon} alt="View Applications" />
                View Applications
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="w-full pl-6">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const sidebarLinks = [
    {
      id: "manage-jobs",
      name: "Manage Jobs",
      path: "/dashboard/manage-jobs",
      icon: assets.home_icon,
    },
    {
      id: "add-job",
      name: "Add Job",
      path: "/dashboard/add-job",
      icon: assets.add_icon,
    },
    {
      id: "view-applications",
      name: "View Applications",
      path: "/dashboard/view-applications",
      icon: assets.person_tick_icon,
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      navigate("/dashboard/manage-jobs");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b border-gray-200 py-3 bg-white sticky top-0 z-10">
        <Link to="/" className="flex items-center">
          <img
            className="w-[120px] md:w-[140px]"
            src={assets.logo}
            alt="Lecruiter Logo"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-5">
          <p className="text-gray-600">Hi! Admin</p>
          <button
            className="border border-gray-300 rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="md:w-64 w-16 border-r border-gray-200 bg-white flex flex-col shrink-0">
          <nav className="pt-4 rounded-l-2xl">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.id}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 gap-3 transition-colors rounded-l-md ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-indigo-50 border-indigo-500 text-indigo-600 font-medium"
                      : "text-gray-600"
                  }`
                }
                end={item.path === "/dashboard/manage-jobs"}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="w-5 h-5"
                  aria-hidden="true"
                />
                <span className="md:block hidden">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto pl-4 pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

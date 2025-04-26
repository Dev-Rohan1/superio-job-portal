import { useContext, useEffect } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { LoaderCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Added this

  const { companyData, companyLoading } = useContext(AppContext);

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
    localStorage.removeItem("companyToken");
    toast.success("Logout successfully");
    navigate("/recruiter-login");
  };

  useEffect(() => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      document.title = "Superio - Job Portal | Dashboard";
      navigate("/dashboard/manage-jobs");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b border-gray-200 py-3 bg-white sticky top-0 z-10 px-4">
        <Link to="/dashboard" className="flex items-center">
          <img className="w-[120px]" src={assets.logo} alt="Lecruiter Logo" />
        </Link>
        {companyLoading ? (
          <LoaderCircle className="animate-spin text-gray-500" />
        ) : companyData ? (
          <div className="flex items-center gap-4 md:gap-3">
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Hi, {companyData?.name}</p>
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={companyData?.image}
                alt={`${companyData?.name}'s profile`}
              />
            </div>
            <button
              className="w-[30px] h-[30px] flex items-center justify-center rounded bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut size={18} className="text-gray-700" />
            </button>
          </div>
        ) : null}
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
                  alt={`${item.name} icon`}
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

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState(jobsData);

  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(!!userToken);

  const [companyToken, setCompanyToken] = useState(
    localStorage.getItem("companyToken")
  );
  const [companyData, setCompanyData] = useState(null);
  const [isCompanyLogin, setIsCompanyLogin] = useState(!!companyToken);
  const [companyLoading, setIsCompanyLoading] = useState(false);

  // Fetch user data
  const fetchUserData = async () => {
    if (!userToken) return;
    setUserDataLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/user/user-data`, {
        headers: { token: userToken },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch user data."
      );
    } finally {
      setUserDataLoading(false);
    }
  };

  // Fetch company data
  const fetchCompanyData = async () => {
    if (!companyToken) return;
    setIsCompanyLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/company/company-data`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.companyData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch company data."
      );
    } finally {
      setIsCompanyLoading(false);
    }
  };

  // Token/Session management
  useEffect(() => {
    if (userToken) {
      setIsLogin(true);
      fetchUserData();
    } else {
      setUserData(null);
      setIsLogin(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (companyToken) {
      setIsCompanyLogin(true);
      fetchCompanyData();
    } else {
      setCompanyData(null);
      setIsCompanyLogin(false);
    }
  }, [companyToken]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    backendUrl,
    userData,
    setUserData,
    userToken,
    setUserToken,
    userDataLoading,
    setUserDataLoading,
    isLogin,
    setIsLogin,
    fetchUserData,
    companyData,
    setCompanyData,
    companyToken,
    setCompanyToken,
    isCompanyLogin,
    setIsCompanyLogin,
    fetchCompanyData,
    companyLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

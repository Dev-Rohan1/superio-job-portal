import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppLayouts from "./layouts/AppLayouts";
import AddJob from "./pages/AddJob";
import Applications from "./pages/Applications";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import JobApply from "./pages/JobApply";
import ManageJob from "./pages/ManageJob";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import ViewApplication from "./pages/ViewApplication";
import "quill/dist/quill.snow.css";

const App = () => {
  return (
    <AppLayouts>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/job-apply/:id" element={<JobApply />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
          <Route path="/recruiter-signup" element={<RecruiterSignup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="view-application" element={<ViewApplication />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-job" element={<ManageJob />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppLayouts>
  );
};

export default App;

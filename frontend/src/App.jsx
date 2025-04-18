import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import About from "./pages/About";
import AllJobs from "./pages/AllJobs";
import Home from "./pages/Home";
import Terms from "./pages/Terms";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-jobs/:category" element={<AllJobs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AppLayout>
  );
};

export default App;

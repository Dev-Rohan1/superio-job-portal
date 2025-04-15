import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import FindJobs from "./pages/FindJobs";
import About from "./pages/About";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateSignup from "./pages/CandidateSignup";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/candidate-signup" element={<CandidateSignup />} />
      </Routes>
    </AppLayout>
  );
};

export default App;

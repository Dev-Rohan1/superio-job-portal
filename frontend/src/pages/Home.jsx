import React, { useContext, useEffect } from "react";
import FeaturedJob from "../components/FeaturedJob";
import Hero from "../components/Hero";
import JobCategoryt from "../components/JobCategory";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Counter from "../components/Counter";
import Download from "../components/Download";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { fetchJobsData } = useContext(AppContext);

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <JobCategoryt />
      <FeaturedJob />
      <Testimonials />
      <Counter />
      <Download />
      <Footer />
    </>
  );
};

export default Home;

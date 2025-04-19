import React from "react";
import FeaturedJob from "../components/FeaturedJob";
import Hero from "../components/Hero";
import JobCategoryt from "../components/JobCategory";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Counter from "../components/Counter";
import Download from "../components/Download";
import Footer from "../components/Footer";

const Home = () => {
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

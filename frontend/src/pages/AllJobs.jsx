import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function AllJobs() {
  const { category } = useParams();

  console.log(category);

  return (
    <>
      <Navbar />
      <div>AllJobs</div>
    </>
  );
}

export default AllJobs;

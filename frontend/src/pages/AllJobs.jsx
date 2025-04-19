import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function AllJobs() {
  const { category } = useParams();

  

  
  return (
    <>
      <Navbar />
      <section>
        <div>
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  );
}

export default AllJobs;

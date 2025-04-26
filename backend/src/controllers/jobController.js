import Job from "../models/Job.js";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate(
      "companyId",
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      jobData: jobs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Job fetched failed",
    });
  }
};

export default getAllJobs;

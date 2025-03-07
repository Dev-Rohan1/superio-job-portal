import jobModel from "../models/job.js";

export const getJobs = async (req, res) => {
  try {
    const jobdata = await jobModel.find({ visibility: true });

    res.json({ succes: true, jobdata });
  } catch (error) {
    res.json({ succes: false, message: error });
  }
};

export const getJobById = async (req, res) => {
  res.send("get job by id");
};

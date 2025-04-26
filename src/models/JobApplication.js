import mongoose from "mongoose";

const jobApplicationSchema = mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  companyId: { type: mongoose.Types.ObjectId, required: true, ref: "Company" },
  jobId: { type: mongoose.Types.ObjectId, required: true, ref: "Job" },
  status: { type: String, default: "Pending" },
  date: { type: Number, required: true },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;

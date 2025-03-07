import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
});

const jobModel = mongoose.model("job", JobSchema);

export default jobModel;

import companyModel from "../models/company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utility/generateToken.js";
import jobModel from "../models/job.js";

// Register company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    const existingCompany = await companyModel.findOne({ email });
    if (existingCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageFileUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await companyModel.create({
      name,
      email,
      image: imageFileUpload.secure_url,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      data: { company, token: generateToken(company._id) },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

// Login company
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    const company = await companyModel.findOne({ email });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const isHashedPassword = await bcrypt.compare(password, company.password);

    if (!isHashedPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Password incorrect" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { company, token: generateToken(company._id) },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get company data
export const getCompanyData = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    return res.status(200).json({ success: true, data: req.company });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch company data" });
  }
};

// Post new job
export const postJob = async (req, res) => {
  const { title, description, location, category, level, salary } = req.body;

  if (!req.company) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const companyId = req.company._id;

  console.log(companyId);

  try {
    const job = await jobModel.create({
      title,
      description,
      location,
      category,
      level,
      salary,
      date: Date.now(),
      companyId,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: job,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Job post failed" });
  }
};

// Get company job applicants (to be implemented)
export const getCompanyJobApplicants = async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
};

// Get company posted jobs
export const getCompanyPostedJob = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const jobs = await jobModel.find({ companyId: req.company._id });

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch jobs" });
  }
};

// Change job application status (to be implemented)
export const changeJobApplicationStatus = async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
};

// Change job visibility (to be implemented)
export const changeJobVisibility = async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
};

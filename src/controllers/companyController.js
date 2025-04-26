import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import generateToken from "../utils/generateToken.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Enter your name" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Enter your email" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Enter your password" });
    }

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Upload your logo" });
    }

    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res
        .status(409)
        .json({ success: false, message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = new Company({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    await company.save();

    const token = await generateToken(company._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      companyData: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const company = await Company.findOne({ email });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = await generateToken(company._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      companyData: company,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const fetchCompanyData = async (req, res) => {
  try {
    const company = req.companyData;

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company data fetched successfully",
      companyData: company,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch company data",
    });
  }
};

export const postJob = async (req, res) => {
  try {
    const { title, description, location, level, salary, category } = req.body;

    if (!title || !description || !location || !level || !salary || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const companyId = req.companyData._id;

    const job = new Job({
      title,
      description,
      location,
      level,
      salary,
      category,
      companyId,
      date: Date.now(),
    });

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Job posting failed",
    });
  }
};

export const getCompanyPostedAllJobs = async (req, res) => {
  try {
    const companyId = req.companyData._id;

    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });

        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobData: jobsData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Job fetching failed",
    });
  }
};

export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.companyData._id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.companyId.toString() === companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Visibility changed",
    });
  } catch (error) {
    console.error("Error changing job visibility:", error);
    return res.status(500).json({
      success: false,
      message: "Visibility change failed",
    });
  }
};

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.companyData._id;

    const applicants = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location date status");

    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      viewApplicationData: applicants,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applicants",
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Application ID and status are required",
      });
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status changed successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to change status",
    });
  }
};

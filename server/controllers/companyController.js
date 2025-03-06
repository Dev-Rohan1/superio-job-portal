import companyModel from "../models/company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utility/generateToken.js";

// Register company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const existingCompany = await companyModel.findOne({ email });
    if (existingCompany) {
      return res.json({ success: false, message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageFileUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await companyModel.create({
      name,
      email,
      image: imageFileUpload.secure_url,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      company,
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

// Login company

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    // Await the result to get the company document
    const company = await companyModel.findOne({ email });

    // Check if company exists
    if (!company) {
      return res.json({
        success: false,
        message: "Company not found",
      });
    }

    // Compare the password with the hashed password
    const isHashedPassword = await bcrypt.compare(password, company.password);

    if (!isHashedPassword) {
      return res.json({
        success: false,
        message: "Password incorrect",
      });
    }

    // Generate and send the token along with the company data
    res.json({ success: true, company, token: generateToken(company._id) });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get company data
export const getCompanyData = async (req, res) => {};

// Post new job
export const postJob = async (req, res) => {};

// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {};

// Get company posted job
export const getCompanyPostedJob = async (req, res) => {};

// Change job application status
export const changeJobApplicationStatus = async (req, res) => {};

// Change job visibility
export const changeJobVisibility = async (req, res) => {};

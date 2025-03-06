import express from "express";
import {
  changeJobApplicationStatus,
  changeJobVisibility, // Fixed typo here
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJob,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register-company", upload.single("image"), registerCompany);
router.post("/login-company", loginCompany);
router.get("/company", getCompanyData); // If you need an ID, you should change this to something like "/company/:id"
router.post("/post-job", postJob);
router.get("/applicant", getCompanyJobApplicants);
router.get("/job-list", getCompanyPostedJob);
router.post("/change-status", changeJobApplicationStatus);
router.post("/change-visibility", changeJobVisibility); // Fixed typo here

export default router;

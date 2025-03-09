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
import protectedCompany from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register-company", upload.single("image"), registerCompany);
router.post("/login-company", loginCompany);
router.get("/company", protectedCompany, getCompanyData); // If you need an ID, you should change this to something like "/company/:id"
router.post("/post-job", protectedCompany, postJob);
router.get("/applicant", protectedCompany, getCompanyJobApplicants);
router.get("/job-list", protectedCompany, getCompanyPostedJob);
router.post("/change-status", protectedCompany, changeJobApplicationStatus);
router.post("/change-visibility", protectedCompany, changeJobVisibility); // Fixed typo here

export default router;

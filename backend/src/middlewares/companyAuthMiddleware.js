import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

const companyAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized login again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findById(decodedToken.id).select("-password");

    if (!company) {
      return res.status(404).json({ message: "User not found" });
    }

    req.companyData = company;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized login again" });
  }
};

export default companyAuthMiddleware;

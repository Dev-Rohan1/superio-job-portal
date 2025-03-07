import jwt from "jsonwebtoken";
import companyModel from "../models/company.js";

const protectedCompany = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // Handle Bearer token format
    const extractedToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decodedToken = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);

    req.company = await companyModel
      .findById(decodedToken.id)
      .select("-password");

    if (!req.company) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default protectedCompany;

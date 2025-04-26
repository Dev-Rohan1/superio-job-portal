import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized login again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userData = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized login again" });
  }
};

export default userAuthMiddleware;

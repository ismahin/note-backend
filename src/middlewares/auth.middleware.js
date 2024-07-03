import { User } from "../models/user.model.js";
import {Employee} from "../models/employee.model.js"
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWTForUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.heder("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});

const verifyJWTForAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.heder("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const employee = await Employee.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!employee) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.employee = employee;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});

export { verifyJWTForAdmin, verifyJWTForUser };

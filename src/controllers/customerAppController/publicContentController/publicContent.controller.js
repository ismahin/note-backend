import { asyncHandler } from "../../../utils/asyncHandler.js";
import ApiError from "../../../utils/apiError.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { Content } from "../../../models/content.model.js";

const allContent = asyncHandler(async (req, res) => {
  const getAllContent = await Content.find({isDeleted: false})
  if (!getAllContent) {
    throw new ApiError(400, "Couldn't get contents");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, getAllContent, "Content fetched successfully"));
});

export { allContent };

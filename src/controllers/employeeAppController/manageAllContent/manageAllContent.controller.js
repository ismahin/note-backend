import { asyncHandler } from "../../../utils/asyncHandler.js";
import ApiError from "../../../utils/apiError.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { Content } from "../../../models/content.model.js";

const deleteContent = asyncHandler(async (req, res) => {
  const contentId = req.params?.id;
  const content = await Content.findById(contentId);
  content.isDeleted = true;
  const isDeleted = await content.save();
  if (!isDeleted) {
    throw new ApiError(400, "Couldn't delete the contain");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully deleted content"));
});

export {deleteContent}
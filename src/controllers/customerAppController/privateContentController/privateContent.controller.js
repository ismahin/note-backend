import { asyncHandler } from "../../../utils/asyncHandler.js";
import { Content } from "../../../models/content.model.js";
import ApiError from "../../../utils/apiError.js";
import { ApiResponse } from "../../../utils/apiResponse.js";

const createContent = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(401, "Title required!");
  }
  const createdBy = req.user._id;
  const content = await Content.create({
    createdBy,
    title,
    description,
  });

  const contentCreated = await Content.findById(content._id);
  if (!contentCreated) {
    throw new ApiError(500, "Content is not created!!");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        title: title,
      },
      "Content has been created!!"
    )
  );
});

const editContent = asyncHandler(async (req, res) => {
  const { newTitle, newDescription } = req.body;


  console.log(newDescription, newTitle);
  
  const contentId = req.params.id;
  const user = req.user?._id;

  const content = await Content.findById({ _id: contentId });

  if (!(content.createdBy !== user)) {
    throw new (400, "This content is not created by this user")();
  }

  const updatedContent = await Content.findByIdAndUpdate(
    { _id: contentId },
    { title:newTitle, description:newDescription },
    { new: true }
  );

  if (!updatedContent) {
    throw new ApiError(400, "Content update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedContent, "Updated Successfully"));
});

const getAllPrivateContent = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const allPrivateContent = await Content.find({ createdBy: user });
  console.log(allPrivateContent);
  return res
    .status(200)
    .json(new ApiResponse(200, allPrivateContent, "Success"));
});

const deleteOneContent = asyncHandler(async (req, res) => {
  const contentId = req.params.id;
  const content = await Content.findById(contentId);
  const user = await req.user?._id;
  console.log(`logged in user: ${user}`);
  console.log(`content crated by : ${content.createdBy}`);
  if (!(content.createdBy !== user)) {
    throw new ApiError(400, "This content not belong to this user!!");
  }

  const isDeleted = await Content.findByIdAndDelete(content._id);
  if (!isDeleted) {
    throw new ApiError(400, "Couldn't delete the content");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Success"));
});
export { createContent, editContent, getAllPrivateContent, deleteOneContent };

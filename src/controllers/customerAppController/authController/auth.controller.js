import {asyncHandler} from "../../../utils/asyncHandler.js"
import apiError from "../../../utils/apiError.js"
import {User} from "../../../models/user.model.js"
import {uploadFile} from "../../../utils/fileUpload.js"
import {ApiResponse} from "../../../utils/apiResponse.js"
const generateAccessTokenRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if(!user){
      throw new apiError(400,"Can not find the user ID")
    }
    const accessToken = await user.generateAccessToken();
    if(!accessToken){
      throw new apiError(400,"Can not Generate Access Token for the user")
    }
    const refreshToken = await user.generateRefreshToken();
    if(!refreshToken){
      throw new apiError(400,"Can not Refresh Access Token for the user")
    }
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      `Something wrong with generate while generating token Error: ${error}`
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  console.log(`User Name is ${username} 
    Email address is ${email}
    Full name is ${fullName}
    Password is ${password}`);

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are required");
  }

  const userRegistered = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userRegistered) {
    throw new apiError(409, "Email or user name already registered!!!");
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLocalPath && !coverImageLocalPath) {
  //   throw new apiError(400, "Avatar image and cover image both are required");
  // }
  // const avatar = await uploadFile(avatarLocalPath);
  // const coverImage = await uploadFile(coverImageLocalPath);

  // if (!avatar && !coverImage) {
  //   throw new apiError(400, "Avatar and Cover Image File is required!!");
  // }

  const user = await User.create({
    fullName,
    // avatar: avatar.url,
    // coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(
      500,
      "Cannot find the user by id. Something went wrong while register the user"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User register Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const allReadyLoggedIn = req.cookies.accessToken
if(allReadyLoggedIn){
throw new apiError(400,"All ready logged In")
}
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim === "")) {
    throw new apiError(400, "All field is required!!!");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new apiError(404, "Cannot find the user.");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user?._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully"));
});

export { registerUser, loginUser, logOutUser };

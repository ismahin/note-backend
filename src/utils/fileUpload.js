import { v2 } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import exp from "constants";
dotenv.config();

const uploadFile = async (localFilePath) => {
  try {
    if (!localFilePath) return "Can not get file path!!";
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log(`File has been upload on ${response.url}`);
    fs.unlink(localFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};


v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { uploadFile };

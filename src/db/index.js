import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const DBInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `MongoDB is connected !!!. DB Host: ${DBInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    throw error;
    process.exit(1);
  }
};

export default connectDB;

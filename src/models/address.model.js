import mongoose from "mongoose";

const userAddress = new mongoose.Schema({
  userHome: {
    type: String,
    required: true,
  },
  userRoadNo: {
    type: String,
    required: true,
  },
  userPostOffice: {
    type: String,
    required: true,
  },
  userCity: {
    type: String,
    required: true,
  },
  userDistrict: {
    type: String,
    required: true,
  },
  userCountry: {
    type: String,
    required: true,
  },
});

export const Address = mongoose.model("Address", userAddress);

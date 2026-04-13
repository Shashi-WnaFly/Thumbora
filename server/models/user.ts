import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      unique: true,
      lowercase: true,
      validate: (value: string) => {
        if (!validator.isEmail(value)) throw new Error("Email is Invalid!");
      },
    },
    password: {
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 20,
      validate: (value: string) => {
        if (validator.isStrongPassword(value))
          throw new Error("Password is Invalid!");
      },
    },
    age: {
      type: Number,
      min: 12,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    verifyOtp: {
      type: String,
      default: null,
      trim: true,
      validate: (value: String) => {
        if (value.length !== 6) throw new Error("Otp is Invalid!");
      },
    },
    otpExpireAt: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      validate: (value: string) => {
        if (!validator.isURL(value)) throw new Error("Avatar Url is Invalid!");
      },
    },
  },
  { timestamps: true },
);

export default new mongoose.Model("User", userSchema);

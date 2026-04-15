import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { IUser } from "../types.js";
import jwt from "jsonwebtoken";

const userSchema = new Schema<IUser>(
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
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate: (value: string) => {
        if (!validator.isStrongPassword(value))
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
      minLength: 6,
      maxLength: 6
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

interface IUserJWT extends Document {
  _id: string;
}

userSchema.methods.getJWT = async function (this: IUserJWT): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId: this._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
      (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      },
    );
  });
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

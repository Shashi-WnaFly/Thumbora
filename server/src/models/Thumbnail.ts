import mongoose, { Schema } from "mongoose";
import { IThumbnail } from "../types/types.js";
import validator from "validator";

const ThumbnailSchema = new Schema<IThumbnail>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    style: {
      type: String,
      required: true,
      enum: [
        "Bold & Graphic",
        "Tech/Futuristic",
        "Minimalist",
        "Photorealistic",
        "Illustrated",
      ],
    },
    aspectRatio: {
      type: String,
      enum: ["16:9", "1:1", "9:16"],
      default: "9:16"
    },
    colorScheme: {
      type: String,
      enum: [
        "vibrant",
        "sunset",
        "forest",
        "neon",
        "purple",
        "monochrome",
        "ocean",
        "pastel",
      ],
    },
    textOverlay: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "",
      validate: (value: string) => {
        if (!validator.isURL(value)) throw new Error("Invalid image url!!");
      },
    },
    promptUsed: {
      type: String,
    },
    userPrompt: {
      type: String,
    },
    isGenerating: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Thumbnail =
  mongoose.models.Thumbnail ||
  mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema);

export default Thumbnail;

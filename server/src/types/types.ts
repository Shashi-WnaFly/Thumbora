import mongoose from "mongoose";

export interface IUser extends Document {
  userName: string;
  emailId: string;
  password: string;
  age?: number;
  gender?: IGender;
  verifyOtp?: string;
  otpExpireAt?: Date;
  isVerified?: boolean;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISafeUser extends Document {
  userName?: string;
  emailId?: string;
  age?: number;
  gender?: IGender;
  isVerified?: boolean;
  avatarUrl?: string;
}

export type IGender = "male" | "female" | "other";

export interface IThumbnail extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  style: IStyle;
  aspectRatio?: IAspectRatio;
  colorScheme?: IStyle;
  textOverlay?: boolean;
  imageUrl?: string;
  promptUsed?: string;
  userPrompt?: string;
  isGenerating?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IColor =
  | "vibrant"
  | "sunset"
  | "forest"
  | "neon"
  | "purple"
  | "monochrome"
  | "ocean"
  | "pastel";
export type IAspectRatio = "16:9" | "1:1" | "9:16";
export type IStyle =
  | "Bold & Graphic"
  | "Tech/Futuristic"
  | "Minimalist"
  | "Photorealistic"
  | "Illustrated";

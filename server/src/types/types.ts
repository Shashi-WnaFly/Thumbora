import mongoose from "mongoose";

export interface IUser extends Document {
  userName: string;
  emailId: string;
  password: string;
  age?: number;
  gender?: IGender;
  verifyOtp?: string;
  subscriptionType?: string;
  isPremium?: boolean;
  otpExpireAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpireAt?: Date;
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

export interface IThumbnail extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  style: IStyle;
  aspectRatio?: IAspectRatio;
  colorScheme?: IColor;
  textOverlay?: boolean;
  imageUrl?: string;
  promptUsed?: string;
  userPrompt?: string;
  isGenerating?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPayment extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  orderId: string;
  paymentId: string;
  status: string;
  notes: INotes;
  receipt: string;
  amount: number;
  currency: string;
}

export interface INotes extends Document {
  userName: string;
  emailId: string;
  subscriptionType: string;
}

export type IGender = "male" | "female" | "other";

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

export type IsubscriptionType = "Basic" | "Pro" | "Enterprise";

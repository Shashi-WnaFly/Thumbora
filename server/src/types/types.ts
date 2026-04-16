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
  userName: string;
  emailId: string;
  age?: number;
  gender?: IGender;
  isVerified?: boolean;
  avatarUrl?: string;
}

export type IGender = "male" | "female" | "other";

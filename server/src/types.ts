export interface IUser extends Document {
  userName: string;
  emailId: string;
  password: string;
  age?: number;
  gender?: ["male", "female", "other"];
  verifyOtp?: string;
  otpExpireAt?: Date;
  isVerified?: boolean;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// export type Igender = "male" | "female" | "other";

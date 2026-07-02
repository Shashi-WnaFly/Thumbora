import { IUser, ISafeUser } from "../types/types.js";

export const safeUser = (user: IUser): ISafeUser =>
  ({
    userName: user.userName,
    emailId: user.emailId,
    age: user.age,
    gender: user.gender,
    isVerified: user.isVerified,
    avatarUrl: user.avatarUrl,
  }) as ISafeUser;

export const otpCooldownKey = (email: string) => `otp:cooldown:${email}`;

export const otpDailyLimitKey = (email: string) => `otp:dailyLimit:${email}`;

export const otpVerifyAttemptsKey = (email: string) =>
  `otp:verifyAttempts:${email}`;

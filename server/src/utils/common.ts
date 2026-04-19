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

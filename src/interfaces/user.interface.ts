export default interface User {
  email: string;
  // userName: string;
  // userRole: number;
  refreshToken: string;
  password: string;
  salt: string;
  // coverImage?: string;
  // firstName: string;
  // lastName: string;
  // accountBlocked: boolean;
  // loginCount: number;
  // emailVerified: boolean;
  // emailVerifiedTime?: Date;
  // loggedInStatus: boolean;
  created?: Date;
  updated?: Date;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  image: string;
  activationCode: number;
  isVerified: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
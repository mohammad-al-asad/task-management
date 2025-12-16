export type Task = {
  _id: string;
  title: string;
  description: string;
  creator_email: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};
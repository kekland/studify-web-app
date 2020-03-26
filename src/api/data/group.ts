import { IUser } from "./user";

export interface IGroup extends IGroupMinimal {
  creator: IUser;
  created: Date;
  updated: Date;
}

export interface IGroupMinimal {
  id: string;
  name: string;
  description: string;
  colorId: number;
  userCount: number;
}
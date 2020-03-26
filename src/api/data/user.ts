import { IGroup } from "./group";

export interface IUserOwner extends IUser {
  groups: IGroup[]
  createdGroups: IGroup[]
}

export interface IUser extends IUserMinimal {
  created: Date;
  updated: Date;
}

export interface IUserMinimal {
  id: string;
  username: string;
  email: string;
  name: string;
}
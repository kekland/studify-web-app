import { IGroup } from "./group";
import { DateOrString } from "./utils";

export interface IUserOwner extends IUser {
  groups: IGroup[]
  createdGroups: IGroup[]
}

export interface IUser extends IUserMinimal {
  created: DateOrString;
  updated: DateOrString;
}

export interface IUserMinimal {
  id: string;
  username: string;
  email: string;
  name: string;
}
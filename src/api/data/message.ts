import { IUserMinimal } from "./user";
import { IGroupMinimal } from "./group";

export interface IMessage extends IMessageSocket {
  group: IGroupMinimal;
  created: Date;
  updated: Date;
}

export interface IMessageSocket extends IMessageMinimal {
  groupId: string;
  user: IUserMinimal;
  created: Date;
}

export interface IMessageMinimal {
  id: string;
  body: string;
  attachments?: string[];
}
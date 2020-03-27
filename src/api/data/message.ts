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
  created: Date | string;
  idempotencyId?: string;
  loading?: boolean;
}

export interface IMessageMinimal {
  id: string;
  body: string;
  attachments?: string[];
}

export interface ISendMessageFormData {
  groupId: string;
  body: string;
  attachments?: string;
}
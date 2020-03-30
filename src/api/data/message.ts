import { IUserMinimal } from "./user";
import { IGroupMinimal } from "./group";
import { DateOrString } from "./utils";

export interface ISentMessage extends IMessageSocket {
  idempotencyId?: string;
  loading?: boolean;
}

export interface IMessage extends IMessageSocket {
  group: IGroupMinimal;
  created: Date;
  updated: Date;
}

export interface IMessageSocket extends IMessageMinimal {
  groupId: string;
  user: IUserMinimal;
  created: DateOrString;
}

export interface IMessageMinimal {
  id: string;
  body: string;
  attachments: { type: 'file' | 'reply', rel: string, additional?: any }[];
}

export interface ISendMessageFormData {
  body: string;
  attachments: {
    files: File[],
  }
}

export const MessageUtils = {
  convertDateToString: (date: Date | string) => {

  }
}
import { IUserMinimal } from "./user";
import { IGroupMinimal } from "./group";
import { DateOrString } from "./utils";

export interface IMessage extends IMessageSocket {
  group: IGroupMinimal;
  created: Date;
  updated: Date;
}

export interface IMessageSocket extends IMessageMinimal {
  groupId: string;
  user: IUserMinimal;
  created: DateOrString;
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

export const MessageUtils = {
  convertDateToString: (date: Date | string) => {
    
  }
}
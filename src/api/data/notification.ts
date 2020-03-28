import { DateOrString } from "./utils";

export interface INotification {
  id: string;
  userId: string;
  groupId?: string;
  type: string;
  message: string;
  created: DateOrString;
}
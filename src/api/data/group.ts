import { IUser } from "./user";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { IMessageSocket } from "./message";

export interface IGroup extends IGroupMinimal {
  creator: IUser;
  created: Date;
  updated: Date;

  messages: IMessageSocket[];
  isLoaded: boolean;
}

export interface IGroupMinimal {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  colorId: number;
  userCount: number;
}

export const GroupUtils = {
  getShortName: (name: string) => {
    if (!name) return ''
    if (name.length === 0) return ''

    const words = name.split(' ')

    let shortName = ''
    if (words.length > 1) {
      shortName = words[0].charAt(0) + words[1].charAt(0)
    }
    else {
      shortName = name.substring(0, 2)
    }

    return shortName.toUpperCase()
  },
  getUserCountString: (userCount: number) => {
    let suffix = 'members'
    if (userCount === 1) suffix = 'member'

    return `${userCount} ${suffix}`
  }
}
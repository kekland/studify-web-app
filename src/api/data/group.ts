import { IUser } from "./user";
import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface IGroup extends IGroupMinimal {
  creator: IUser;
  created: Date;
  updated: Date;
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
    const words = name.split(' ')

    let shortName = ''
    if(words.length > 1) {
      shortName = words[0].charAt(0) + words[1].charAt(0)
    }
    else {
      shortName = name.substring(0, 2)
    }

    return shortName.toUpperCase()
  }
}
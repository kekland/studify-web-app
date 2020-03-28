import { ISignInFormData } from "../components/sign-in-form/sign-in-form";
import request from 'superagent'
import { IUserOwner, IUserMinimal } from "./data/user";
import { ISignUpFormData } from "../components/sign-up-form/sign-up-form";
import { AlertManager } from "react-alert";
import { IGroup, IGroupMinimal } from "./data/group";
import { ICreateGroupFormData } from "../components/modal-create-group/modal-create-group";
import { IMessageSocket, ISendMessageFormData } from "./data/message";
import io from 'socket.io-client'
import { uuid } from 'uuidv4'
import { authApi } from "./auth-api";
import { groupApi } from "./group-api";
import { messagingApi } from "./messaging-api";
import { notificationsApi } from "./notifications-api";

export const api = {
  url: 'https://studify-server.herokuapp.com',
  socketUrl: 'https://studify-server.herokuapp.com',
  token: '',
  messageLimit: 20,
  socket: undefined as undefined | SocketIOClient.Socket,
  use: async (alert: AlertManager, method: () => Promise<void>, afterMethod?: () => void) => {
    try {
      await method()
    }
    catch (e) {
      alert.error(e.message ?? JSON.stringify(e))
    }
    finally {
      if (afterMethod)
        afterMethod()
    }
  },
  requestWrapper: async <T>(method: () => Promise<T>): Promise<T> => {
    try {
      return await method()
    }
    catch (e) {
      if (e?.response?.body) throw e.response.body
      throw e
    }
  },
  setHeader: (req: request.SuperAgentRequest) => {
    req.set('Authorization', `Bearer ${api.token}`)
    return req
  },
  auth: authApi,
  group: groupApi,
  messaging: messagingApi,
  notifications: notificationsApi,
}
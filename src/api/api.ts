import request from 'superagent'
import { AlertManager } from "react-alert";
import { authApi } from "./auth-api";
import { groupApi } from "./group-api";
import { messagingApi } from "./messaging-api";
import { notificationsApi } from "./notifications-api";
import { store } from "../state/store";
import { IPaginatedQuery, CanBeNull } from "./data/utils";

export const api = {
  url: 'http://studify-server.herokuapp.com/api',
  socketUrl: 'http://studify-server.herokuapp.com',
  paginationLimit: 20,
  socket: undefined as CanBeNull<SocketIOClient.Socket>,

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

  getUser: () => {
    return store.getState().auth.user
  },

  getToken: () => {
    return store.getState().auth.token
  },

  normalizeQuery: (query: IPaginatedQuery) => {
    return {
      skip: query.skip,
      limit: query.limit ?? api.paginationLimit,
    }
  },

  hasMore: (array?: any[]) => {
    return (array?.length ?? 0) === api.paginationLimit
  },

  setHeader: (req: request.SuperAgentRequest, token?: string) => {
    req.set('Authorization', `Bearer ${token ?? api.getToken()}`)
    return req
  },

  auth: authApi,
  group: groupApi,
  messaging: messagingApi,
  notifications: notificationsApi,
}
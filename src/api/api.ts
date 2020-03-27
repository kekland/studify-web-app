import { ISignInFormData } from "../components/sign-in-form/sign-in-form";
import request from 'superagent'
import { IUserOwner } from "./data/user";
import { ISignUpFormData } from "../components/sign-up-form/sign-up-form";
import { AlertManager } from "react-alert";
import { IGroup, IGroupMinimal } from "./data/group";
import { ICreateGroupFormData } from "../components/modal-create-group/modal-create-group";
import { IMessageSocket } from "./data/message";

export const api = {
  url: 'http://localhost:8080',
  socketUrl: 'http://localhost:5005',
  token: '',
  use: async (alert: AlertManager, method: () => Promise<void>, afterMethod: () => void) => {
    try {
      await method()
    }
    catch (e) {
      alert.error(e.message ?? JSON.stringify(e))
    }
    finally {
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
  signIn: async (data: ISignInFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signIn`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }
      result.user.groups.forEach(group => group.messages = [])

      api.token = result.token

      return result
    })
  },
  signUp: async (data: ISignUpFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signUp`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }
      result.user.groups.forEach(group => {
        group.messages = [];
        group.isLoaded = false
      })

      api.token = result.token

      return result
    })
  },
  group: {
    create: async (data: ICreateGroupFormData) => {
      return api.requestWrapper(async () => {
        const response = await api.setHeader(request.post(`${api.url}/group/create`).send(data))

        const result = response.body as IGroup
        result.messages = []
        result.isLoaded = true

        return result
      })
    }
  },
  messaging: {
    loadMessages: async (group: IGroupMinimal, skip: number, limit: number) => {
      return api.requestWrapper(async () => {
        const response = await api.setHeader(
          request.get(`${api.url}/group/${group.id}/messages`)
            .query({ skip, limit })
        )

        const result = response.body.messages as IMessageSocket[]
        return result
      })
    }
  },
}
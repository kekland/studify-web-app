import { ISignInFormData } from "../components/sign-in-form/sign-in-form";
import request from 'superagent'
import { IUserOwner } from "./data/user";
import { ISignUpFormData } from "../components/sign-up-form/sign-up-form";
import { AlertManager } from "react-alert";
import { IGroup } from "./data/group";

export const api = {
  url: 'http://localhost:8080',
  use: async (alert: AlertManager, method: () => Promise<void>) => {
    try {
      await method()
    }
    catch (e) {
      alert.error(e.message ?? JSON.stringify(e))
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
  signIn: async (data: ISignInFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signIn`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }
      result.user.groups.forEach(group => group.messages = [])

      return result
    })
  },
  signUp: async (data: ISignUpFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signUp`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }
      result.user.groups.forEach(group => group.messages = [])

      return result
    })
  },
  group: {
    create: async (data: IGroup) => {
      return api.requestWrapper(async () => {
        const response = await request.post(`${api.url}/group/create`).send(data)

        const result = response.body as IGroup
        result.messages = []

        return result
      })
    }
  },
}
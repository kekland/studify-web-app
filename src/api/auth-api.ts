import { api } from "./api"
import request from "superagent"
import { ISignInFormData } from "../components/sign-in-form/sign-in-form"
import { IUserOwner } from "./data/user"
import { ISignUpFormData } from "../components/sign-up-form/sign-up-form"
import { INotification } from "./data/notification"

export const authApi = {
  signIn: async (data: ISignInFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signIn`).send(data)

      const result = {
        user: response.body.user as IUserOwner,
        token: response.body.token,
        notifications: response.body.notifications as INotification[],
      }

      api.token = result.token
      authApi.saveToken()

      return result
    })
  },
  signUp: async (data: ISignUpFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signUp`).send(data)

      const result = {
        user: response.body.user as IUserOwner,
        token: response.body.token,
        notifications: [],
      }

      api.token = result.token
      authApi.saveToken()

      return result
    })
  },
  signInWithToken: async (token: string) => {
    return api.requestWrapper(async () => {
      api.token = token

      const response = await api.setHeader(request.post(`${api.url}/auth/signInWithToken`))

      const result = {
        user: response.body.user as IUserOwner,
        notifications: response.body.notifications as INotification[],
      }

      authApi.saveToken()

      return result
    })
  },
  saveToken: async (token?: string) => {
    localStorage.setItem('token', token ?? api.token)
  },
  getToken: async () => {
    return localStorage.getItem('token')
  }
}
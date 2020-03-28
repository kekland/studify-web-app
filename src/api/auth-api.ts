import { api } from "./api"
import request from "superagent"
import { ISignInFormData } from "../components/sign-in-form/sign-in-form"
import { IUserOwner } from "./data/user"
import { ISignUpFormData } from "../components/sign-up-form/sign-up-form"

export const authApi = {
  signIn: async (data: ISignInFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signIn`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }

      api.token = result.token
      localStorage.setItem('token', result.token)

      return result
    })
  },
  signUp: async (data: ISignUpFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signUp`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }

      api.token = result.token
      localStorage.setItem('token', result.token)

      return result
    })
  },
}
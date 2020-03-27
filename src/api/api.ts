import { ISignInData } from "../components/sign-in-form/sign-in-form";
import request from 'superagent'
import { IUserOwner } from "./data/user";

export const api = {
  url: 'http://localhost:8080',
  signIn: async (data: ISignInData) => {
    try {
      const response = await request.post(`${api.url}/auth/signIn`).send(data)

      return { user: response.body.user as IUserOwner, token: response.body.token }
    }
    catch (e) {
      if (e?.response?.body) throw e.response.body
      throw e
    }
  }
}
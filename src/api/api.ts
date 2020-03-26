import { ISignInData } from "../components/sign-in-form/sign-in-form";
import request from 'superagent'
import { IUserOwner } from "./data/user";

export const api = {
  url: 'http://localhost:8080',
  signIn: async (data: ISignInData) => {
    const response = await request.post(`${api.url}/auth/signIn`).send(data)
    
    console.log(response.body.token)
    return response.body.user as IUserOwner
  }
}
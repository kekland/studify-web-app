import { api } from "./api"
import request from 'superagent'
import { IUserMinimal } from "./data/user"

export const userApi = {
  getUserData: async (userId: string) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/users/${userId}`))
      return response.body as IUserMinimal
    })
  }
}
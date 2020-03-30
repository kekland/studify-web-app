import { api } from "./api"
import request from 'superagent'
import { IUserOwner } from "./data/user"

export const userApi = {
  getUserData: async (userId: string) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/user/${userId}`))
      console.log(response.body)
      return response.body.data as IUserOwner
    })
  }
}
import { api } from "./api"
import request from 'superagent'

export const notificationsApi = {
  setNotificationsAsRead: (notifications: string[]) => {
    return api.requestWrapper(async () => {
      await api.setHeader(request.post(`${api.url}/notifications/setRead`).send({ notifications }))
    })
  }
}
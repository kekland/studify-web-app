import { api } from '../api'
import { methods } from './methods'
import { INotification } from '../data/notification'
import { IGroupExtended } from '../data/group'
import { store } from '../../state/store'
import { clearNotifications } from '../../state/groups'

export const notificationMethods = {
  setNotificationsAsRead: (notifications: INotification[]) => {
    return methods.methodWrapper(async () => {
      await api.notifications.setNotificationsAsRead(notifications.map(n => n.id))
    })
  },
  setGroupAsRead: (group: IGroupExtended | string) => {
    return methods.methodWrapper(async () => {
      const id = (typeof group === 'string') ? group : group.data.id
      await api.group.setAsRead(id)
      store.dispatch(clearNotifications({ id, data: undefined }))
    })
  },
}
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
  setGroupAsRead: (group: IGroupExtended) => {
    return methods.methodWrapper(async () => {
      await api.group.setAsRead(group.data)
      store.dispatch(clearNotifications({ id: group.data.id, data: undefined }))
    })
  },
}
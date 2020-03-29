import { api } from "../api"
import { authMethods } from "./auth-methods"
import { CanBeNull } from "../data/utils"
import { AlertManager } from "react-alert"
import { groupMethods } from "./group-methods"
import { messagingMethods } from "./messaging-methods"
import { notificationMethods } from "./notification-methods"
import { store } from "../../state/store"
import { setNotifications } from "../../state/notifications"
import { setTheme } from "../../state/preferences"

// Methods control the redux state in `src/state/store.ts`

export const methods = {
  alert: undefined as CanBeNull<AlertManager>,
  api: api,
  auth: authMethods,
  group: groupMethods,
  messaging: messagingMethods,
  notification: notificationMethods,
  methodWrapper: async <T>(method: () => Promise<any>, afterMethod?: () => void, onError?: () => void): Promise<void> => {
    try {
      await method()
      if (afterMethod)
        afterMethod()
    }
    catch (e) {
      if(onError) onError()
      if (methods.alert)
        methods.alert.error(e.message ?? JSON.stringify(e))
    }
  },
  initialize: (alert: AlertManager) => {
    methods.alert = alert
  },
  initializeSocket: () => {
    api.messaging.attach(messagingMethods)
  },
  closeSocket: () => {
    api.messaging.closeSocket()
  },
  loadPrefs: () => {
    let data: any = localStorage.getItem('preferences')
    if(!data) return

    data = JSON.parse(data)
    store.dispatch(setTheme(data.theme))
    store.dispatch(setNotifications(data.notifications))
  },
  savePrefs: (data: { theme: string, notifications: boolean }) => {
    localStorage.setItem('preferences', JSON.stringify(data))
  }
}
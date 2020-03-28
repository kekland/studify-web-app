import { api } from "../api"
import { authMethods } from "./auth-methods"
import { CanBeNull } from "../data/utils"
import { AlertManager } from "react-alert"
import { groupMethods } from "./group-methods"
import { messagingMethods } from "./messaging-methods"
import { notificationMethods } from "./notification-methods"

// Methods control the redux state in `src/state/store.ts`

export const methods = {
  alert: undefined as CanBeNull<AlertManager>,
  api: api,
  auth: authMethods,
  group: groupMethods,
  messaging: messagingMethods,
  notification: notificationMethods,
  methodWrapper: async <T>(method: () => Promise<any>, afterMethod?: () => void): Promise<void> => {
    try {
      await method()
    }
    catch (e) {
      if (methods.alert)
        methods.alert.error(e.message ?? JSON.stringify(e))
    }
    finally {
      if (afterMethod)
        afterMethod()
    }
  }
}
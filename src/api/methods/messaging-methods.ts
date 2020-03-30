import { api } from '../api'
import { methods } from './methods'
import { IGroupExtended, IGroupMinimal } from '../data/group'
import { store } from '../../state/store'
import { pushGroupMessages, pushNewGroupMessage, replaceGroupMessageByIdempotency, setUserTyping, setGroup, incrementNotificationCount, markAsNoMore } from '../../state/groups'
import { ISendMessageFormData, ISentMessage, IMessageSocket } from '../data/message'
import { IUserMinimal, IUserOwner } from '../data/user'
import { notificationSound } from '../../components/notification/notification';

export const messagingMethods = {
  loadMoreMessages: (group: IGroupExtended) => {
    return methods.methodWrapper(async () => {
      const result = await api.messaging.loadMessages(group.data, { skip: group.messages.length })
      store.dispatch(pushGroupMessages({ id: result.id, data: result.messages }))

      if (result.messages.length < api.paginationLimit)
        store.dispatch(markAsNoMore({ id: result.id, data: undefined }))
    })
  },
  sendMessage: (group: IGroupExtended, user: IUserOwner, data: ISendMessageFormData) => {
    return methods.methodWrapper(async () => {
      const message = await api.messaging.sendMessage(group.data.id, data, user, (data) => {
        console.log(data)
        store.dispatch(pushNewGroupMessage({ id: group.data.id, data }))
      })

      console.log(message)

      store.dispatch(replaceGroupMessageByIdempotency({ id: group.data.id, data: message }))
    })
  },
  onMessageSent: (data: ISentMessage) => {
    store.dispatch(replaceGroupMessageByIdempotency({ id: data.groupId, data: data }))
  },
  onNewGroupMessage: (message: IMessageSocket) => {
    if (message.user.id === api.getUser()?.id) return;

    store.dispatch(pushNewGroupMessage({ id: message.groupId, data: message }))
    store.dispatch(incrementNotificationCount({ id: message.groupId, data: undefined }))
    notificationSound.play()
  },
  onUserTypingStatusUpdated: (data: { user: IUserMinimal, status: boolean, groupId: string }) => {
    store.dispatch(setUserTyping({ id: data.groupId, data: data }))
  },
  onGroupChange: (data: IGroupMinimal) => {
    store.dispatch(setGroup({ id: data.id, data }))
  }
}
import { ISignInFormData } from "../components/sign-in-form/sign-in-form";
import request from 'superagent'
import { IUserOwner } from "./data/user";
import { ISignUpFormData } from "../components/sign-up-form/sign-up-form";
import { AlertManager } from "react-alert";
import { IGroup, IGroupMinimal } from "./data/group";
import { ICreateGroupFormData } from "../components/modal-create-group/modal-create-group";
import { IMessageSocket, ISendMessageFormData } from "./data/message";
import io from 'socket.io-client'
import { uuid } from 'uuidv4'

export const api = {
  url: 'http://localhost:8080',
  socketUrl: 'http://localhost:5005',
  token: '',
  messageLimit: 20,
  socket: undefined as undefined | SocketIOClient.Socket,
  use: async (alert: AlertManager, method: () => Promise<void>, afterMethod?: () => void) => {
    try {
      await method()
    }
    catch (e) {
      alert.error(e.message ?? JSON.stringify(e))
    }
    finally {
      if (afterMethod)
        afterMethod()
    }
  },
  requestWrapper: async <T>(method: () => Promise<T>): Promise<T> => {
    try {
      return await method()
    }
    catch (e) {
      if (e?.response?.body) throw e.response.body
      throw e
    }
  },
  setHeader: (req: request.SuperAgentRequest) => {
    req.set('Authorization', `Bearer ${api.token}`)
    return req
  },
  signIn: async (data: ISignInFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signIn`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }
      result.user.groups.forEach(group => group.messages = [])

      api.token = result.token

      return result
    })
  },
  signUp: async (data: ISignUpFormData) => {
    return api.requestWrapper(async () => {
      const response = await request.post(`${api.url}/auth/signUp`).send(data)

      const result = { user: response.body.user as IUserOwner, token: response.body.token }
      result.user.groups.forEach(group => {
        group.messages = [];
        group.isLoaded = false
      })

      api.token = result.token

      return result
    })
  },
  group: {
    create: async (data: ICreateGroupFormData) => {
      return api.requestWrapper(async () => {
        const response = await api.setHeader(request.post(`${api.url}/group/create`).send(data))

        const result = response.body as IGroup
        result.messages = []
        result.isLoaded = true
        result.hasMore = false

        return result
      })
    }
  },
  messaging: {
    loadMessages: async (group: IGroupMinimal, skip: number) => {
      return api.requestWrapper(async () => {
        const response = await api.setHeader(
          request.get(`${api.url}/group/${group.id}/messages`)
            .query({ skip, limit: api.messageLimit })
        )

        const messages = response.body.messages as IMessageSocket[]
        return { id: group.id, messages: messages.reverse() }
      })
    },
    attach: async (
      callbacks: {
        onNewGroupMessage: (message: IMessageSocket) => void,
        onMessageSent: (message: IMessageSocket) => void
      }) => {
      api.socket = io(api.socketUrl, { query: { token: api.token } })

      api.socket.on('onNewGroupMessage', (data: { message: IMessageSocket }) => {
        callbacks.onNewGroupMessage(data.message)
      })

      api.socket.on('onMessageSent', (data: { message: IMessageSocket, idempotencyId: string }) => {
        let message = { ...data.message, idempotencyId: data.idempotencyId, loading: false }
        callbacks.onMessageSent(message)
      })

      api.socket.connect()
    },
    updateRooms: async () => {
      api.socket?.emit('updateRooms')
    },
    sendMessage: async (user: IUserOwner, data: ISendMessageFormData) => {
      const idempotencyId = uuid()

      api.socket?.emit('sendMessage', { ...data, idempotencyId })
      return {
        id: idempotencyId,
        groupId: data.groupId,
        body: data.body,
        attachments: data.attachments,
        created: new Date().toISOString(),
        idempotencyId,
        loading: true,
        user,
      } as IMessageSocket
    }
  },
}
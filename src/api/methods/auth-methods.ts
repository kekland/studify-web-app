import { api } from '../api'
import { methods } from './methods'
import { store } from '../../state/store'
import { setAuth } from '../../state/auth'
import { setNotifications } from '../../state/notifications'
import { IUserOwner } from '../data/user'
import { INotification } from '../data/notification'

export interface ISignInData {
  username: string;
  password: string;
}

export interface ISignUpData {
  username: string;
  email: string;
  name: string;
  password: string;
}

export const authMethods = {
  checkAuth: () => {
    return api.auth.getToken() != null
  },
  dispatchSignInToStore: (data: { user: IUserOwner, token: string, notifications: INotification[] }) => {
    store.dispatch(setAuth(data))
    store.dispatch(setNotifications(data.notifications))
  },
  signIn: (data: ISignInData) => {
    return methods.methodWrapper(async () => {
      const result = await api.auth.signIn(data)
      authMethods.dispatchSignInToStore(result)
    })
  },
  signUp: (data: ISignUpData) => {
    return methods.methodWrapper(async () => {
      const result = await api.auth.signUp(data)
      authMethods.dispatchSignInToStore(result)
    })
  },
  signInWithToken: (afterMethod?: () => void) => {
    return methods.methodWrapper(async () => {
      const token = api.auth.getToken()
      if (!token) throw Error('No token was provided')

      const result = await api.auth.signInWithToken(token)
      authMethods.dispatchSignInToStore({ ...result, token: token })
    }, afterMethod)
  },
  signOut: () => {
    return methods.methodWrapper(async () => {
      store.dispatch(setAuth({}))
      store.dispatch(setNotifications([]))
      api.auth.clearToken()
    })
  },
}
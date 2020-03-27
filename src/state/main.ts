import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'
import { IMessageSocket } from '../api/data/message'
import { api } from '../api/api'

export interface IMainSliceState {
  groups: IGroup[];
  selectedGroup?: IGroup;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    groups: [],
    selectedGroup: undefined,
  } as IMainSliceState,
  reducers: {
    setGroups(state, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload
    },
    addGroup(state, action: PayloadAction<IGroup>) {
      state.groups.push(action.payload)
    },
    selectGroup(state, action: PayloadAction<IGroup>) {
      state.selectedGroup = action.payload
    },
    setGroupMessages(state, action: PayloadAction<{ id: string, messages: IMessageSocket[] }>) {
      const group = state.groups.find(group => group.id === action.payload.id)

      if (!group) return
      group.messages = action.payload.messages
      group.isLoaded = true
      group.hasMore = group.messages.length === api.messageLimit
    },
    addGroupMessages(state, action: PayloadAction<{ id: string, messages: IMessageSocket[] }>) {
      const group = state.groups.find(group => group.id === action.payload.id)

      if (!group) return
      group.messages = [...group.messages, ...action.payload.messages]
      group.hasMore = group.messages.length === api.messageLimit
    },
    addGroupMessage(state, action: PayloadAction<IMessageSocket>) {
      const group = state.groups.find(group => group.id === action.payload.groupId)

      if (!group) return
      group.messages = [action.payload, ...group.messages]
      if (state?.selectedGroup?.id === group.id) {
        state.selectedGroup.messages = group.messages
      }
    },
    replaceGroupMessageByIdempotency(state, action: PayloadAction<IMessageSocket>) {
      const group = state.groups.find(group => group.id === action.payload.groupId)

      if (!group) return
      let index = group.messages.findIndex(message => message.idempotencyId === action.payload.idempotencyId)
      if (index === -1) return
      group.messages[index] = action.payload

      if (state?.selectedGroup?.id === group.id) {
        state.selectedGroup.messages = group.messages
      }
    }
  },
})

export const {
  setGroups,
  addGroup,
  selectGroup,
  setGroupMessages,
  addGroupMessages,
  addGroupMessage,
  replaceGroupMessageByIdempotency
} = mainSlice.actions
export default mainSlice.reducer
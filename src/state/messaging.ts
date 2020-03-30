import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessageSocket } from '../api/data/message'

export interface IMessagingSliceState {
  replyingTo?: IMessageSocket;
}

const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    replyingTo: undefined,
  } as IMessagingSliceState,
  reducers: {
    setReplyingTo(state, action: PayloadAction<IMessageSocket | undefined>) {
      state.replyingTo = action.payload
    }
  },
})

export const {
  setReplyingTo
} = messagingSlice.actions
export default messagingSlice.reducer
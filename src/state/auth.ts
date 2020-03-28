import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserOwner } from '../api/data/user'
import { joinGroup, leaveGroup } from './main'

export interface IUserSliceState {
  user?: IUserOwner;
  token?: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    token: undefined,
  } as IUserSliceState,
  reducers: {
    setAuth(state, action: PayloadAction<IUserSliceState>) {
      state.user = action.payload.user
      state.token = action.payload.token
    }
  },
  extraReducers: builder => {
    builder.addCase(joinGroup, (state, action) => {
      state.user!.groups.push(action.payload)
    })
    builder.addCase(leaveGroup, (state, action) => {
      const index = state.user!.groups.findIndex(group => group.id === action.payload.id)
      state.user!.groups.splice(index)
    })
  }
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer
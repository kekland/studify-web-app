import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { IUserOwner } from '../api/data/user'

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
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { methods } from "../api/methods/methods";

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    theme: 'light',
    notifications: true,
  },
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload
      
      methods.savePrefs(state)
    },
    setNotifications(state, action: PayloadAction<boolean>) {
      state.notifications = action.payload

      methods.savePrefs(state)
    }
  }
})

export const { setNotifications, setTheme } = preferencesSlice.actions
export default preferencesSlice.reducer
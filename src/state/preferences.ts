import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    theme: 'light',
    notifications: true,
  },
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload
    },
    setNotifications(state, action: PayloadAction<boolean>) {
      state.notifications = action.payload
    }
  }
})

export const { setNotifications, setTheme } = preferencesSlice.actions
export default preferencesSlice.reducer
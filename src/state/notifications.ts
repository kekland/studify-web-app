import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../api/data/notification";

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [] as INotification[],
  },
  reducers: {
    setNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload
    },
  }
})

export const { setNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer
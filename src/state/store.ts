import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './auth'
import main from './main'
import groups from './groups'
import notifications from './notifications'

const rootReducer = combineReducers({ auth, main, groups, notifications })

const store = configureStore({
  reducer: rootReducer,
})


store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof rootReducer>
export { store }
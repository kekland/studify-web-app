import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth'

const store = configureStore({
  reducer: AuthReducer,
})

store.subscribe(() => console.log(store.getState()))

export { store }
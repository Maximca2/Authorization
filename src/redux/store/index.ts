import { combineReducers,configureStore} from "@reduxjs/toolkit"

import {userReducer} from './usersReducer'

const RootReducer = combineReducers ({
    toolkit:userReducer
})

export const store = configureStore({
    reducer:RootReducer,
    
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
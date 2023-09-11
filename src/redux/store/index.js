import { combineReducers,configureStore} from "@reduxjs/toolkit"

import {userReducer} from './usersReducer'

const RootReducer = combineReducers ({
    toolkit:userReducer
})

export const store = configureStore({
    reducer:RootReducer,
    
})

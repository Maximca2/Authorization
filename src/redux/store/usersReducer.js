import { createAction, createReducer } from "@reduxjs/toolkit";

import { CHECK_USER, CREATE_ACCOUNT, RESTORE_PASSWORD, CREATE_NEW_PASSWORD ,CHECK_IF_USER_OUT } from './actions';

const LOCAL_STORAGE_KEY = 'OUR_STORAGE_ITEMS'

// DefaultState
const defaultState = {
    user: null,
    curUser: null,
    curUserAccount: false,
    database: localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [],
    userExist: false,
    newPassword: true,
    userIsOut:false,
    curUserName:null,
    userInAccount:false

}
// actions
export const checkUser = createAction(CHECK_USER);
export const createAccountUser = createAction(CREATE_ACCOUNT)
export const ifAccountExist = createAction(RESTORE_PASSWORD)
export const createNewPassword = createAction(CREATE_NEW_PASSWORD)
export const checkIfUserIsOut = createAction(CHECK_IF_USER_OUT)


//Reducer 
export const userReducer = createReducer(defaultState, {

    [checkUser]: function (state, { payload }) {

        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY)
        const userInfoParsed = JSON.parse(userInfo)
        if(!userInfoParsed){
            state.userExist = false
           return 
        }
        const data = userInfoParsed.find(it => it?.nicName === payload?.nicName && it?.password === payload?.password);
        if (data) {
            state.user = data
            state.userInAccount = true
            state.userExist = true
        } else {
            state.userExist = false
            
        }
    },
    [createAccountUser]: function (state, { payload }) {
        const newUser = [...state.database, payload]
        state.database.push(payload)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser))

    },
    [ifAccountExist]: function (state, { payload }) {
        
        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY)
        const userInfoParsed = JSON.parse(userInfo)
        const data = userInfoParsed.find(it => it.nicName === payload.nicName);

        if (!data) {
            state.curUserAccount = false

        } else {
            
            state.curUserAccount = true
            state.curUser = data;
            state.curUserName = payload.nicName
        }

    },
    [createNewPassword]: function (state, { payload }) {
        const { curAccount, password } = payload
        
        if (!password.newPassword) {
            state.newPassword = false
            state.curUserAccount  =false
            return
            

        } else {
            
            state.curUserAccount  =true
            const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY)
            const userInfoParsed = JSON.parse(userInfo)
            const curAcc = userInfoParsed.find(it => it.nicName === curAccount.nicName);

            curAcc.password = password.newPassword;
            
            const newUser = [...state.database.filter(it => it.nicName !== curAccount.nicName), curAcc]
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser))

        }

    },

    [checkIfUserIsOut]: function (state, { payload }) {
        if(payload===false){
            state.userExist = false;
            state.userIsOut = true  
            state.userInAccount = true  
            
        }

    },

})


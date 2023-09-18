import { createAction, createReducer } from "@reduxjs/toolkit";

import { CHECK_USER, CREATE_ACCOUNT, RESTORE_PASSWORD, CREATE_NEW_PASSWORD, CHECK_IF_USER_OUT, CHECK_IF_USER_IN,SET_LOG_IN } from './actions';

const LOCAL_STORAGE_KEY = 'OUR_STORAGE_ITEMS';
const CUR_USER_TOKE = 'CUR_USER_TOKEN';

// DefaultState
const defaultState = {
    user: null,
    curUser: null,
    curUserAccount: false,
    database: localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [],
    curUserToken: localStorage.getItem(CUR_USER_TOKE) ? JSON.parse(localStorage.getItem(CUR_USER_TOKE)) : [],
    userExist: false,
    newPassword: false,
    userIsOut: false,
    curUserName: null,
    userInAccount: false

}

// actions
export const checkUser = createAction(CHECK_USER);
export const createAccountUser = createAction(CREATE_ACCOUNT)
export const ifAccountExist = createAction(RESTORE_PASSWORD)
export const createNewPassword = createAction(CREATE_NEW_PASSWORD)
export const checkIfUserIsOut = createAction(CHECK_IF_USER_OUT)
export const checkIfUserIn = createAction(CHECK_IF_USER_IN)
export const setLogIn = createAction(SET_LOG_IN)

//Reducer 
export const userReducer = createReducer(defaultState, {

    [checkUser]: function (state, { payload }) {


        if (!payload.nicName) {
            return
        }
        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY)
        const userInfoParsed = JSON.parse(userInfo)

        if (!userInfoParsed) {
            state.userExist = false
            return
        }
        const data = userInfoParsed.find(it => it?.nicName === payload?.nicName && it?.password === payload?.password);
        if (data) {
            state.user = data
            state.userExist = true
            const userToken = data?.token;
            localStorage.setItem(CUR_USER_TOKE, JSON.stringify([userToken]));
        }else{
            state.userExist = false
        }


        if (localStorage.getItem(CUR_USER_TOKE) === '[]') {
            state.userInAccount = false;
        } else {

            state.userInAccount = true;
        }

    },
    [createAccountUser]: function (state, { payload }) {

        const { curAccountData, token } = payload;
        curAccountData.token = token
        const newUser = [...state.database, curAccountData]
        state.database.push(curAccountData)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser))

    },
    [ifAccountExist]: function (state, { payload }) {
        if (!payload.nicName) {
            return
        }

        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY)
        const userInfoParsed = JSON.parse(userInfo)
        if(!userInfoParsed){
            return 
        }
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
            state.curUserAccount = false
            return

        } else {
            state.newPassword = true
            state.curUserAccount = true
            const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY)
            const userInfoParsed = JSON.parse(userInfo)
            const curAcc = userInfoParsed.find(it => it.nicName === curAccount.nicName);

            curAcc.password = password.newPassword;

            const newUser = [...state.database.filter(it => it.nicName !== curAccount.nicName), curAcc]
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser))

        }

    },
    [checkIfUserIn]: function (state, { payload }) {
        if (payload) {
            state.userInAccount = true
        }
    },
    [setLogIn]: function (state, { payload }) {
        
        const userOut = []
        localStorage.setItem(CUR_USER_TOKE, JSON.stringify(userOut))
        
    },

    [checkIfUserIsOut]: function (state, { payload }) {
        if (payload === false) {
            const userOut = []
            localStorage.setItem(CUR_USER_TOKE, JSON.stringify(userOut))
            state.userExist = false;
            state.userInAccount = true


        }

    },

})


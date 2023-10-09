import { createAction, createReducer } from "@reduxjs/toolkit";

import { CHECK_USER, CREATE_ACCOUNT, RESTORE_PASSWORD, CREATE_NEW_PASSWORD, CHECK_IF_USER_OUT, CHECK_IF_USER_IN, SET_LOG_IN } from './actions';
// import { checkIfAccountIs } from "../../pages/LogIn/LogInPage";
import { checkIfCurrentAccountExist } from "../../pages/CreateAccount/CreateAccount";
const LOCAL_STORAGE_KEY = 'OUR_STORAGE_ITEMS';
const LOCALE_STORAGE_KEY_OF_NICKNAME = 'LOCALE_STORAGE_KEY_OF_NICKNAME'
export const CUR_USER_TOKEN = 'CUR_USER_TOKEN';

// DefaultState
const defaultState = {
    user: null,
    curUser: null,
    curUserAccount: false,
    database: localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [],
    curUserToken: localStorage.getItem(CUR_USER_TOKEN),
    userExist: false,
    newPassword: false,
    userIsOut: false,
    curUserName: null,
    userInAccount: false,
    uniqueNickName: localStorage.getItem(LOCALE_STORAGE_KEY_OF_NICKNAME) ? JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY_OF_NICKNAME)) : [],
    curUserNicNameExist:null,
    canLogIn:false


}

// actions
export const checkUser = createAction(CHECK_USER);
export const createAccountUser = createAction(CREATE_ACCOUNT)
export const ifAccountExist = createAction(RESTORE_PASSWORD)
export const createNewPassword = createAction(CREATE_NEW_PASSWORD)
export const checkIfUserIsOut = createAction(CHECK_IF_USER_OUT)
export const checkIfUserIn = createAction(CHECK_IF_USER_IN)
export const setLogIn = createAction(SET_LOG_IN)
export const checkIfCurrentNickNameExist = createAction('check')
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


            state.userExist = true
            const userToken = data?.token;
            state.curUserToken = true

            localStorage.setItem(CUR_USER_TOKEN, JSON.stringify(userToken));
            state.user = data

            state.userInAccount = true
        } else {
            

            state.userExist = false
        }
    },
    [createAccountUser]: function (state, { payload }) {

        const { curAccountData, token } = payload;
        state.canLogIn =false

        const curNicName = [...state.uniqueNickName, curAccountData.nicName];
        state.curUserNicNameExist = false
        if(state.uniqueNickName.includes(curAccountData.nicName)){
            state.curUserNicNameExist = false
            state.canLogIn = false
            checkIfCurrentAccountExist(state.curUserNicNameExist);
            return
        }
        state.curUserNicNameExist = true
        state.canLogIn = true

        checkIfCurrentAccountExist(state.curUserNicNameExist);

        state.uniqueNickName.push(curAccountData.nicName);

        localStorage.setItem(LOCALE_STORAGE_KEY_OF_NICKNAME, JSON.stringify(curNicName))
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
        if (!userInfoParsed) {
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
    [checkIfUserIsOut]: function (state) {

        state.userInAccount = false
        localStorage.removeItem(CUR_USER_TOKEN)
        state.userExist = false;
        state.userInAccount = false
        state.curUserToken = false

    },
    [checkIfCurrentNickNameExist]: function (state) {
       
        state.canLogIn = false

    },

})


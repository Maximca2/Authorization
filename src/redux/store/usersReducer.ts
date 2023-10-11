import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  CHECK_USER,
  CREATE_ACCOUNT,
  RESTORE_PASSWORD,
  CREATE_NEW_PASSWORD,
  CHECK_IF_USER_OUT,
  CHECK_IF_USER_IN,
  SET_LOG_IN,
  CHECK_ACCOUNT_NICK_NAME,
} from "./actions";
//interface
import {
  MyState,
  UserData,
  IfAccountExist,
  CreateNewPassword,
  CreateAccounts,
} from "@/interface/interface";
//some func to help
import { checkIfCurrentAccountExist } from "../../pages/CreateAccount/CreateAccount";

//keys
const LOCAL_STORAGE_KEY = "OUR_STORAGE_ITEMS";
const LOCALE_STORAGE_KEY_OF_NICKNAME = "LOCALE_STORAGE_KEY_OF_NICKNAME";
export const CUR_USER_TOKEN = "CUR_USER_TOKEN";

const defaultState: MyState = {
  user: null,
  curUser: null,
  curUserAccount: false,
  database: localStorage.getItem(LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    : [],
  curUserToken: localStorage.getItem(CUR_USER_TOKEN),
  // curUserToken: false,
  userExist: false,
  newPassword: false,
  userIsOut: false,
  curUserName: null,
  userInAccount: false,
  uniqueNickName: localStorage.getItem(LOCALE_STORAGE_KEY_OF_NICKNAME)
    ? JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY_OF_NICKNAME))
    : [],
  curUserNicNameExist: null,
  canLogIn: false,
};

export const checkUser = createAction<UserData>(CHECK_USER);
export const createAccountUser = createAction<CreateAccounts>(CREATE_ACCOUNT);
export const ifAccountExist = createAction<IfAccountExist>(RESTORE_PASSWORD);
export const createNewPassword =createAction<CreateNewPassword>(CREATE_NEW_PASSWORD);
export const checkIfUserIsOut = createAction<string>(CHECK_IF_USER_OUT);
export const checkIfUserIn = createAction<string>(CHECK_IF_USER_IN);
export const setLogIn = createAction<string>(SET_LOG_IN);
export const checkIfCurrentNickNameExist = createAction<string>(CHECK_ACCOUNT_NICK_NAME);

//Reducer
export const userReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(
      checkUser,
      (state: MyState, { payload }: PayloadAction<UserData>) => {
        if (!payload.nicName) {
          return;
        }
        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
        const userInfoParsed = JSON.parse(userInfo);

        if (!userInfoParsed) {
          state.userExist = false;
          return;
        }
        const data = userInfoParsed.find(
          (it: { nicName: string; password: string }) =>
            it?.nicName === payload?.nicName &&
            it?.password === payload?.password
        );
        if (data) {
          state.userExist = true
          const userToken = data?.token;
          state.curUserToken = true

          localStorage.setItem(CUR_USER_TOKEN, JSON.stringify(userToken));
          state.user = data

          state.userInAccount = true
        } else {
          state.userExist = false;
        }
      }
    )

    .addCase(
      createAccountUser,
      (state: MyState, { payload }: PayloadAction<CreateAccounts>) => {
        const { curAccountData, token } = payload;
        state.canLogIn = false;

        const curNicName = [...state.uniqueNickName, curAccountData.nicName];
        state.curUserNicNameExist = false;
        if (state.uniqueNickName.includes(curAccountData.nicName)) {
          state.curUserNicNameExist = false;
          state.canLogIn = false;
          checkIfCurrentAccountExist(state.curUserNicNameExist);
          return;
        }
        state.curUserNicNameExist = true;
        state.canLogIn = true;

        checkIfCurrentAccountExist(state.curUserNicNameExist);

        state.uniqueNickName.push(curAccountData.nicName);

        localStorage.setItem(
          LOCALE_STORAGE_KEY_OF_NICKNAME,
          JSON.stringify(curNicName)
        );
        curAccountData.token = token;
        const newUser = [...state.database, curAccountData];
        state.database.push(curAccountData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
      }
    )
    .addCase(
      createNewPassword,
      (state: MyState, { payload }: PayloadAction<CreateNewPassword>) => {
        const { curAccount, password } = payload;

        if (!password.newPassword) {
          state.newPassword = false;
          state.curUserAccount = false;
          return;
        } else {
          state.newPassword = true;
          state.curUserAccount = true;
          const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
          const userInfoParsed = JSON.parse(userInfo);
          const curAcc = userInfoParsed.find(
            (it: { nicName: string }) => it.nicName === curAccount.nicName
          );

          curAcc.password = password.newPassword;

          const newUser = [
            ...state.database.filter(
              (it: { nicName: string }) => it.nicName !== curAccount.nicName
            ),
            curAcc,
          ];
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
        }
      }
    )
    .addCase(
      ifAccountExist,
      (state: MyState, { payload }: PayloadAction<IfAccountExist>) => {
        if (!payload.nicName) {
          return;
        }

        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
        const userInfoParsed = JSON.parse(userInfo);

        if (!userInfoParsed) {
          return;
        }
        const data = userInfoParsed.find(
          (it: { nicName: string }) => it.nicName === payload.nicName
        );
        if (!data) {
          state.curUserAccount = false;
        } else {
          state.curUserAccount = true;
          state.curUser = data;
          state.curUserName = payload.nicName;
        }
      }
    )
    .addCase(checkIfUserIsOut, (state: MyState) => {
      state.userInAccount = false;
      localStorage.removeItem(CUR_USER_TOKEN);
      state.userExist = false;
      state.userInAccount = false;
      state.curUserToken = false;
    })
    .addCase(checkIfCurrentNickNameExist, (state: MyState) => {
      state.canLogIn = false;
    })
);

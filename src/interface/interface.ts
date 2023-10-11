export interface CurAccountData {
  lastName: string;
  name: string;
  password: string;
  nicName: string;
  token: string;
}

export interface CreateAccounts {
  token: string;
  curAccountData: CurAccountData;
}

export interface CreateNewPassword {
  curAccount: CurAccountData;
  password: NewPassword;
}

//Reducer interface state
export interface MyState {
  user: { name: string };
  curUser: CurAccountData;
  curUserAccount: boolean;
  database: CurAccountData[];
  curUserToken: boolean|string;
  userExist: boolean;
  newPassword: boolean;
  userIsOut: boolean;
  curUserName: string;
  userInAccount: boolean;
  uniqueNickName: string[];
  curUserNicNameExist: boolean;
  canLogIn: boolean;
//   curUserTokens: string;
}
export interface IfAccountExist {
  nicName: string;
}

export interface DataToGetPassword {
  nicName: string;
}
export interface NewPassword {
  newPassword: string;
}

export interface UserData {
  nicName: string;
  password: string;
}


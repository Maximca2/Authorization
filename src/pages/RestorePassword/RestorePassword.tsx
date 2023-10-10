import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//Reducer
import {
  createNewPassword,
  ifAccountExist,
} from "../../redux/store/usersReducer";
//message
import { successToRestorePassword } from "../../messages";
//interface
import {
  CreateNewPassword,
  CurAccountData,
  DataToGetPassword,
  IfAccountExist,
  NewPassword,
} from "../../interface/interface";
//Components
import Input from "../../Components/Input";
//helper
import { toastSuccessPasswordRestored } from "../../helpers";
//style
import "react-toastify/dist/ReactToastify.css";
//hooks
import { useAppDispatch, AppSelector } from "../../hooks/hooks";
///options
import { options } from "../../options/optionsToast";
//style
import style from "./style.module.scss";

const RestorePassword = () => {
  const dispatch = useAppDispatch();

  const [dataToGetPassword, setDataToGetPassword] = useState<DataToGetPassword>(
    { nicName: "" }
  );
  const [newPassword, setNewPassword] = useState<NewPassword>({
    newPassword: "",
  });
  const [exist, setExist] = useState<boolean>(true);
  const [redirectNow, setRedirectNow] = useState<boolean>(false);

  const curUserAccountExist = AppSelector(
    (state) => state.toolkit.curUserAccount
  );
  const passwordCheck = AppSelector((state) => state.toolkit.curUserName);
  const curUser = AppSelector((state) => state.toolkit.curUser);

  const checkIfUserHaveCurrentAccount = (
    curUserAccountObject: IfAccountExist
  ) => {
    dispatch(ifAccountExist(curUserAccountObject));
  };

  const getNewPassword = (
    newPassword: NewPassword,
    curUser: CurAccountData
  ) => {
    const passwordData: CreateNewPassword = {
      password: newPassword,
      curAccount: curUser,
    };
    setExist(true);

    if (newPassword.newPassword) {
      dispatch(createNewPassword(passwordData));
      toastSuccessPasswordRestored(successToRestorePassword, options);
      setExist(false);
      setTimeout(() => {
        setRedirectNow(true);
      }, 2000);
    }
  };
  useEffect(() => {
    setExist(true);
  }, [exist]);

  function showInputToRestorePassword(userExist: boolean) {
    if (userExist && dataToGetPassword.nicName === passwordCheck) {
      return (
        <div className={style.boxToChangePassword}>
          <Input
            type="input"
            placeholder="придумайте новий пароль"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewPassword({
                ...newPassword,
                newPassword: e.target.value,
              });
            }}
            styles={""}
            id={""}
          />
          <button
            className={style.changePasswordBtn}
            onClick={() => getNewPassword(newPassword, curUser)}
          >
            Поміняти пароль
          </button>
          {redirectNow ? <Navigate replace to="/logIn" /> : null}
        </div>
      );
    }
    return null;
  }
  return (
    <div className={style.box}>
      <ToastContainer limit={1} />
      <div className={style.messageRestorePassword}>Відновити пароль</div>
      <Input
        type="input"
        placeholder="Nic Name?"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDataToGetPassword({
            ...dataToGetPassword,
            nicName: e.target.value,
          });
        }}
        styles={""}
        id={""}
      />
      <button
        className={style.sendData}
        onClick={() => checkIfUserHaveCurrentAccount(dataToGetPassword)}
      >
        Дальше
      </button>
      <NavLink className={style.BackButton} to="/logIn">
        Назад до Log in
      </NavLink>
      {showInputToRestorePassword(curUserAccountExist)}
    </div>
  );
};

export default RestorePassword;

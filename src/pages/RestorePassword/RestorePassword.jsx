import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";

import { ifAccountExist } from "../../redux/store/usersReducer";
import { createNewPassword } from "../../redux/store/usersReducer";

import { ToastRestorePassword } from "../../Components/Toast";
import Input from "../../Components/Input";

import "react-toastify/dist/ReactToastify.css";

import style from "./Restore.module.scss";

const RestorePassword = () => {
  const dispatch = useDispatch();
  const [dataToGetPassword, setDataToGetPassword] = useState({});
  const [newPassword, setNewPassword] = useState({});
  const [exist, setExist] = useState(true);
  const [redirectNow, setRedirectNow] = useState(false);
  const [success, setSuccess] = useState(null);

  const curUserAccountExist = useSelector(
    (state) => state.toolkit.curUserAccount
  );

  const passwordCheck = useSelector((state) => state.toolkit.curUserName);

  const curUser = useSelector((state) => state.toolkit.curUser);
  const checkIfUserHaveCurrentAccount = (curUserAccountObject) => {
    dispatch(ifAccountExist(curUserAccountObject));
  };

  const getNewPassword = (newPassword, curUser) => {
    const objToCreateNewPassword = {
      curAccount: curUser,
      password: newPassword,
    };
    setExist(true);

    if (newPassword.newPassword) {
      dispatch(createNewPassword(objToCreateNewPassword));

      setSuccess(true);
      setExist(false);
      setTimeout(() => {
        setRedirectNow(true);
      }, 2000);
    } else {
      setSuccess(false);
    }
  };
  useEffect(() => {
    setExist(true);
  }, [exist]);

  function showInputToRestorePassword(userExist) {
    if (userExist && dataToGetPassword.nicName === passwordCheck) {
      return (
        <div className={style.boxToChangePassword}>
          <Input
            type="input"
            placeholder="придумайте новий пароль"
            onChange={(e) => {
              setNewPassword({
                ...newPassword,
                newPassword: e.target.value,
              });
            }}
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
  }
  return (
    <div className={style.box}>
      {success ? (
        <ToastRestorePassword
          condition={true}
          value="Ви успішно поміняли пароль!"
        />
      ) : null}
      <div className={style.messageRestorePassword}>Відновити пароль</div>
      <Input
        type="input"
        placeholder="Nic Name?"
        name="name"
        required
        onChange={(e) => {
          setDataToGetPassword({
            ...dataToGetPassword,
            nicName: e.target.value,
          });
        }}
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

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { ifAccountExist } from "../../redux/store/usersReducer";
import { createNewPassword } from "../../redux/store/usersReducer";

import "react-toastify/dist/ReactToastify.css";

import style from "../RestorePassword/Restore.module.scss";

const RestorePassword = () => {
  
  const dispatch = useDispatch();
  const [dataToGetPassword, setDataToGetPassword] = useState({});
  const [newPassword, setNewPassword] = useState({});
  const [exist, setExist] = useState(true);
  const [redirectNow, setRedirectNow] = useState(false);

  const curUserAccountExist = useSelector(
    (state) => state.toolkit.curUserAccount
  );

  const passwordCheck = useSelector((state) => state.toolkit.curUserName);

  const curUser = useSelector((state) => state.toolkit.curUser);
  const checkIfUserHaveCuraccount = (curUserAccountObject) => {
    dispatch(ifAccountExist(curUserAccountObject));
  };

  const showMessageError = () => {
    toast.error("Заповніть всі поля!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  function showMessageSuccess() {
    toast.success("Ви успішно поміняли пароль", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const getNewPassword = (newPassword, curUser) => {
    const objToCreateNewPassword = {
      curAccount: curUser,
      password: newPassword,
    };
    setExist(true);

    if (newPassword.newPassword) {
      dispatch(createNewPassword(objToCreateNewPassword));
      showMessageSuccess();
      setExist(false);
      setTimeout(() => {
        setRedirectNow(true);
      }, 2000);
    } else {
      showMessageError();
    }
  };
  useEffect(() => {
    setExist(true);
  }, [exist]);

  function showButtontoRestorePassword(userExist) {
    if (userExist && dataToGetPassword.nicName === passwordCheck) {
      return (
        <div className={style.boxToChangePassword}>
          <ToastContainer />
          <input
            className={style.inputNewPassword}
            type="input"
            placeholder="придумайте новий пароль"
            name="name"
            required
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
          {redirectNow ? <Navigate replace to="/logInPage" /> : null}
        </div>
      );
    }
  }
  return (
    <div className={style.box}>
      <ToastContainer />
      <div className={style.messageRestorePassword}>Відновити пароль</div>
      <input
        type="input"
        className={style.inputNicName}
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
        onClick={() => checkIfUserHaveCuraccount(dataToGetPassword)}
      >
        Дальше
      </button>
      <NavLink className={style.BackButton} to={"/logIn"}>
        Назад до Log in
      </NavLink>
      {showButtontoRestorePassword(curUserAccountExist)}
    </div>
  );
};

export default RestorePassword;

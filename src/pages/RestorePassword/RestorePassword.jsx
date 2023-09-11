import React, {useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { ifAccountExist } from "../../redux/store/usersReducer";

import { createNewPassword } from "../../redux/store/usersReducer";

import style from "../RestorePassword/Restore.module.scss";

const RestorePassword = () => {

  const dispatch = useDispatch();
  const [dataToGetPassword, setDataToGetPassword] = useState({});
  const [newPassword, setNewPassword] = useState({});
  const [canLogIn, setcanLogIn] = useState(false);
  
  const curUserAccountExist = useSelector(
    (state) => state.toolkit.curUserAccount
  );
  const curUser = useSelector((state) => state.toolkit.curUser);

  const checkIfUserHaveCuraccount = (curUserAccountObject) => {
    dispatch(ifAccountExist(curUserAccountObject));
  };

  const getNewPassword = (newPassword, curUser) => {
    const objToCreateNewPassword = {
      curAccount: curUser,
      password: newPassword,
    };
    if (curUser) {
      dispatch(createNewPassword(objToCreateNewPassword));
      setcanLogIn(true);
    }
  };

  function showButtontoRestorePassword(userExist) {
    if (userExist) {
      return (
        <div className="">
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
          {canLogIn ? <NavLink className={style.toLogIn} to="/logInPage">To log in</NavLink> : null}
        </div>
      );
    } else {
      return;
    }
  }
  return (
    <div className={style.box}>
      <div className={style.messageRestorePassword}>Відновити пароль</div>
      <input
        type="input"
        className={style.inputNicName}
        placeholder="Name"
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
        Відправити дані!
      </button>
      {showButtontoRestorePassword(curUserAccountExist)}
    </div>
  );
};

export default RestorePassword;

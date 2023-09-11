import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { checkUser } from "../../redux/store/usersReducer";

import style from "../LogIn/LogIn.module.scss";

const LogInPage = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setdataToLogIn] = useState({});
  const [canGoToUSerPage, setcanGoToUSerPage] = useState(true);

  const userExist = useSelector((state) => state.toolkit.userExist);
  const database = useSelector((state) => state.toolkit.database);
  const user = useSelector((state) => state.toolkit.user);

  function checkIfAccountExist(obj) {
    if (obj.nicName || !obj.password) {
      dispatch(checkUser(obj));
    }
    setcanGoToUSerPage(false);
  }
  
  return (
    <div className={style.box}>
      {userExist ? (
        <div className={style.enterLogInAndPassword}>
          Введіть логін і пароль
        </div>
      ) : (
        <div className={style.curUserisntExist}>такого користувача немає</div>
      )}
      <button
        className={style.checkBtn}
        onClick={() => checkIfAccountExist(dataToLogIn, database)}
      >
        Провірка акаунту
      </button>
      <form>
        <input
          type="input"
          className={
            !userExist ? style.inputIsNotCorrect : style.inputisCorrect
          }
          placeholder="Нік нейм"
          name="name"
          id="nic-name"
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, nicName: e.target.value });
          }}
        />
        <input
          type="password"
          autoComplete="section-blue shipping address-level2"
          className={
            !userExist ? style.inputIsNotCorrect : style.inputisCorrect
          }
          placeholder="Пароль"
          id="password"
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, password: e.target.value });
          }}
        />
      </form>
      {!userExist ? null : (
        <NavLink
          className={style.btnLogIn}
          to={
            canGoToUSerPage
              ? "/"
              : `/userpage/${user?.name === undefined ? 1 : user?.name}`
          }
        >
          Log in
        </NavLink>
      )}
      <div className={style.haventAccount}>
        немаєте акаунту?
      </div>
      
      <NavLink className={style.toCreateAccount} to="/createAccount">Створити акаунт</NavLink>
      <NavLink className={style.toRestorePassword} to="/restorePassword">Забули пароль?</NavLink>
    </div>
  );
};

export default LogInPage;

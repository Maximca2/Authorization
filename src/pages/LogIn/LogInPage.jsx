import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { checkUser } from "../../redux/store/usersReducer";

import "react-toastify/dist/ReactToastify.css";

import style from "../LogIn/LogIn.module.scss";

const LogInPage = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setdataToLogIn] = useState({});
  const [canGoToUSerPage, setcanGoToUSerPage] = useState(true);
  const [wrongValue, setWrongValue] = useState(true);

  const userExist = useSelector((state) => state.toolkit.userExist);
  const database = useSelector((state) => state.toolkit.database);
  const user = useSelector((state) => state.toolkit.user);

  useEffect(() => {
    if (userExist) {
      setWrongValue(true);
      showMessageSuccess();
      setcanGoToUSerPage(true);
    }
  }, [userExist]);
  const showMessageError = () => {
    toast.error("Такого акаунту немає!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  function showMessageSuccess() {
    toast.success("Ви успішно пройшли ідентифікацію!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  function checkIfAccountExist(obj) {
    if (obj.nicName || !obj.password) {
      dispatch(checkUser(obj));
    }

    setcanGoToUSerPage(false);
    setWrongValue(false);

    if (!canGoToUSerPage) {
      showMessageError();
      setcanGoToUSerPage(true);
    }
  }
  return (
    <div className={style.box}>
      <div className={style.textLogIn}>
        <h1>Log in</h1>
      </div>
      <ToastContainer />
      <div className={style.boxForInp}>
        <form className={style.form}>
          <input
            type="input"
            className={
              !wrongValue ? style.inputIsNotCorrect : style.inputisCorrect
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
              !wrongValue ? style.inputIsNotCorrect : style.inputisCorrect
            }
            placeholder="Пароль"
            id="password"
            onChange={(e) => {
              setdataToLogIn({ ...dataToLogIn, password: e.target.value });
            }}
          />
        </form>
      </div>
      <div className={style.boxForBtn}>
        <NavLink
          onClick={() => checkIfAccountExist(dataToLogIn, database)}
          className={style.btnLogIn}
          to={
            !userExist
              ? "/"
              : `/userpage/${user?.name === undefined ? 1 : user?.name}`
          }
        >
          {!userExist ? "провірка акаунту" : "Log in"}
        </NavLink>
      </div>

      <div className={style.haventAccount}>немаєте акаунту?</div>
      <div className={style.boxForButtons}>
        <NavLink className={style.toCreateAccount} to="/createAccount">
          Створити акаунт
        </NavLink>
        <NavLink className={style.toRestorePassword} to="/restorePassword">
          Забули пароль?
        </NavLink>
      </div>
    </div>
  );
};

export default LogInPage;

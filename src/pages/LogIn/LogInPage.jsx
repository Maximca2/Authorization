import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Button from "../../Komponents/ButtonCollection/Button";
import Tittle from "../../Komponents/TittleColection/Tittle";

import { checkUser } from "../../redux/store/usersReducer";

import "react-toastify/dist/ReactToastify.css";

import style from "../LogIn/LogIn.module.scss";

const showMessageError = () => {
  toast.error("Такого акаунту немає!", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export function checkIfAccountIs(value) {
  if (!value) {
    showMessageError();
  }
}

const LogInPage = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setdataToLogIn] = useState({});
  const [wrongValue, setWrongValue] = useState(true);
  const [redirectNow, setRedirectNow] = useState(false);

  const userExist = useSelector((state) => state.toolkit.userExist);
  const database = useSelector((state) => state.toolkit.database);

  function showMessageSuccess() {
    toast.success("Ви успішно пройшли ідентифікацію!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  function checkIfAccountExist(obj) {
    if (obj.nicName || !obj.password) {
      dispatch(checkUser(obj));
    }

    setWrongValue(false);
  }

  useEffect(() => {
    if (userExist) {
      setWrongValue(true);
      showMessageSuccess();
      setTimeout(() => setRedirectNow(true), 2000);
    }
  }, [userExist]);

  return (
    <div className={style.box}>
      <Tittle style={style.LogIn} value={"Log in"} />
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
        <button
          onClick={() => checkIfAccountExist(dataToLogIn, database)}
          className={style.btnLogIn}
        >
          Log in
        </button>
      </div>
      {redirectNow ? <Navigate replace to={`/`} /> : null}
      <div className={style.haventAccount}>немаєте акаунту?</div>
      <div className={style.boxForButtons}>
        <Button
          color={style.restorePs}
          value={"Створити акаунт?"}
          to="/createAccount"
        />
        <Button
          color={style.createAc}
          value={"Забули пароль?"}
          to="/restorePassword"
        />
      </div>
    </div>
  );
};

export default LogInPage;

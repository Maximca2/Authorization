import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../Components/ButtonCollection/Button";
import Tittle from "../../Components/TittleColection/Tittle";
import Input from "../../Components/InputCollection/Input";

import { checkUser } from "../../redux/store/usersReducer";

import "react-toastify/dist/ReactToastify.css";

import style from "./logIn.module.scss";
import {
  ToastLogIn,
} from "../../Components/ToastCollection/Toast";

let condition = true;

export function checkIfAccountIs(value) {
  if (!value) {
    condition = false;
  }
}

const LogInPage = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setdataToLogIn] = useState({});
  const [wrongValue, setWrongValue] = useState(true);
  const [success, setSuccess] = useState(condition);

  const userExist = useSelector((state) => state.toolkit.userExist);
  const database = useSelector((state) => state.toolkit.database);

  function checkIfAccountExist(obj) {
    if (obj.nicName || !obj.password) {
      setTimeout(() => {
        setWrongValue(true);
      }, 6000);
      dispatch(checkUser(obj));
      setSuccess(true);
    }
    setSuccess(false);
    setWrongValue(false);
  }

  useEffect(() => {
    setTimeout(() => {
      if (!success) {
        setSuccess(true);
      }
    }, 7000);
    if (userExist) {
      setWrongValue(true);
      setSuccess(true);
    }
  }, [userExist, success]);

  return (
    <div className={style.box}>
      {success ? null : <ToastLogIn condition={false} />}
      <Tittle style={style.LogIn} value="Log in" />
      <div className={style.boxForInp}>
        <form className={style.form}>
          <Input
            type="input"
            style={!wrongValue ? style.inputIsNotCorrect : null}
            placeholder="Нік нейм"
            id="nic name"
            onChange={(e) => {
              setdataToLogIn({ ...dataToLogIn, nicName: e.target.value });
            }}
          />
          <Input
            type="password"
            style={!wrongValue ? style.inputIsNotCorrect : null}
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
      <div className={style.haventAccount}>немаєте акаунту?</div>
      <div className={style.boxForButtons}>
        <Button
          style={style.restorePs}
          value={"Створити акаунт?"}
          to="/createAccount"
        />
        <Button
          style={style.createAc}
          value={"Забули пароль?"}
          to="/restorePassword"
        />
      </div>
    </div>
  );
};

export default LogInPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
import { ToastLogIn } from "../../Components/Toast";

import { checkUser } from "../../redux/store/usersReducer";

import style from "./logIn.module.scss";
import "react-toastify/dist/ReactToastify.css";

let condition = true;

export function checkIfAccountIs(value) {
  if (!value) {
    condition = false;
  }
}

const LogInPage = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setDataToLogIn] = useState({});
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
            style={clsx({
              [style.inputIsNotCorrect]: !wrongValue,
            })}
            placeholder="Нік нейм"
            id="nickname"
            onChange={(e) => {
              setDataToLogIn({ ...dataToLogIn, nicName: e.target.value });
            }}
          />
          <Input
            type="password"
            style={clsx({
              [style.inputIsNotCorrect]: !wrongValue,
            })}
            placeholder="Пароль"
            id="password"
            onChange={(e) => {
              setDataToLogIn({ ...dataToLogIn, password: e.target.value });
            }}
          />
        </form>
      </div>
      <div className={style.boxForBtn}>
        <Button
          onClick={() => checkIfAccountExist(dataToLogIn, database)}
          style={style.btnLogIn}
          value={"Log in"}
        ></Button>
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

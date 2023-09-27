import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
import { ToastLogIn } from "../../Components/Toast";

import { checkUser ,checkIfCurrentNickNameExist} from "../../redux/store/usersReducer";

import style from "./LogIn.module.scss";
import "react-toastify/dist/ReactToastify.css";


const LogInPage = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setDataToLogIn] = useState({});
  const [wrongValue, setWrongValue] = useState(true);
  const [success, setSuccess] = useState(true);

  const userExist = useSelector((state) => state.toolkit.userExist);
  const database = useSelector((state) => state.toolkit.database);
  function takeAccess(){
    dispatch(checkIfCurrentNickNameExist())
  }

  function checkIfAccountExist(obj) {
    if (obj.nicName || !obj.password) {
      setTimeout(() => {
        setWrongValue(true);
      }, 2000);
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
    }, 2000);
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
        <button
          onClick={() => checkIfAccountExist(dataToLogIn, database)}
          className={style.btnLogIn}
        >log in</button>
      </div>
      <div className={style.haventAccount}>немаєте акаунту?</div>
      <div className={style.boxForButtons}>
        <Button style={style.restorePs} takeAccess={()=>takeAccess()} to={"/createAccount"} value={'Створити акаунт'}>
          Створити акаунт
        </Button>
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

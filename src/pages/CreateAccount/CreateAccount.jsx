import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

import { checkAllValueInObject } from "../../helpers/helper";

import { ToastCreateAccount } from "../../Components/Toast";
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

import { createAccountUser } from "../../redux/store/usersReducer";

import "react-toastify/dist/ReactToastify.css";

import style from "./createAccount.module.scss";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setDataToLogIn] = useState({});
  const [canLogIn, setCanLogIn] = useState(false);
  const [activeInp, setActiveInp] = useState(true);
  const [success, setSuccess] = useState(false);

  const createAccount = (obj) => {
    if (checkAllValueInObject(obj)) {
      const uniqueToken = uuidv4();
      const objUniqueToken = {
        token: uniqueToken,
        curAccountData: obj,
      };
      setSuccess(true);
      setTimeout(() => {
        setCanLogIn(true);
      }, 2000);
      dispatch(createAccountUser(objUniqueToken));
    } else {
      setActiveInp(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setActiveInp(true);
    }, 5000);
  }, [activeInp]);

  return (
    <div className={style.box}>
      {!activeInp ? (
        <ToastCreateAccount condition={false} value={"Заповніть поля!"} />
      ) : null}
      {success ? (
        <ToastCreateAccount
          condition={true}
          value="Вітаю ви створили акаунт!"
        />
      ) : null}
      <Tittle style={style.createAcc} value="Create Account" />
      <div className={style.inpBox}>
        <Input
          type="input"
          style={clsx({
            [style.active]: !activeInp,
          })}
          placeholder="Name"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, name: e.target.value });
          }}
        />
        <Input
          type="input"
          style={clsx({
            [style.active]: !activeInp,
          })}
          placeholder="LastName"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, lastName: e.target.value });
          }}
        />
        <Input
          type="input"
          style={clsx({
            [style.active]: !activeInp,
          })}
          placeholder="Nic Name"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, nicName: e.target.value });
          }}
        />
        <Input
          type="password"
          style={clsx({
            [style.active]: !activeInp,
          })}
          placeholder="Password"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, password: e.target.value });
          }}
        />
      </div>
      <button
        className={style.createAccountBtn}
        onClick={() => createAccount(dataToLogIn)}
      >
        {canLogIn ? "акаунт створено перейти до логіну" : "Зареєструвати "}
      </button>
      {canLogIn ? <Navigate replace to="/logIn" /> : null}

      <Button className={style.LogInBtn} to="/logIn" value={"Log in"} />
    </div>
  );
};

export default CreateAccount;

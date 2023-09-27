import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";

import {
  setError,
  setSuccess,
} from "../../helpers/helperToCheckIfAccountExist";
import { checkAllValueInObject } from "../../helpers/helper";

import { ToastCreateAccount } from "../../Components/Toast";
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

import { createAccountUser } from "../../redux/store/usersReducer";

import "react-toastify/dist/ReactToastify.css";

import style from "./CreateAccount.module.scss";

export function checkIfCurrentAccountExist(value) {
  if (!value) {
    return setError();
  }
  setTimeout(() => {
    return setSuccess();
  }, 500);
}

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setDataToLogIn] = useState({});
  const [activeInp, setActiveInp] = useState(true);
  const [navigate, setNavigate] = useState(false);

  const canLogIn = useSelector((state) => state.toolkit.canLogIn);

  const createAccount = (obj) => {
    if (checkAllValueInObject(obj)) {
      const uniqueToken = uuidv4();
      const objUniqueToken = {
        token: uniqueToken,
        curAccountData: obj,
      };
      dispatch(createAccountUser(objUniqueToken));
    } else {
      setActiveInp(false);
    }
  };

  useEffect(() => {
    if (canLogIn) {
      setTimeout(() => {
        setNavigate(true);
      }, 2000);
    }
    setTimeout(() => {
      setActiveInp(true);
    }, 2000);
  }, [activeInp, canLogIn]);

  return (
    <div className={style.box}>
      <ToastContainer />
      {!activeInp ? (
        <ToastCreateAccount condition={false} value={"Заповніть поля!"} />
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
        Зареєструвати
      </button>
      {navigate ? <Navigate to="/logIn" /> : null}
      <Button style={style.LogInBtn} to="/logIn" value={"Log in"} />
    </div>
  );
};

export default CreateAccount;

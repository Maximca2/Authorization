import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { isObject } from "./helper";

import { createAccountUser } from "../../redux/store/usersReducer";

import "react-toastify/dist/ReactToastify.css";

import style from "../CreateAccount/CreateAcc.module.scss";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setdataToLogIn] = useState({});
  const [canLogIn, setCanLogIn] = useState(false);
  const [activeInp, setActiveInp] = useState(true);
  const [counter, setCounter] = useState(0);

  const showMessageError = () => {
    toast.error("Заповніть всі поля!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  function showMessageSuccess() {
    toast.success("Ви успішно створили акаунт", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setActiveInp(true);
    }, 400);
  }, [activeInp]);

  const createAccount = (obj) => {
    if (isObject(obj)) {
      setCanLogIn(true);
      dispatch(createAccountUser(obj));
      setCounter((counter) => (counter += 1));
      showMessageSuccess()
    } else {
      setActiveInp(false);
      if(activeInp){
        showMessageError()
      }
    }
  };
  
  return (
    <div className={style.box}>
      <ToastContainer />
      <div className={style.textCreateAccount}>
        <h1>Create Account</h1>
      </div>
      <div className={style.inpBox}>
        <input
          type="input"
          className={!activeInp ? style.active : style.inputField}
          placeholder="Name"
          name="name"
          required
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, name: e.target.value });
          }}
        />
        <input
          type="input"
          className={!activeInp ? style.active : style.inputField}
          placeholder="LasName"
          id="last-name"
          required
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, lastName: e.target.value });
          }}
        />
        <input
          type="input"
          className={!activeInp ? style.active : style.inputField}
          placeholder="Нік нейм"
          name="name"
          id="nic-name"
          required
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, nicName: e.target.value });
          }}
        />
        <input
          type="password"
          className={!activeInp ? style.active : style.inputField}
          autoComplete=""
          placeholder="Password"
          id="password"
          required
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, password: e.target.value });
          }}
        />
      </div>
      <NavLink
        className={style.createAccountBtn}
        to={canLogIn ? "/logInPage" : "/createAccount"}
        onClick={counter === 0 ? () => createAccount(dataToLogIn) : null}
      >
        {canLogIn ? "акаунт створено перейти до логіну" : "Зареєструвати "}
      </NavLink>
      <NavLink className={style.LogInBtn} to={"/logInPage"}>
        Log in
      </NavLink>
    </div>
  );
};

export default CreateAccount;

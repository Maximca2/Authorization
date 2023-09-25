import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { checkAllValueInObject } from "../../helpers/helper";

import { ToastCreateAccount } from "../../Components/ToastCollection/Toast";

import { createAccountUser } from "../../redux/store/usersReducer";

import Tittle from "../../Components/TittleColection/Tittle";
import Input from "../../Components/InputCollection/Input";

import "react-toastify/dist/ReactToastify.css";

import style from "./createAccount.module.scss";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setdataToLogIn] = useState({});
  const [canLogIn, setCanLogIn] = useState(false);
  const [activeInp, setActiveInp] = useState(true);
  const [success, setSuccess] = useState(false);

  const createAccount = (obj) => {
    if (checkAllValueInObject(obj)) {
      const uniquToken = uuidv4();
      const objUniqueToken = {
        token: uniquToken,
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
          style={!activeInp ? style.active : null}
          placeholder="Name"
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, name: e.target.value });
          }}
        />
        <Input
          type="input"
          style={!activeInp ? style.active : null}
          placeholder="LastName"
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, lastName: e.target.value });
          }}
        />
        <Input
          type="input"
          style={!activeInp ? style.active : null}
          placeholder="Nic Name"
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, nicName: e.target.value });
          }}
        />
        <Input
          type="password"
          style={!activeInp ? style.active : null}
          placeholder="Password"
          onChange={(e) => {
            setdataToLogIn({ ...dataToLogIn, password: e.target.value });
          }}
        />
      </div>
      <button
        onClick={() => createAccount(dataToLogIn)}
        className={style.createAccountBtn}
      >
        {canLogIn ? "акаунт створено перейти до логіну" : "Зареєструвати "}
      </button>
      {canLogIn ? <Navigate replace to="/logIn" /> : null}

      <NavLink className={style.LogInBtn} to="/logIn">
        Log in
      </NavLink>
    </div>
  );
};

export default CreateAccount;

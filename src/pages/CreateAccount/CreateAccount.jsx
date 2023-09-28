import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
//helpers
import {
  toastError,
  toastSuccess,
  toastInputIsEmpty,
} from "../../helpers/helperToasts";
import { checkAllValueInObject } from "../../helpers/helper";
//Components
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
//Reducer
import { createAccountUser } from "../../redux/store/usersReducer";
import { fillInputs } from "../../messages";
//message
import { successCreateAccount, accountAlreadyExist } from "../../messages";

//style
import "react-toastify/dist/ReactToastify.css";
import style from "./style.module.scss";

export function checkIfCurrentAccountExist(value) {
  if (!value) {
    return toastError(accountAlreadyExist);
  }
  setTimeout(() => {
    return toastSuccess(successCreateAccount);
  }, 500);
}

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setDataToLogIn] = useState({});
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
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
      setInputIsEmpty(false)
      toastInputIsEmpty(fillInputs)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setInputIsEmpty(true);
    }, 2000);
    if (canLogIn) {
      setTimeout(() => {
        setNavigate(true);
      }, 2000);
    }
  }, [inputIsEmpty, canLogIn]);

  return (
    <div className={style.box}>
      <Tittle style={style.createAcc} value="Create Account" />
      <div className={style.inpBox}>
        <Input
          type="input"
          style={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="Name"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, name: e.target.value });
          }}
        />
        <Input
          type="input"
          style={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="LastName"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, lastName: e.target.value });
          }}
        />
        <Input
          type="input"
          style={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="Nic Name"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, nicName: e.target.value });
          }}
        />
        <Input
          type="password"
          style={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="Password"
          onChange={(e) => {
            setDataToLogIn({ ...dataToLogIn, password: e.target.value });
          }}
        />
      </div>
      <ToastContainer/>
      <Button
        style={style.createAccountBtn}
        onClick={() => createAccount(dataToLogIn)}
        value='Зареєструвати'
      />
      {navigate ? <Navigate to="/logIn" /> : null}
      <Button style={style.LogInBtn} to="/logIn" value={"Log in"} />
    </div>
  );
};

export default CreateAccount;

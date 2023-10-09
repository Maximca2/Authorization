import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
//helpers
import {
  toastError,
  toastSuccess,
  toastInputIsEmpty,
} from "../../helpers";
import { checkAllValueInObject } from "../../helpers/helper";
//Components
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
//Reducer
import {createAccountUser } from "../../redux/store/usersReducer";
//interface
import {CurAccountData} from "../../interface/interface";
//hooks
import { AppSelector } from "../../hooks/hooks";
//message
import { successCreateAccount, accountAlreadyExist } from "../../messages";
import { fillInputs } from "../../messages";
//style
import "react-toastify/dist/ReactToastify.css";
import style from "./style.module.scss";


export function checkIfCurrentAccountExist(value:boolean) {
  
  if (!value) {
    return toastError(accountAlreadyExist);
  }
  setTimeout(() => {
    return toastSuccess(successCreateAccount);
  }, 500);
}

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setDataToLogIn] = useState<CurAccountData|any>({});
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [navigate, setNavigate] = useState(false);

  const canLogIn = AppSelector((state) => state.toolkit.canLogIn);

  const createAccount = (obj:CurAccountData) => {
    if (checkAllValueInObject(obj)) {
      const uniqueToken:string = uuidv4();
      const objUniqueToken:{curAccountData:CurAccountData,token:string} = {
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
      <Tittle wrapperProps={null} tittleProps={null}  styles={style.createAcc} value="Create Account" />
      <div className={style.inpBox}>
        <Input
          type="input"
          styles={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDataToLogIn({ ...dataToLogIn, name: e.target.value });
          } }  id={""}        />
        <Input
          type="input"
          styles={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="LastName"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDataToLogIn({ ...dataToLogIn, lastName: e.target.value });
          } } id={""}        />
        <Input
          type="input"
          styles={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="Nic Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDataToLogIn({ ...dataToLogIn, nicName: e.target.value });
          } } id={""}        />
        <Input
          type="password"
          styles={clsx({
            [style.active]: !inputIsEmpty,
          })}
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDataToLogIn({ ...dataToLogIn, password: e.target.value });
          } }  id={""}        />
      </div>
      <ToastContainer/>
      <Button
        to={null}
        styles={style.createAccountBtn}
        onClick={() => createAccount(dataToLogIn)}
        value='Зареєструвати'
      />
      {navigate ? <Navigate to="/logIn" /> : null}
      <Button styles={style.LogInBtn} to="/logIn" value={"Log in"} onClick={null}/>
    </div>
  );
};

export default CreateAccount;

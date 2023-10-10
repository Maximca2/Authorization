import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import clsx from "clsx";
//Components
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
//hooks
import { AppSelector } from "../../hooks/hooks";
//interface
import { UserData } from "@/interface/interface";
//Reducer
import {
  checkUser,
  checkIfCurrentNickNameExist,
} from "../../redux/store/usersReducer";
//message
import { accountIsntExistOrInputValueIsEmpty } from "../../messages";
//helpers
import { toastInputIsEmpty } from "../../helpers";
//options
import { options } from "../../options/options";

//style
import style from "./style.module.scss";
import "react-toastify/dist/ReactToastify.css";

const LogInPage = () => {
  const dispatch = useDispatch();

  const [dataToLogIn, setDataToLogIn] = useState<UserData>({nicName:'',password:''});
  const [inputIsEmpty, setInputIsEmpty] = useState<boolean>(true);

  const userExist = AppSelector((state) => state.toolkit.userExist);

  function checkIfAccountExist(obj: UserData): void {
    if (obj.nicName || !obj.password) {
      setTimeout(() => {
        setInputIsEmpty(true);
      }, 2000);
      dispatch(checkUser(obj));
    } 
      toastInputIsEmpty(accountIsntExistOrInputValueIsEmpty,options);
      setInputIsEmpty(false);
 
  }

  useEffect(() => {
    if (userExist) {
      setInputIsEmpty(true);
    }
  }, [userExist]);

  return (
    <div className={style.box}>
      <ToastContainer limit={1} />
      <Tittle
        tittleProps={null}
        wrapperProps={null}
        styles={style.logIn}
        value="Log in"
      />
      <div className={style.boxForInp}>
        <form className={style.form}>
          <Input
            type="input"
            styles={clsx({
              [style.isNotValue]: !inputIsEmpty,
            })}
            placeholder="Нік нейм"
            id="nickname"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDataToLogIn({ ...dataToLogIn, nicName: e.target.value });
            }}
          />
          <Input
            type="password"
            styles={clsx({
              [style.isNotValue]: !inputIsEmpty,
            })}
            placeholder="Пароль"
            id="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDataToLogIn({ ...dataToLogIn, password: e.target.value });
            }}
          />
        </form>
      </div>
      <div className={style.boxForBtn}>
        <Button
          to={undefined}
          onClick={() => checkIfAccountExist(dataToLogIn)}
          styles={style.btnLogIn}
          value="Log in"
        ></Button>
      </div>
      <div className={style.haventAccount}>немаєте акаунту?</div>
      <div className={style.boxForButtons}>
        <Button
          styles={style.restorePassword}
          onClick={() => dispatch(checkIfCurrentNickNameExist())}
          to="/createAccount"
          value={"Створити акаунт"}
        ></Button>
        <Button
          styles={style.createAc}
          value="Забули пароль?"
          to="/restorePassword"
          onClick={undefined}
        />
      </div>
    </div>
  );
};

export default LogInPage;

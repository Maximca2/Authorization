import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import clsx from "clsx";
//Components
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import Input from "../../Components/Input";
//Reducer
import { checkUser ,checkIfCurrentNickNameExist} from "../../redux/store/usersReducer";
//message
import { accountIsntExistOrInputValueIsEmpty } from "../../messages";
//helpers
import { toastInputIsEmpty } from "../../helpers/helperToasts";

//style
import style from "./style.module.scss";
import "react-toastify/dist/ReactToastify.css";


const LogInPage = () => {
  const dispatch = useDispatch();
  const [dataToLogIn, setDataToLogIn] = useState({});
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
 
  const userExist = useSelector((state) => state.toolkit.userExist);
  const database = useSelector((state) => state.toolkit.database);

  function checkIfAccountExist(obj) {
    if (obj.nicName || !obj.password) {
      setTimeout(() => {
        setInputIsEmpty(true);
      }, 2000);
      dispatch(checkUser(obj));
    }
    toastInputIsEmpty(accountIsntExistOrInputValueIsEmpty)
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
      <Tittle style={style.logIn} value="Log in" />
      <div className={style.boxForInp}>
        <form className={style.form}>
          <Input
            type="input"
            style={clsx({
              [style.isNotValue]: !inputIsEmpty,
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
              [style.isNotValue]: !inputIsEmpty,
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
          value='Log in'
        >log in</Button>
      </div>
      <div className={style.haventAccount}>немаєте акаунту?</div>
      <div className={style.boxForButtons}>
        <Button style={style.restorePassword} onClick={()=>dispatch(checkIfCurrentNickNameExist())} to="/createAccount" value={'Створити акаунт'}>
          Створити акаунт
        </Button>
        <Button
          style={style.createAc}
          value="Забули пароль?"
          to="/restorePassword"
        />
      </div>
    </div>
  );
};

export default LogInPage;

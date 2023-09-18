import React from "react";
import style from "../MainPage/mainPage.module.scss";
import { NavLink } from "react-router-dom";
import { setLogIn } from "../../redux/store/usersReducer";
import { useDispatch } from "react-redux";
const MainPage = () => {
  
  const dispatch = useDispatch();

  const setLog = ()=>{
    dispatch(setLogIn(false))
  }
  return (
    <div className={style.boxFor}>
      <div className={style.boxbtnHi}>
        <div className={style.messageHi}>Вітаю!</div>
        
        <NavLink to='/logIn' onClick={setLog()}  className={style.btnHi}>Увійти</NavLink>
      </div>
    </div>
  );
};

export default MainPage;

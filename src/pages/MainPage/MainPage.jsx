import React from "react";
import { NavLink } from "react-router-dom";

import style from "../MainPage/mainPage.module.scss";

const MainPage = () => {
  
  return (
    <div className={style.boxFor}>
      <div className={style.boxbtnHi}>
        <div className={style.messageHi}>Вітаю!</div>
        <NavLink to='/logInPage'   className={style.btnHi}>Увійти</NavLink>
      </div>
    </div>
  );
};

export default MainPage;

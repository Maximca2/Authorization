import React from "react";

import Button from "../../Components/Button";
import style from "./MainPage.module.scss";

const MainPage = () => (
  <div className={style.boxFor}>
    <div className={style.boxbtnHi}>
      <div className={style.messageHi}>Вітаю!</div>
      <Button style={style.btnHi} value={"Увійти"} to="/logIn" />
    </div>
  </div>
);

export default MainPage;

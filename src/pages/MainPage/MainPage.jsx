import React from "react";

import Button from "../../Components/Button";
import style from "./style.module.scss";

const MainPage = () => (
  <div className={style.boxFor}>
    <div className={style.boxBtnHi}>
      <div className={style.message}>Вітаю!</div>
      <Button style={style.greetingBtn} value={"Увійти"} to="/logIn" />
    </div>
  </div>
);

export default MainPage;

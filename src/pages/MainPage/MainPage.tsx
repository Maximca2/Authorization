import React from "react";

import Button from "../../Components/Button";
import style from  "./style.module.scss";

const MainPage = () => (
  <div className={style.boxFor}>
    <div className={style.boxBtnHi}>
      <div className={style.message}>Вітаю!</div>
      <Button styles={style.greetingBtn} value={"Увійти"} to="/logIn" onClick={undefined} />
    </div>
  </div>
);

export default MainPage;

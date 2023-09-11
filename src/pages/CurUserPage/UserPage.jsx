import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import style from "../CurUserPage/UserPage.module.scss";

const UserPage = () => {
  const { name } = useParams();
  const [userOut, setuserOut] = useState(true);
  const [userInPage, setuserInPage] = useState(true);

  function setToDef() {
    setuserInPage(false);
    setuserOut(false);
  }

  if ((!userInPage && !userOut) || name === 1) {
    return (
      <div className={style.userOut}>
        <div className={style.message}>Ви не залогінені</div>
        <NavLink
          className={style.createAccountBtn}
          onClick={() => setToDef()}
          to="/logInPage"
        >
          Log in
        </NavLink>
      </div>
    );
  }
  if (userInPage) {
    return (
      <div className={style.userIs}>
        <div className={style.userName}>Привіт {name}</div>
        <div>
          <button className={style.BtnOut} onClick={() => setToDef()}>
            Вийти з акаунту
          </button>
        </div>
      </div>
    );
  }
};

export default UserPage;
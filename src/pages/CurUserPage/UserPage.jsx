import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkIfUserIsOut } from "../../redux/store/usersReducer";

import style from "../CurUserPage/UserPage.module.scss";

const UserPage = () => {

  const dispatch  =useDispatch();
  const { name } = useParams();
  const [userOut, setuserOut] = useState(true);
  const [userInPage, setuserInPage] = useState(true);

  function setToDeffault() {
    setuserInPage(false);
    setuserOut(false);
    userIsOut(false)
  }
  function userIsOut(value){
    dispatch(checkIfUserIsOut(value))
  }

  if ((!userInPage && !userOut) || name === 1) {
    return (
      <div className={style.userOut}>
        <div className={style.message}>Ви не залогінені</div>
        <NavLink
          className={style.createAccountBtn}
          onClick={() => setToDeffault()}
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
          <button className={style.BtnOut} onClick={() => setToDeffault()}>
            Вийти з акаунту
          </button>
        </div>
      </div>
    );
  }
};

export default UserPage;
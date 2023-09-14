import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkIfUserIsOut } from "../../redux/store/usersReducer";

import style from "../CurUserPage/UserPage.module.scss";

const UserPage = () => {
  
  const dispatch = useDispatch();
  const [userOut, setuserOut] = useState(true);
  const [userInPage, setUserInPage] = useState(true);
  const user = useSelector((state) => state.toolkit.user);
  
  function setToDeffault() {
    setuserOut(false);
    userIsOut(false);
  }
  function userIsOut(value) {
    dispatch(checkIfUserIsOut(value));
  }
  useEffect(() => {
    if (localStorage.getItem("CUR_USER_TOKEN") === "[]") {
      setUserInPage(false);
      console.log("Local storage is empty");
    } else {
      setUserInPage(true);
      console.log("Local storage isnt empty");
    }
  }, [userInPage]);

  if (!userOut) {
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
        <div className={style.userName}>Привіт {user?.name}</div>
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

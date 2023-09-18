import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkIfUserIsOut } from "../../redux/store/usersReducer";

import style from "../CurUserPage/UserPage.module.scss";

const UserPage = () => {
  const dispatch = useDispatch();
  const [userOut, setuserOut] = useState(true);
  const [userInPage, setUserInPage] = useState(true);
  const user = useSelector((state) => state.toolkit.user);

  function setToDeffault() {
    setTimeout(()=>{
      setuserOut(false);
    },2000)
    
    
    userIsOut(false);
  }
  function userIsOut(value) {
    dispatch(checkIfUserIsOut(value));
  }
  useEffect(() => {
    if (localStorage.getItem("CUR_USER_TOKEN") === "[]") {
      setUserInPage(false);
    } else {
      setUserInPage(true);
    }
  }, [userInPage]);

  if (!userOut) {
    return (
      <div className={style.userOut}>
        <div className={style.message}>Ви не залогінені</div>
        <NavLink
          className={style.createAccountBtn}
          onClick={() => setToDeffault()}
        >
          Log in
        </NavLink>
        <Navigate replace to='/logIn'/>
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

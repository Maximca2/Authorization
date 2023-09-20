import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkIfUserIsOut } from "../../redux/store/usersReducer";

import { CUR_USER_TOKEN } from "../../redux/store/usersReducer";

import style from "../InfoPage/infoPage.module.scss";

const InfoPage = () => {
  const dispatch = useDispatch();
  const [userOut, setuserOut] = useState(true);
  const [userInPage, setUserInPage] = useState(true);
  const user = useSelector((state) => state.toolkit.user);
  

  function setToDeffault() {
    setTimeout(() => {
      userIsOut();
      setuserOut(false);
    }, 2000);
  }
  function userIsOut() {
    dispatch(checkIfUserIsOut());
  }
  useEffect(() => {
    if (localStorage.getItem(CUR_USER_TOKEN)) {
      setUserInPage(true);
    } 
    setUserInPage(true);
    
  }, [userInPage]);

  if (!userOut) {
    return (
      <div className={style.userOut}>
        <div className={style.message}>Ви не залогінені</div>
        <NavLink to="/logInPage">Log in</NavLink>
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

export default InfoPage;

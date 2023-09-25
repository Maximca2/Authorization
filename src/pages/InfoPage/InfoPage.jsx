import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkIfUserIsOut } from "../../redux/store/usersReducer";

import { CUR_USER_TOKEN } from "../../redux/store/usersReducer";

import style from "./infoPage.module.scss";

const InfoPage = () => {
  const dispatch = useDispatch();
  const [userInPage, setUserInPage] = useState(false);
  const user = useSelector((state) => state.toolkit.user);

  function setToDefault() {
    userIsOut();
    
  }
  function userIsOut() {
    dispatch(checkIfUserIsOut());
  }
  useEffect(() => {
    if (localStorage.getItem(CUR_USER_TOKEN)) {
      setUserInPage(true);
    }
  }, [userInPage]);

  if (userInPage) {
    return (
      <div className={style.userIs}>
        <div className={style.userName}>Привіт {user?.name}</div>
        <div>
          <button className={style.BtnOut} onClick={() => setToDefault()}>
            Вийти з акаунту
          </button>
        </div>
      </div>
    );
  }
};

export default InfoPage;

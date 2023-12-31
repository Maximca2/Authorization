import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//reducer
import { checkIfUserIsOut } from "../../redux/store/usersReducer";
import { CUR_USER_TOKEN } from "../../redux/store/usersReducer";
//style
import style from "./style.module.scss";
import Button from "../../Components/Button";

const InfoPage = () => {
  const dispatch = useDispatch();
  const [userInPage, setUserInPage] = useState(false);
  const user = useSelector((state) => state.toolkit.user);

  function setToDefault() {
    setUserOut();
  }

  function setUserOut() {
    dispatch(checkIfUserIsOut());
  }

  useEffect(() => {
    if (localStorage.getItem(CUR_USER_TOKEN)) {
      setUserInPage(true);
    }
  }, [userInPage]);

  if (userInPage) {
    return (
      <div className={style.box}>
        <div className={style.userName}>Привіт {user?.name}</div>
        <div>
          <Button style={style.BtnOut} onClick={() => setToDefault()} value='Вийти з акаунту'/>
        </div>
      </div>
    );
  }
};

export default InfoPage;

import React from "react";
import MainPage from "../../pages/MainPage";

import { CUR_USER_TOKEN } from "../../redux/store/usersReducer";

import { Navigate } from "react-router";


const Private = (props:any|unknown) => {
  const token = localStorage.getItem(CUR_USER_TOKEN);

  return token ? <Navigate to="/" replace={true} /> : <MainPage />;
};

export default Private;



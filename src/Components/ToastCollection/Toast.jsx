import React from "react";
import { toast, ToastContainer } from "react-toastify";

export const ToastLogIn = ({condition}) => {
  let cond = condition;

  return (
    <ToastContainer limit={1}>
        
      {!cond
        ? toast.error("Такого акаунту немає aбо ви не заповнили поля!", {
            position: toast.POSITION.TOP_RIGHT,
          })
        : null}

      
    </ToastContainer>
  );
};


export const ToastRestorePassword = ({condition,value}) => {
  let cond = condition;

  return (
    <ToastContainer limit={1}>
        
      {cond
        ? toast.success(value, {
            position: toast.POSITION.TOP_RIGHT,
          })
        : null}

      
    </ToastContainer>
  );
};


export const ToastCreateAccount = ({condition,value}) => {
  let cond = condition;

  return (
    <ToastContainer limit={1}>
        
      {cond
        ? toast.success(value, {
            position: toast.POSITION.TOP_RIGHT,
          })
        : toast.error(value, {
          position: toast.POSITION.TOP_RIGHT,
        })}

      
    </ToastContainer>
  );
};

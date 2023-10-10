import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";


type ButtonProps = {
  styles: string,
  value: string,
  to:string,
  onClick: (params: any) => any,
}


const  Button = ({styles, value, to ,onClick}:ButtonProps)=> {
  if (to) {
    return (
      <NavLink onClick={onClick}  className={`button ${styles}`} to={to}>
        {value}
      </NavLink>
    );
  }
  return <button onClick={onClick} className={`button ${styles}`}>{value}</button>;
}

export default Button;

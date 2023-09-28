import { NavLink } from "react-router-dom";

import "./style.scss";

function Button({ style, value, to ,onClick}) {
  if (to) {
    return (
      <NavLink onClick={onClick}  className={`button ${style}`} to={to}>
        {value}
      </NavLink>
    );
  }
  return <button onClick={onClick} className={`button ${style}`}>{value}</button>;
}

export default Button;

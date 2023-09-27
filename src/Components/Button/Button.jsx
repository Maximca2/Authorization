import { NavLink } from "react-router-dom";

import "./style.scss";

function Button({ style, value, to ,takeAccess}) {
  if (to) {
    return (
      <NavLink onClick={takeAccess}  className={`button ${style}`} to={to}>
        {value}
      </NavLink>
    );
  }
  return <button className={`button ${style}`}>{value}</button>;
}

export default Button;

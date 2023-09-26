import { NavLink } from "react-router-dom";

import "./style.scss";

function Button({ style, value, to }) {
  if (to) {
    return (
      <button className={`button ${style}`}>
        <NavLink className="text-none" to={to}>
          {value}
        </NavLink>
      </button>
    );
  }
  return <button className={`button ${style}`}>{value}</button>;
}

export default Button;

import { NavLink } from "react-router-dom";

import "./button.css";

function Button({ color, value, to }) {
  return (
    <button className={color}>
      <NavLink className={"text-none"} to={to}>
        {value}
      </NavLink>
    </button>
  );
}

export default Button;

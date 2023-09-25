import { NavLink } from "react-router-dom";

import "./style.scss";

function Button({ style, value, to }) {
  return (
    <button className={style}>
      <NavLink className="text-none" to={to}>
        {value}
      </NavLink>
    </button>
  );
}

export default Button;

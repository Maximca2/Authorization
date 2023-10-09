import React from "react";

const Tittle = ({ value, style ,wrapperProps = {},tittleProps={}}) => (
  <div  className={style} {...wrapperProps} >
    <h1 {...tittleProps}>{value}</h1>
  </div>
);

export default Tittle;

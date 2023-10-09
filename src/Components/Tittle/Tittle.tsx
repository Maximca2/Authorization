import React from "react";


interface TittleProps{
  value:string,
  styles:string,
  wrapperProps:object,
  tittleProps:object,
}

const Tittle = ({ value, styles ,wrapperProps = {},tittleProps={}}:TittleProps) => (
  <div  className={styles} {...wrapperProps} >
    <h1 {...tittleProps}>{value}</h1>
  </div>
);

export default Tittle;

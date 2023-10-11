import React from "react";


interface TittleProps{
  value:string,
  styles:string,
  wrapperProps:React.HTMLAttributes<HTMLElement>,
  tittleProps:React.HTMLAttributes<HTMLElement>,
}

const Tittle = ({ value, styles ,wrapperProps = {},tittleProps={}}:TittleProps) => (
  <div  className={styles} {...wrapperProps} >
    <h1 {...tittleProps}>{value}</h1>
  </div>
);

export default Tittle;

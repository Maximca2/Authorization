import React from 'react';

import './style.scss';

const Input = ({type,style ,placeholder,id ,onChange}) => (
    <input className={style} autoComplete=' ' type={type} id={id} placeholder={placeholder} onChange={onChange}/>
)

export default Input;
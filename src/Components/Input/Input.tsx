import React from 'react';
import clsx from 'clsx';
import './style.scss';

interface InputProps{
    type?:string
    styles?:string,
    placeholder?:string,
    id?:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    
  }
const Input = ({styles,type,...someProps}:InputProps) => (
    <input className={clsx('def-input-class',styles)} type={type} {...someProps}/>
)

export default Input;
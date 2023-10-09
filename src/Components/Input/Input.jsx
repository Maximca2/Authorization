import React from 'react';
import clsx from 'clsx';

import './style.scss';

const Input = ({style, ...inputProps}) => (
    <input className={clsx('def-input-class',style)} autoComplete=' ' {...inputProps}/>
)

export default Input;
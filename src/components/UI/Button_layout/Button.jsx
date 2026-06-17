import React from 'react';
import cl from '../Button_layout/Button.module.css'


function Button({...props}){
    return(
        <input {...props} type={'button'}  className={cl.button}/>
    )
}

export default Button;
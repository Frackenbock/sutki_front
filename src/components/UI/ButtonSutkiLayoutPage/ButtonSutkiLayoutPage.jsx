import React from 'react';
import cl from '../ButtonSutkiLayoutPage/ButtonSutkiLayoutPage.module.css'


function ButtonSutkiLayoutPage({...props}){
    return(
        <input {...props} type={'button'}  className={cl.button}/>
    )
}

export default ButtonSutkiLayoutPage;
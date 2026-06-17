import React from "react";
import cl from './modal.module.css';

function Modal({children,visible,setVisible,onLoad}){
    const rootClasses = [cl.mymodal];
    if(visible){
        rootClasses.push(cl.mymodalactive)
    }
    if(onLoad){
        return(
            <div className={rootClasses.join(' ')} onLoad={onLoad()} 
                 onClick={()=>{
                    setVisible(false);
                 }}>
                <div className={cl.mymodalContent} onClick={(e)=>{
                    e.stopPropagation()
                }}>
                    {children}
                </div>
            </div> 
        )
    }else{
        return(
            <div className={rootClasses.join(' ')}
                 onClick={()=>{
                    setVisible(false);
                 }}>
                <div className={cl.mymodalContent} onClick={(e)=>{
                    e.stopPropagation()
                }}>
                    {children}
                </div>
            </div> 
        )
    }

}

export default Modal;
//Используется в SrednRashodSutki, HourRashodVSP, HourZnachNapor
import React from "react";
import classes from "./SelectDiapazoneDate.module.css";

function SelectDiapazonDate(props){
    return(
        <div className={classes.divMainDiapazoneDate}>
            <span >{"Выгрузить данные с "}</span> 
            <input className={classes.inputDate} type={"date"} value={props.dateBegin} onChange={(e)=>{props.changeDateBegin(e)}}/> 
            <span >{" по "}</span>
            <input className={classes.inputDate} type={"date"} value={props.dateEnd} onChange={(e)=>{props.changeDateEnd(e)}}/>
            <span >{" "}</span>
            <button className={classes.buttonReadBD} onClick={()=>{props.readBD()}}
            >{props.text}</button>
        </div>
    )
}

export default SelectDiapazonDate
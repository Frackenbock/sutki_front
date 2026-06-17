import React from 'react';
import classes from '../MainTableRight/MainTableRight.module.css'

function MainTableRight({summPowers,totalPower,summRashods,totalRashod,summStoks,totalStok,udelnRashod}){

    return(
      <table  className={classes.tableRight}>
      <colgroup>
            <col span={"2"} style={{backgroundColor:"white"}}></col>
            <col span={"2"} style={{backgroundColor:"lightgrey"}}className="chetn"></col>
            <col span={"2"} style={{backgroundColor:"wheat"}}></col>
      </colgroup>
      <thead>
         <tr>
            <th>{"Сток"}</th>
            <th>{"Расход"}</th>
            <th>{"Выработка"}</th>
         </tr>
         <tr>
             <td>{"Млн м3"}</td><td>{"м3/c"}</td><td>{"МВт"}</td>
         </tr>
      </thead>
      <tbody className={classes.tbodyTableRight}>
         {summPowers.map((str)=>{
            return(
            <tr key={str.number}>
               <td>{summStoks[str.number-1].summ}</td><td>{summRashods[str.number-1].summ}</td><td>{str.power}</td>
            </tr>
            )
         })}
      </tbody>
      <tfoot >
      <tr>
         <td>{"Млн м3"}</td><td>{"м3/с"}</td><td>{"МВтч"}</td>
      </tr>
      <tr>
        <td>{totalStok}</td>
        <td>{totalRashod}</td>
        <td>{totalPower}</td>
     </tr>
      <tr style={{backgroundColor:"white"}}>
        <td>{"Уд. расход"}</td>
        <td>{udelnRashod}</td>
        <td></td>
     </tr>
      </tfoot>
   </table>
    )
}

export default MainTableRight;
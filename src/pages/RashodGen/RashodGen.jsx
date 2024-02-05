import React from "react";
import cl from "./RashodGen.module.css";
import { useSelector } from "react-redux";

function  RashodGen() {
   const rashodData = useSelector((state)=>{return state.rashod.rashodData})
   const totalRashod = useSelector((state)=>{return state.rashod.totalRashod})
   const sumGenRashod = useSelector((state)=>{return state.rashod.sumGenRashod})
   const rashodTitleTable = useSelector((state)=>{return state.rashod.rashodTitleTable})

   return (
    <div className={cl.divMainRashodGen}>

      <div className={cl.divTitlePage}>{rashodTitleTable}</div>
       <table className={cl.tableRashodGen}>
          <colgroup>
               <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}} ></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}} ></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}} ></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
          </colgroup>
          <thead className={cl.theadTableRashod}>
            <tr>
               <th  style={{backgroundColor:"lightgreen"}} className={cl.thRashodGen}>№ Часа</th>
               <th className={cl.thRashodGen}>Интервал</th>
               <th className={cl.thRashodGen}>Г1 м3/c</th>
               <th className={cl.thRashodGen}>Г2 м3/c</th>
               <th className={cl.thRashodGen}>Г3 м3/c</th>
               <th className={cl.thRashodGen}>Г4 м3/c</th>
               <th className={cl.thRashodGen}>Г5 м3/c</th>
               <th className={cl.thRashodGen}>Г6 м3/c</th>
               <th className={cl.thRashodGen}>Г7 м3/c</th>
               <th className={cl.thRashodGen}>Г8 м3/c</th>
               <th className={cl.thRashodGen}>Сумма м3/c</th>
            </tr>
          </thead>
          <tbody>
            {rashodData.map((str)=>{
               return(
               <tr key={str.number}>
                  <td>{str.number}</td>
                  <td>{str.time}</td>
                  <td>{str.gen1}</td>
                  <td>{str.gen2}</td>
                  <td>{str.gen3}</td>
                  <td>{str.gen4}</td>
                  <td>{str.gen5}</td>
                  <td>{str.gen6}</td>
                  <td>{str.gen7}</td>
                  <td>{str.gen8}</td>
                  <td>{str.summ}</td>
               </tr>
               )
            })}
         </tbody>
         <tfoot className={cl.tfootTableRashod}>
            <tr>
               <td></td>
               <td>{"Итог"}</td>
               <td>{sumGenRashod[0]}</td>
               <td>{sumGenRashod[1]}</td>
               <td>{sumGenRashod[2]}</td>
               <td>{sumGenRashod[3]}</td>
               <td>{sumGenRashod[4]}</td>
               <td>{sumGenRashod[5]}</td>
               <td>{sumGenRashod[6]}</td>
               <td>{sumGenRashod[7]}</td>
               <td>{totalRashod}</td>
            </tr>
         </tfoot>
       </table>
    </div>
   )
}
export default RashodGen;

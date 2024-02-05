import React from "react";
import cl from "./StokGen.module.css";
import { useSelector } from "react-redux";

function  StokGen() {
   const stokData = useSelector((state)=>{return state.stok.stokData});
   const totalStok = useSelector((state)=>{return state.stok.totalStok});
   const sumGenStok = useSelector((state)=>{return state.stok.sumGenStok});
   const stokTitleTable = useSelector((state)=>{return state.stok.stokTitleTable});
   return (
    <div className={cl.divMainStokGen}>
      <div className={cl.divTitleStok}>{stokTitleTable}</div>
       <table className={cl.tableStokGen}>
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
          <thead className={cl.theadStokGen}>
          <tr>
               <th className={cl.thStokGen}>№ Часа</th>
               <th className={cl.thStokGen}>Интервал</th>
               <th className={cl.thStokGen}>Г1 Млн. м3</th>
               <th className={cl.thStokGen}>Г2 Млн. м3</th>
               <th className={cl.thStokGen}>Г3 Млн. м3</th>
               <th className={cl.thStokGen}>Г4 Млн. м3</th>
               <th className={cl.thStokGen}>Г5 Млн. м3</th>
               <th className={cl.thStokGen}>Г6 Млн. м3</th>
               <th className={cl.thStokGen}>Г7 Млн. м3</th>
               <th className={cl.thStokGen}>Г8 Млн. м3</th>
               <th className={cl.thStokGen}>Сумма Млн. м3</th>
            </tr>
          </thead>
          <tbody>
            {stokData.map((str)=>{
               return(
               <tr key={str.number}>
                  <td>{str.number}</td><td>{str.time}</td><td>{str.gen1}</td>
                  <td>{str.gen2}</td><td>{str.gen3}</td><td>{str.gen4}</td>
                  <td>{str.gen5}</td><td>{str.gen6}</td><td>{str.gen7}</td>
                  <td>{str.gen8}</td><td>{str.summ}</td>
               </tr>)
            })}
         </tbody>
         <tfoot className={cl.tfootStokGen}>
            <tr>
               <td></td><td>{"Итог"}</td><td>{sumGenStok[0]}</td>
               <td>{sumGenStok[1]}</td><td>{sumGenStok[2]}</td>
               <td>{sumGenStok[3]}</td><td>{sumGenStok[4]}</td>
               <td>{sumGenStok[5]}</td><td>{sumGenStok[6]}</td>
               <td>{sumGenStok[7]}</td><td>{totalStok}</td>
            </tr>
         </tfoot>
       </table>
    </div>
   )
}

export default StokGen;

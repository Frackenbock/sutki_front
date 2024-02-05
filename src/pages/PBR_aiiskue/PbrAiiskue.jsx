import React from 'react';
import cl from './PBR_aiiskue.module.css';
import Button from "../../components/UI/Button_layout/Button";
import {useNavigate } from "react-router-dom";
import normalizeDate from '../../utils/normalizeDate';
import fetchPbrAiiskue from '../../API/fetchPbrAiiskue';
import TRPBR from '../../components/UI/TRPBR/TRPBR';
import { useSelector,useDispatch } from "react-redux";

function PBR_aiiskue (){
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const date = useSelector((state)=>{return  state.sutki.date });
   const BigArr = useSelector((state)=>{return  state.aiisPbr.arrPbrAiis });
   const tableTitle = useSelector((state)=>{return  state.aiisPbr.titleForAiisPbrTable });
   const flagPowerButtonClick = useSelector((state)=>{return  state.aiisPbr.flagPowerButtonClick });
   const fetchPbrAiis = new fetchPbrAiiskue();

   function getDataPower(){
      const normDate = {
         date: normalizeDate(date),
      };

      fetchPbrAiis.getDataPower(normDate)
      .then((data)=>{
         dispatch({type:"CHANGE_AIIS_PBR",payload:data.data});
         dispatch({type:"CHANGE_AIIS_FOR_CHART",payload:data.arrAIIS});
         dispatch({type:"CHANGE_PBR_FOR_CHART",payload:data.arrPBR});
         dispatch({type:"CHANGE_TITLE_FOR_CHART",payload:`График мощности за ${normalizeDate(date)}`});
         dispatch({type:"CHANGE_TITLE_FOR_TABLE",payload:`Данные мощности за ${normalizeDate(date)}`});
      });
   };
   
   function getDataProduction(){
      const normDate = {
         date: normalizeDate(date),
      };
      fetchPbrAiis.getDataProduction(normDate)
      .then((data)=>{
         dispatch({type:"CHANGE_AIIS_PBR",payload:data.data});
         dispatch({type:"CHANGE_AIIS_FOR_CHART",payload:data.arrAIIS});
         dispatch({type:"CHANGE_PBR_FOR_CHART",payload:data.arrPBR});
         dispatch({type:"CHANGE_TITLE_FOR_CHART",payload:`График выработки за ${normalizeDate(date)}`});
         dispatch({type:"CHANGE_TITLE_FOR_TABLE",payload:`Данные выработки за ${normalizeDate(date)}`});
      });
   };

    return (
        <div className={cl.Pbr_Aiis}>
         <span style={{fontSize:"1.8vw"}}>{tableTitle}</span>
         <table>
            <colgroup>
               <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"1"} style={{backgroundColor:"lightyellow"}} ></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
               <col span={"1"} style={{backgroundColor:"white"}} ></col>
               <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"1"} style={{backgroundColor:"lightyellow"}}></col>
               <col span={"1"} style={{backgroundColor:"white"}} ></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
            </colgroup>
          <thead>
          <tr>
               <th className={cl.Pbr_Aiis_th} >Время</th>
               <th className={cl.Pbr_Aiis_th}>ПБР</th>
               <th className={cl.Pbr_Aiis_th}>АИИСКУЭ</th>
               <th className={cl.Pbr_Aiis_th}>Разница МВт</th>
               <th className={cl.Pbr_Aiis_th}>Небаланс %</th>
               <th className={[cl.Pbr_Aiis_th,cl.middleLineHat].join(' ')}>Время</th>
               <th className={cl.Pbr_Aiis_th}>ПБР</th>
               <th className={cl.Pbr_Aiis_th}>АИИСКУЭ</th>
               <th className={cl.Pbr_Aiis_th}>Разница МВт</th>
               <th className={cl.Pbr_Aiis_th}>Небаланс %</th>
            </tr>
          </thead>
          <tbody>
            {BigArr.map((dataStroka)=>
               <TRPBR key={dataStroka.timeBefore} data ={dataStroka} flagPowerData={flagPowerButtonClick}>
               </TRPBR>
            )}
            
         </tbody>
       </table>
       <div>
         <Button 
               value = {`Мощность за ${normalizeDate(date)}`} 
               onClick = {()=>{
                  getDataPower();
                  dispatch({type:"CHANGE_FLAG_POWER_BUTTON_CLICK",payload:true});
               }}
               
         ></Button> 
         <Button 
               value = {`Выработка за ${normalizeDate(date)}`} 
               onClick = {()=>{
                  getDataProduction();
                  dispatch({type:"CHANGE_FLAG_POWER_BUTTON_CLICK",payload:false});
               }}
         ></Button> 
       </div>
        <Button
              value={"Графики ПБР АИИСКУЭ"}
              onClick={() => {
                navigate("/charts");
              }}
          />
      </div>
    )
};

export default PBR_aiiskue;

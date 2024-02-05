import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import cl from "./Charts.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import normalizeDataForCharts from '../../utils/normalizeDataForCharts'
import normalizeDate from "../../utils/normalizeDate";
import fetchPbrAiiskue from '../../API/fetchPbrAiiskue';

function  Charts() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const arrAIISforChart = useSelector((state)=>{return  state.aiisPbr.arrAIISforChart});
   const titleForCharts = useSelector((state)=>{return  state.aiisPbr.titleForCharts});
   const arrPBRforChart = useSelector((state)=>{return  state.aiisPbr.arrPBRforChart});
   const dataForCharts= normalizeDataForCharts(arrPBRforChart,arrAIISforChart);
   const date = useSelector((state)=>{return  state.sutki.date });
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
         dispatch({type:"CHANGE_FLAG_POWER_BUTTON_CLICK",payload:true});
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
         dispatch({type:"CHANGE_FLAG_POWER_BUTTON_CLICK",payload:false});
      });
   };
   
   return (
      <div className={cl.chartCont}>
         <div className={cl.buttonTitle}>
            <button 
               className={cl.buttonChart}
               onClick={()=>{navigate("/pbr_aiiskue")}}
            > {`Возврат к таблице`}</button> 
            <span className={cl.titleChart}>{titleForCharts}</span>
            <div className={cl.divButtonsChart}>
               <button 
               className={cl.buttonChart}
                  onClick = {getDataPower}
               > {`Мощность за ${normalizeDate(date)}`}</button> 
               <button 
               className={cl.buttonChart}
                  onClick = {getDataProduction}
               > {`Выработка за ${normalizeDate(date)}`}</button> 
            </div>
         </div>
         <LineChart
               width={1700}
               height={900}
               data={dataForCharts.arr}
               margin={{
               top: 20,
               bottom: 50
               }}
            >
                  <CartesianGrid strokeDasharray="3 4" />
                  <XAxis dataKey="name"/>
                  <YAxis domain={dataForCharts.domain}/>
                  <Tooltip />
                  <Legend />
                  <Line
                     type="monotone"
                     dataKey="PBR"
                     stroke="#8884d8"
                     activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="AIISKUE" stroke="#82ca9d" />
         </LineChart>
      </div>
   )
}

export default Charts;







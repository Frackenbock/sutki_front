import React, {useState} from "react";
import SelectDiapazonDate from "../../components/UI/SelectDiapazonDate/SelectDiapazonDate";
import classes from './RashodStokVirab.module.css'
import fetch from '../../API/fetchAdmin'
import { useSelector,useDispatch } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import normalizeDate from "../../utils/normalizeDate";

function  RashodStokVirab() {
   const fetchAdmin= new fetch()
   const dispatch = useDispatch();
   const [dateBeginDiapazone,dateBeginDiapazon] = useState('')
   const [dateEndDiapazone,setDateEndDiapazone] = useState('')
   const arrData = useSelector((state)=>{return  state.rashodStokVirab.arrData;});
   const virabData = useSelector((state)=>{return  state.rashodStokVirab.virabData;});
   const stokData = useSelector((state)=>{return  state.rashodStokVirab.stokData;});
   const rashodData = useSelector((state)=>{return  state.rashodStokVirab.rashodData;});
   const titleDates = useSelector((state)=>{return  state.rashodStokVirab.titleDates;});
   const [typeSort,setTypeSort]=useState('')
   const options =[
      {type:'up', text:'По возрастанию расхода и стока'},
      {type:'down', text:'По убыванию расхода и стока'},
      {type:'up_vir', text:'По возрастанию выработки'},
      {type:'down_vir', text:'По убыванию выработки'},
   ]

   function changeDateBeginDiapazon(e){
      dateBeginDiapazon(e.target.value)
   }

   function changeDateEndDiapazon(e){
      setDateEndDiapazone(e.target.value)
   }

   function readBDRashod(){
      if(dateBeginDiapazone!==''&&dateEndDiapazone!==''){
         const data = {
            dateBeginDiapazone:dateBeginDiapazone,
            dateEndDiapazone:dateEndDiapazone
         }
         fetchAdmin.getDataRashods(data)
         .then((data)=>{
            let arr=[]
            let summVirab=0;
            let summStok=0;
            let allRashod=0;
            for(let i=0;i<data.length;i++){
               summVirab=Number(summVirab)+Number(data[i].value_virabotka.replace(",","."))
               summStok=Number(summStok)+Number(data[i].value_stok.replace(",","."))
               allRashod=Number(allRashod)+Number(data[i].value_rashod.replace(",","."))
               arr.push({
                  stok:Number(data[i].value_stok.replace(",",".")).toFixed(1),
                  date: data[i].date,
                  rashod:Number(data[i].value_rashod.replace(",",".")),
                  virabotka:Number(data[i].value_virabotka.replace(",",".")).toFixed(2),
               })
            }
            dispatch({type:"CHANGE_RASHOD_STOK_VIRAB_ARR",payload:arr});
            dispatch({type:"CHANGE_TOTAL_VIRAB_DATA",payload:`Суммарная выработка за выбранный период: ${summVirab.toFixed(3)} тыс. кВт*ч`});
            dispatch({type:"CHANGE_TOTAL_STOK_DATA",payload:`Суммарный сток за выбранный период: ${summStok.toFixed(1)} Млн м3`});
            dispatch({type:"CHANGE_TOTAL_RASHOD_DATA",payload:`Средний расход за выбранный период ${Math.round(allRashod/data.length)} м3/с`});
         })
      }
      setTypeSort('')
      dispatch({type:"CHANGE_RASHOD_STOK_VIRAB_DATES",payload:`Данные выгружены за период с ${ normalizeDate(dateBeginDiapazone)} по ${normalizeDate(dateEndDiapazone)}`});
   }

   function setSort(e){ 
      setTypeSort(e.target.value)
      if(e.target.value==='up'){
         dispatch({type:"CHANGE_RASHOD_STOK_VIRAB_ARR",payload:[...arrData.sort((a,b)=>a['rashod']-b['rashod'])]});
      }
      if(e.target.value==='down'){
         dispatch({type:"CHANGE_RASHOD_STOK_VIRAB_ARR",payload:[...arrData.sort((a,b)=>b['rashod']-a['rashod'])]});
      }
      if(e.target.value==='up_vir'){
         dispatch({type:"CHANGE_RASHOD_STOK_VIRAB_ARR",payload:[...arrData.sort((a,b)=>a['virabotka']-b['virabotka'])]});
      }
      if(e.target.value==='down_vir'){
         dispatch({type:"CHANGE_RASHOD_STOK_VIRAB_ARR",payload:[...arrData.sort((a,b)=>b['virabotka']-a['virabotka'])]});
      }
   }
   return (
      <div className={classes.cont}>
         <span style={{fontSize:'x-large',marginBottom:'1%'}}>{"Данные среднесуточного расхода, стока и выработки"}</span>
         <SelectDiapazonDate 
            dateBegin = {dateBeginDiapazone}
            dateEnd = {dateEndDiapazone}
            changeDateBegin={changeDateBeginDiapazon}
            changeDateEnd={changeDateEndDiapazon}
            readBD={readBDRashod}
            text = {"Прочитать БД"}/>
         <span style={{fontSize:'large',marginLeft:"-65%"}}>{titleDates}</span>
         <div className={classes.otobr}>
            <div>
               <div style={{marginBottom:'5%'}}>
                  <select
                     value={typeSort}
                     onChange={(e)=>{
                        setSort(e)
                     }}>
                     <option disabled value=''>Сортировка по ...</option>
                     {options.map((option)=>{
                        return(
                           <option key={option.text} value = {option.type} >{option.text}</option>
                        )
                     })}
                  </select>
               </div>
               <div className={classes.scroll_table}>
                  <table>
                     <thead>
                        <tr style={{fontSize:"95%"}}>
                           <th><span style={{paddingLeft:"30%"}}>Дата</span></th>
                           <th><span style={{paddingLeft:"15%"}}>Расход(м3/c)</span></th>
                           <th><span style={{paddingLeft:"3%"}}>Сток(Млн м3)</span></th>
                           <th >Выр-ка(тыс.кВт*ч)</th>
                        </tr>
                     </thead>
                  </table>
                  <div className={classes.scroll_table_body}>
                     <table >
                        <tbody>
                           {
                              arrData.map((str)=>{
                                 return(
                                    <tr key={str.date}>
                                       <td>{str.date}</td>
                                       <td>{str.rashod}</td>
                                       <td>{String(str.stok).replace(".",",")}</td>
                                       <td>{String(str.virabotka).replace(".",",")}</td>
                                    </tr>
                                 )
                              })
                           }
                        </tbody>
                        <tfoot></tfoot>
                     </table>
                  </div>
                  <hr></hr>
                  <span style={{fontSize:'0.8vw'}}>{virabData}</span><br/>
                  <span style={{fontSize:'0.8vw',marginBottom:'5%'}}>{stokData}</span><br/>
                  <span style={{fontSize:'0.8vw'}}>{rashodData}</span>
               </div>
            </div>
            <div>
               <div>
                  <span style={{fontSize:'large',marginLeft:"40%"}}>{"График среднесуточного расхода"}</span>
                  <LineChart
                     width={1100}
                     height={400}
                     data={arrData}
                     margin={{top: 20, bottom: 10}}
                  >
                        <CartesianGrid strokeDasharray="3 4" />
                        <XAxis dataKey="date"/>
                        <YAxis domain={[0,5000]}/>
                        <YAxis domain={[0,5000]}/>
                        <Tooltip />
                        <Legend />
                        <Line
                           type="monotone"
                           dataKey="rashod"
                           stroke="#8884d8"
                           activeDot={{ r: 8 }}
                        />
                  </LineChart>
               </div>

               <div>
                  <span style={{fontSize:'large',marginLeft:"45%"}}>{"График выработки"}</span>
                  <LineChart
                     width={1100}
                     height={400}
                     data={arrData}
                     margin={{top: 20, bottom: 10}}
                  >
                        <CartesianGrid strokeDasharray="3 4" />
                        <XAxis dataKey="date"/>
                        <YAxis domain={[0,12000]}/>
                        <Tooltip />
                        <Legend />
                        <Line
                           type="monotone"
                           dataKey="virabotka"
                           stroke="#82ca9d"
                           activeDot={{ r: 8 }}
                        />
                  </LineChart>
               </div>
            </div>
         </div>
      </div>
   )
}
export default RashodStokVirab;






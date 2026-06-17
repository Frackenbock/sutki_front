import React, {useState} from "react";
import classes from "./AdminPanelLogging.module.css";
import SelectDiapazonDate from "../../components/UI/SelectDiapazonDate/SelectDiapazonDate";
import fetch from '../../API/fetchLogs'
import Modal from "../../components/Modal/Modal";

function  Logging() {
   const [logs,setLogs] = useState([])
   const [title,setTitle] = useState('')
   const [message,setMessage] = useState('')
   const [modal,setModal]= useState(false);
   const [numberModal,setNumberModal]=useState(0)
   const [dateBeginDiapazone,dateBeginDiapazon] = useState('')
   const [dateEndDiapazone,setDateEndDiapazone] = useState('')
   const fetchLogs= new fetch()
   function changeDateBeginDiapazon(e){
      dateBeginDiapazon(e.target.value)
   }
   function changeDateEndDiapazon(e){
      setDateEndDiapazone(e.target.value)
   }

   function deleteLogingData(){
      fetchLogs.geleteAllDataLogsVirab()
      .then((data)=>{
         setNumberModal(1)
         setMessage(data)
         setModal(true)
         setTitle(``)
         setLogs([])
         setTimeout(()=>{
            setNumberModal(0)
            setMessage(" ")
            setModal(false)
         },3000)
      })
   }

   function readBDRashod(){
      if(dateBeginDiapazone!=='' || dateEndDiapazone!==''){
         const data = {
            dateBeginDiapazone:dateBeginDiapazone,
            dateEndDiapazone:dateEndDiapazone
         }
         fetchLogs.getDataForLogsVirab(data)
         .then((data)=>{
            if(data.length===0){               
               setNumberModal(1)
               setMessage("За выбранный переиод отсутствуют данные")
               setModal(true)
               setTimeout(()=>{
                  setNumberModal(0)
                  setMessage(" ")
                  setModal(false)
               },3000)
            }else{
               let promejutPeremen=data[0].date
               for(let i=0;i<data.length;i++){
                  let flagnewDate=false;
                  if(promejutPeremen!==data[i].date){
                     promejutPeremen=data[i].date
                     flagnewDate=true;
                  }
                  data[i].flag=flagnewDate// для добавления жирной плолосы в таблице при начале нового дня
               }
               setTitle(`Логи выгружены за период c ${dateBeginDiapazone} по ${dateEndDiapazone} `)
               setLogs(data)
            }
         })
      }else{
         setNumberModal(1)
         setMessage("Не верно выбраны даты диапазона выгрузки")
         setModal(true)
         setTimeout(()=>{
            setNumberModal(0)
            setMessage(" ")
            setModal(false)
         },3000)
      }
   }
   return (
      <div className={classes.divMainLogging}>
         <div className={classes.divDiapazoneAndDeleteBut}>
            <SelectDiapazonDate 
               dateBegin = {dateBeginDiapazone}
               dateEnd = {dateEndDiapazone}
               changeDateBegin={changeDateBeginDiapazon}
               changeDateEnd={changeDateEndDiapazon}
               readBD={readBDRashod}
               text = {"Прочитать БД"}/>
               <button 
                  className={classes.buttonDeleteLoggingData}
                  onClick={()=>{
                     setNumberModal(2)
                     setModal(true)
                  }}
               >{"Очистить данные логов"}</button>
         </div>


         <div className={classes.contTable}>
            <b>{title}</b>
            <table className={classes.tableList}>
               <thead>
                  <tr>
                     <td >Дата</td>
                     <td>Событие</td> 
                  </tr>
               </thead>
               <tbody>
                  {
                     logs.map((str)=>{
                        let arr=[]
                        if(str.flag){//для отсечения отдельных дней в таблице добавляется жирная полоса
                           arr.push(classes.border)
                        }
                        return(
                        <tr className={arr.join(' ')} key={str.log_text}>
                           <td >{str.date}</td>
                           <td>{str.log_text}</td> 
                        </tr>
                        )
                     })
                  }
               </tbody>
               <tfoot></tfoot>
            </table>
         </div>
         {
            numberModal===1 &&
            <Modal setVisible={setModal} visible={modal}>
               <span>{message}</span>
            </Modal>
         }
         {
            numberModal===2 &&
            <Modal setVisible={setModal} visible={modal}>
               <div className={classes.divMainDeleteLogData}>
                  <span>{"Вы действительно хотите удалить все данные логов?"}</span>
                  <div className={classes.divButtonsDeleteLogData}>
                     <button 
                        className={classes.buttonDeleteLogData}
                        onClick={()=>{
                           deleteLogingData()
                        }}
                     >{"Да"}</button>
                     <button
                        className={classes.buttonDeleteLogData}
                        onClick={()=>{
                           setNumberModal(0);
                           setModal(false);
                        }}
                     >{"Нет"}</button>
                  </div>
               </div>

            </Modal>
         }

      </div>
   )
}
export default Logging;






import React, {useState} from "react";
import classes from"./AdminPanelHourRashodVSP.module.css";
import apiVSP from "../../API/fetchVSP"
import { useSelector,useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import normalizeDate from "../../utils/normalizeDate";
import calculationHoursVSP from "../../utils/calculationHoursVSP";

function  AdminPanelHourRashodVSP() {
   const dispatch = useDispatch();
   const vspFetch = new apiVSP();
   const vspHoursMagazineDate = useSelector((state)=>{return  state.vspPage.vspHoursMagazineDate;});
   const vspHoursMagazineArrayRecords = useSelector((state)=>{return  state.vspPage.vspHoursMagazineArrayRecords;});
   const [modal,setModal]=useState(false);//для открытия модалки c информацией о диапазоне УВБ
   const [textModal,setTextModal]=useState("");// для сообщений об ощибке в модалке


   function readDataForMagazineHoursVsp(){
      const data = {
         date:normalizeDate(vspHoursMagazineDate)
      }
      vspFetch.getDataForHourRecordsMagazine(data)
      .then((data)=>{
         if(typeof(data)!=='string'){
            calculationHoursVSP(data)
            .then((data)=>{
               dispatch({type:"CHANGE_VSP_HOURS_MAGAZINE_ARRAY_RECORDS",payload:data})
            })
         }else{
            setModal(true)
            setTextModal(data)
         }
      })
   }

   function closeModal(){ //закрытие любой модалки
      setModal(false); 
   };
   return (
      <div className={classes.divMainVspHoursMagazine}>
         <span className={classes.spanTitelHoursVspMagazine}>
            {"Почасовые значения расхода за сутки через ВСП"}
         </span>
         <div className={classes.divChangeDate}>  
            <span style={{fontSize:"0.8vw",marginRight:"1%"}}>{"Выбирете дату: "}</span>  
            <input 
               type={"date"}
               className={classes.inputDate}
               value={vspHoursMagazineDate}
               onChange={(e)=>{
                  dispatch({type:"CHANGE_VSP_HOURS_MAGAZINE_DATE",payload:e.target.value})
               }}
            /> 
            <button className={classes.buttonReadBD} onClick={()=>{readDataForMagazineHoursVsp()}}>
               {"Прочитать БД"}
            </button>
         </div>    
         <table className={classes.tableHoursVspMagazine}>
         <colgroup>
            <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
            <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
            <col span={"1"} style={{backgroundColor:"lightyellow"}} ></col>
            <col style={{backgroundColor:"white"}} ></col>
            <col style={{backgroundColor:"lightblue"}}></col>
            <col style={{backgroundColor:"lightgreen"}}></col>
            <col style={{backgroundColor:"lightyellow"}}></col>
            <col style={{backgroundColor:"white"}}></col>
            <col style={{backgroundColor:"lightblue"}}></col>
            <col style={{backgroundColor:"lightgreen"}}></col>
            <col style={{backgroundColor:"lightyellow"}}></col>
            <col style={{backgroundColor:"white"}}></col>
            <col style={{backgroundColor:"lightblue"}}></col>
            <col style={{backgroundColor:"lightgreen"}}></col>
            <col style={{backgroundColor:"lightyellow"}}></col>
         </colgroup>

            <thead  className={classes.theadHoursVspMagazine} >
               <tr>
                  <th rowSpan={2}>{"Час"}</th>
                  <th rowSpan={2}>{"УВБ"}</th>
                  <th rowSpan={2}>{"Q хол"}</th>
                  <th>{"1 пролёт"}</th><th>{"2 пролёт"}</th>
                  <th>{"3 пролёт"}</th><th>{"4 пролёт"}</th>
                  <th>{"5 пролёт"}</th><th>{"6 пролёт"}</th>
                  <th>{"7 пролёт"}</th><th>{"8 пролёт"}</th>
                  <th>{"9 пролёт"}</th><th>{"10 пролёт"}</th>
                  <th>{"11 пролёт"}</th><th>{"12 пролёт"}</th>
               </tr>
               <tr>
                  <th>{"Q час"}</th><th>{"Q час"}</th>
                  <th>{"Q час"}</th><th>{"Q час"}</th>
                  <th>{"Q час"}</th><th>{"Q час"}</th>
                  <th>{"Q час"}</th><th>{"Q час"}</th>
                  <th>{"Q час"}</th><th>{"Q час"}</th>
                  <th>{"Q час"}</th><th>{"Q час"}</th>
               </tr>
            </thead>
            <tbody>
               {
                  vspHoursMagazineArrayRecords.map((str)=>{
                     return(
                        <tr key={str.hour}>
                           <td >{str.hour}</td><td >{str.ubv}</td>
                           <td >{str.totalHour}</td><td >{str.rashodSrH1}</td>
                           <td >{str.rashodSrH2}</td><td >{str.rashodSrH3}</td>
                           <td >{str.rashodSrH4}</td><td >{str.rashodSrH5}</td>
                           <td >{str.rashodSrH6}</td><td >{str.rashodSrH7}</td>
                           <td >{str.rashodSrH8}</td><td >{str.rashodSrH9}</td>
                           <td >{str.rashodSrH10}</td>     
                           <td >{str.rashodSrH11}</td>                             
                           <td >{str.rashodSrH12}</td>
                        </tr>
                     )
                  })
               }
                  <tr style={{borderTop:"2px solid black"}}>
                     <td></td>
                     <td>Итог</td>
                     <td>{vspHoursMagazineArrayRecords.totalDay}</td> 
                     <td>{vspHoursMagazineArrayRecords.srednZn1}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn2}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn3}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn4}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn5}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn6}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn7}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn8}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn9}</td>
                     <td>{vspHoursMagazineArrayRecords.srednZn10}</td>                              
                     <td>{vspHoursMagazineArrayRecords.srednZn11}</td>                             
                     <td>{vspHoursMagazineArrayRecords.srednZn12}</td>
                  </tr>
            </tbody>
            <tfoot></tfoot>
         </table>

         <Modal visible={modal} setVisible={closeModal}>{/*Модалка с выводом ошибки(одна кнопка, без подтверждений)*/}
               <div className={classes.divModalHoursVspMagazine}>
                  <span>{textModal}</span> 
                  <button
                     style={{fontSize:"medium",width:"10%",marginLeft:"45%"}}
                     onClick={()=>{
                        closeModal()
                     }}
                  >Ок</button>
               </div>
         </Modal>
      </div>
   )
}
export default AdminPanelHourRashodVSP;






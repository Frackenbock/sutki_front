import React, {useState} from "react";
import classes from"./AdminPanelHourZnachUVB.module.css";
import SelectDiapazonDate from "../../components/UI/SelectDiapazonDate/SelectDiapazonDate";
import { useSelector,useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import normalizeDate from "../../utils/normalizeDate";
import fetchAdmin from "../../API/fetchAdmin";

import deleteImage from "../../images/delete.png"

function  HourZnachUVB() {
   const apiAdmin = new fetchAdmin();
   const [modal,setModal]=useState(false);
   const [textInModal,setTextInModal]=useState('')
   const [numberModal,setNumberModal]=useState(0)
   const [idd,setIdd]=useState('')

   const [allUbv,setAllUbv] = useState('');
   const [dateForSaveUBV,setDateForSaveUBV] = useState('');

   const dateBeginForReadUBV = useSelector((state)=>{return  state.admin.dateBeginForReadUBV;});
   const dateEndForReadUBV = useSelector((state)=>{return  state.admin.dateEndForReadUBV;});
   const arrUVB = useSelector((state)=>{return  state.admin.arrUVB;});
   const dispatch = useDispatch();

   function readUBV(){//чтение данных увб за диапазон
      const data = {
         dateBeginWithoutNorm: dateBeginForReadUBV,
         dateEndWithoutNorm: dateEndForReadUBV
      }
      apiAdmin.getDataUVB(data)
      .then((data)=>{
         if(typeof(data)!=='string'){
            dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_UVB",payload:data})
         }else{
            messageModal(1,'За выбранный диапазон дат отсутствую данные')
         }
      })
   }
   function deleteRecordUVB(e){//удаление выбранной записи увб
      const data = {
         dateBeginWithoutNorm: dateBeginForReadUBV,
         dateEndWithoutNorm: dateEndForReadUBV,
         date:idd
      }
      apiAdmin.deleteUVBRecord(data)
      .then((data)=>{
         if(typeof(data)!=='string'){
            dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_UVB",payload:data})
            setIdd('')
            setModal(false)
         }else{
            messageModal(1,'За выбранный диапазон дат отсутствую данные')
            setIdd('')
         }
      })
   }
   function openModalDeleteRecordUVB(e){//открытие модалки с подтверждением удаления записи увб
      setNumberModal(3);
      setModal(true)
      setTextInModal('Вы действительно хотите удалить запись')
      setIdd(e.target.id)
   }
   function closeModal(){//закрытие любой моддалки
      setModal(false);
   };
   function saveUVBRecord(){//сохранение записи УВБ
      if(allUbv!==''){
         let allUbvArr = allUbv.split(' ');
         if(allUbvArr.length===24){
            if(dateForSaveUBV!==''){
               const data = {
                  dateBeginWithoutNorm: dateBeginForReadUBV,
                  dateEndWithoutNorm: dateEndForReadUBV,
                  date: normalizeDate(dateForSaveUBV),
                  arr:allUbvArr,
                  id: new Date().getTime()
               };
               apiAdmin.addUVBRecord(data)
               .then((data)=>{
                  if(typeof(data)==='string'){
                     messageModal(1,data)
                  }else{
                     dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_UVB",payload:data})
                     setAllUbv('');
                  }
               })
            }else{
               messageModal(1,'Введите дату,за которую будут сохранены данные УВБ.')
            }
         }else{
            messageModal(1,'Необходимо ввести 24 значения УВБ. Повторите ввод.')
         }
      }else{
         messageModal(1,'Необходимо ввести значения УВБ.')
      }
   }
   function messageModal(num,str){//открытие модалки с сообщением
      setNumberModal(num)
      setModal(true)
      setTextInModal(str)
}
   return (
     <>
      <div className={classes.inputAllAdmin}>
         <span style={{fontSize:'x-large'}}>{"Ввод и выгрузка данных часовых уровней верхнего бьефа"}</span>
         <div className={classes.blocInput}>
            <span style={{fontSize:"large",marginRight:"5px"}}>{"Выбирете дату:"}</span> 
            <input 
               style={{marginRight:"5px"}} type={"date"} value={dateForSaveUBV}
               onChange={(e)=>{ setDateForSaveUBV(e.target.value)}}
            /> 
            <span style={{fontSize:"large",marginRight:"5px"}}>{"Введите данные УВБ:"}</span> 
            <input
               type={"text"} style={{width:'50%',textAlign:"center",marginBottom:"1%",marginRight:"5px"}}
               placeholder={'Поле для ввода УВБ (24 значения)'} value={allUbv}
               onChange={(e)=>{setAllUbv(e.target.value)}}
            />
            <button onClick={(e)=>{saveUVBRecord(e)}}>{`Cохранить данные УВБ за ${normalizeDate(dateForSaveUBV)}`}</button> 
         </div>
         <div className={classes.blocButtonsSaveAndDateAdmin}>  
            <SelectDiapazonDate
               dateBegin = {dateBeginForReadUBV}
               dateEnd = {dateEndForReadUBV}
               changeDateBegin={(e)=>{ dispatch({type:"CHANGE_ADMIN_DATE_BEGIN_FOR_READ_UBV",payload:e.target.value})}}
               changeDateEnd={(e)=>{dispatch({type:"CHANGE_ADMIN_DATE_END_FOR_READ_UBV",payload:e.target.value})}}
               readBD={readUBV}
               text = {"Прочитать БД"}/> 
         </div>
      </div>
      <span style={{fontSize:'x-large'}}>Данные УВБ</span>
      <table className={classes.tableAdmin}>
         <colgroup>
            <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
            <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
            <col span={"1"} style={{backgroundColor:"lightyellow"}} ></col>
            <col span={"1"} style={{backgroundColor:"coral"}}></col>
            <col span={"1"} style={{backgroundColor:"white"}} ></col>
            <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
            <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
            <col span={"1"} style={{backgroundColor:"lightyellow"}}></col>
            <col span={"1"} style={{backgroundColor:"coral"}} ></col>
            <col span={"1"} style={{backgroundColor:"white"}}></col>
            <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
            <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
            <col span={"1"} style={{backgroundColor:"lightyellow"}} ></col>
            <col span={"1"} style={{backgroundColor:"coral"}}></col>
            <col span={"1"} style={{backgroundColor:"white"}} ></col>
            <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
            <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
            <col span={"1"} style={{backgroundColor:"lightyellow"}}></col>
            <col span={"1"} style={{backgroundColor:"coral"}} ></col>
            <col span={"1"} style={{backgroundColor:"white"}}></col>
            <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
            <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
            <col span={"1"} style={{backgroundColor:"lightyellow"}} ></col>
            <col span={"1"} style={{backgroundColor:"coral"}}></col>
            <col span={"1"} style={{backgroundColor:"white"}} ></col>
         </colgroup>
         <thead>
            <tr>
               <th>Дата</th><th>УВБ за 1 ч</th><th>УВБ за 2 ч</th><th>УВБ за 3 ч</th><th>УВБ за 4 ч</th>
               <th>УВБ за 5 ч</th><th>УВБ за 6 ч</th><th>УВБ за 7 ч</th><th>УВБ за 8 ч</th><th>УВБ за 9 ч</th>
               <th>УВБ за 10 ч</th><th>УВБ за 11 ч</th><th>УВБ за 12 ч</th><th>УВБ за 13 ч</th><th>УВБ за 14 ч</th>
               <th>УВБ за 15 ч</th><th>УВБ за 16 ч</th><th>УВБ за 17 ч</th><th>УВБ за 18 ч</th><th>УВБ за 19 ч</th>
               <th>УВБ за 20 ч</th><th>УВБ за 21 ч</th><th>УВБ за 22 ч</th><th>УВБ за 23 ч</th><th>УВБ за 24 ч</th>
            </tr>
         </thead>
         <tbody>
            {arrUVB.map((str)=>{
               return(
                  <tr key={str.date}>
                     <td>{str.date}</td><td>{str.uvb_1}</td><td>{str.uvb_2}</td><td>{str.uvb_3}</td><td>{str.uvb_4}</td>
                     <td>{str.uvb_5}</td><td>{str.uvb_6}</td><td>{str.uvb_7}</td><td>{str.uvb_8}</td><td>{str.uvb_9}</td>
                     <td>{str.uvb_10}</td><td>{str.uvb_11}</td><td>{str.uvb_12}</td><td>{str.uvb_13}</td><td>{str.uvb_14}</td>
                     <td>{str.uvb_15}</td><td>{str.uvb_16}</td><td>{str.uvb_17}</td><td>{str.uvb_18}</td><td>{str.uvb_19}</td>
                     <td>{str.uvb_20}</td><td>{str.uvb_21}</td><td>{str.uvb_22}</td><td>{str.uvb_23}</td><td>{str.uvb_24}</td>
                     <td><img onClick={(e)=>{openModalDeleteRecordUVB(e)}} id={str.date} src={deleteImage} alt="" width={"20px"} height={"20px"}/></td>
                  </tr>
               )
            })}
         </tbody>
         <tfoot></tfoot>
      </table>
         {numberModal===3 &&
         <Modal visible={modal} setVisible={closeModal}>
            <div className={classes.modalAdmin}>
               <span>{textInModal}</span> 
               <div className={classes.modalButtonsAdmin}>
                  <button
                     style={{fontSize:"medium",width:"20%",marginLeft:"25%"}}
                     onClick={()=>{
                        deleteRecordUVB()
                     }}
                  >Да</button>
                  <button
                     style={{fontSize:"medium",width:"20%",marginLeft:"25%"}}
                     onClick={()=>{
                        closeModal()
                     }}
                  >Нет</button>
               </div>
            </div>
         </Modal>}
         {numberModal===1 &&
            <Modal visible={modal} setVisible={closeModal}>
               <div className="modalAdmin">
                  <span>{textInModal}</span> 
                  <button
                     style={{fontSize:"medium",width:"10%",marginLeft:"45%"}}
                     onClick={()=>{
                        closeModal()
                     }}
                  >Ок</button>
               </div>
         </Modal>}
     </>
   )
}
export default HourZnachUVB;






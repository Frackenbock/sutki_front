import React, {useState} from "react";
import classes from"./AdminPanelHourZnachNapor.module.css";
import SelectDiapazonDate from "../../components/UI/SelectDiapazonDate/SelectDiapazonDate";
import { useSelector,useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import normalizeDate from "../../utils/normalizeDate";
import fetchAdmin from "../../API/fetchAdmin";
import deleteImage from "../../images/delete.png"

function  HourZnachNapor() {
   const apiAdmin = new fetchAdmin();
   const [modal,setModal]=useState(false);
   const [textInModal,setTextInModal]=useState('')
   const [numberModal,setNumberModal]=useState(0)
   const [idd,setIdd]=useState('')
   const [allNapors,setAllNapors] = useState('');
   const [dateForSaveNapors,setDateForSaveNapors] = useState('');
   const dateBeginForReadNapors = useSelector((state)=>{return  state.admin.dateBeginForReadNapors;});
   const dateEndForReadNapors = useSelector((state)=>{return  state.admin.dateEndForReadNapors;});
   const arrNapors = useSelector((state)=>{return  state.admin.arrNapors;});
   const dispatch = useDispatch();

   function readNapors(){//чтение данных напоров за диапазон
      const data = {
         dateBeginWithoutNorm: dateBeginForReadNapors,
         dateEndWithoutNorm: dateEndForReadNapors
      };
      apiAdmin.getDataNapors(data)
      .then((data)=>{
         if(typeof(data)!=='string'){
            dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_NAPORS",payload:data})
         }else{
            messageModal(1,'За выбранный диапазон дат отсутствую данные')
         };
     });
   };
   function deleteRecordNapor(e){//удаление выбранной записи напоров
      const data = {
         dateBeginWithoutNorm: dateBeginForReadNapors,
         dateEndWithoutNorm: dateEndForReadNapors,
         date:idd
      };
      apiAdmin.deleteNaporRecord(data)
      .then((data)=>{
         if(typeof(data)!=='string'){
            dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_NAPORS",payload:data})
            setIdd('');
            setModal(false);
         }else{
            messageModal(1,'За выбранный диапазон дат отсутствую данные');
            setIdd('');
         };
      })
   }
   function openModalDeleteRecordNapor(e){//открытие модалки с подтверждением удаления записи напора
      setNumberModal(2);
      setModal(true)
      setTextInModal('Вы действительно хотите удалить запись')
      setIdd(e.target.id)
   }
   function saveNaporRecord(){//сохранение записи напора
      if(allNapors!==''){
         let allNaporsArr = allNapors.split(' ');
         if(allNaporsArr.length===24){
            if(dateForSaveNapors!==''){
               const data = {
                  dateBeginWithoutNorm: dateBeginForReadNapors,
                  dateEndWithoutNorm: dateEndForReadNapors,
                  date:normalizeDate(dateForSaveNapors),
                  arr:allNaporsArr
               };
               apiAdmin.addNaporRecord(data)
               .then((data)=>{
                  if(typeof(data)==='string'){
                     messageModal(1,data)
                  }else{
                     dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_NAPORS",payload:data})
                     setAllNapors('');
                  }
               })
            }else{
               messageModal(1,"Введите дату,за которую будут сохранены данные напоров.")
            }
         }else{
            messageModal(1,"Необходимо ввести 24 значения напоров. Повторите ввод")
         }
      }else{
         messageModal(1,"Необходимо ввести значения напоров.")
      }
   }
   function closeModal(){//закрытие любой моддалки
      setModal(false);
   };
   function messageModal(num,str){//открытие модалки с сообщением
         setNumberModal(num)
         setModal(true)
         setTextInModal(str)
   }

   return (
     <>
      <div className={classes.inputAllAdmin}>
         <span style={{fontSize:'x-large'}}>Ввод и выгрузка данных часовых напоров</span>
         <div className={classes.blocInput}>
            <span style={{fontSize:"large",marginRight:"5px"}}>{"Выбирете дату:"}</span> 
            <input style={{marginRight:"5px"}} type={"date"} 
               value={dateForSaveNapors} onChange={(e)=>{ setDateForSaveNapors(e.target.value)}}
            /> 
            <span style={{fontSize:"large",marginRight:"5px"}}>{"Введите данные напоров:"}</span> 
            <input type={"text"} style={{width:'50%',textAlign:"center",marginBottom:"1%",marginRight:"5px"}}
               placeholder={'Поле для ввода напоров (24 значения)'} value={allNapors}
               onChange={(e)=>{setAllNapors(e.target.value)}}
            />
            <button onClick={()=>{saveNaporRecord()}}>{`Cохранить данные напоров за ${normalizeDate(dateForSaveNapors)} `}</button> 
         </div>
         <div className={classes.blocButtonsSaveAndDateAdmin}>  
            <SelectDiapazonDate
               dateBegin = {dateBeginForReadNapors}
               dateEnd = {dateEndForReadNapors}
               changeDateBegin={(e)=>{dispatch({type:"CHANGE_ADMIN_DATE_BEGIN_FOR_READ_NAPORS",payload:e.target.value})}}
               changeDateEnd={(e)=>{dispatch({type:"CHANGE_ADMIN_DATE_END_FOR_READ_NAPORS",payload:e.target.value})}}
               readBD={readNapors}
               text = {"Прочитать БД"}/> 
         </div>
      </div>
      <span style={{fontSize:'x-large'}}>Данные напоров</span>
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
               <th>Дата</th><th>Нап. за 1 ч</th><th>Нап. за 2 ч</th><th>Нап. за 3 ч</th><th>Нап. за 4 ч</th>
               <th>Нап. за 5 ч</th><th>Нап. за 6 ч</th><th>Нап. за 7 ч</th><th>Нап. за 8 ч</th><th>Нап. за 9 ч</th>
               <th>Нап. за 10 ч</th><th>Нап. за 11 ч</th><th>Нап. за 12 ч</th><th>Нап. за 13 ч</th><th>Нап. за 14 ч</th>
               <th>Нап. за 15 ч</th><th>Нап. за 16 ч</th><th>Нап. за 17 ч</th><th>Нап. за 18 ч</th><th>Нап. за 19 ч</th>
               <th>Нап. за 20 ч</th><th>Нап. за 21 ч</th><th>Нап. за 22 ч</th><th>Нап. за 23 ч</th><th>Нап. за 24 ч</th>
            </tr>
         </thead>
         <tbody>
            {arrNapors.map((str)=>{
               return(
                  <tr key={str.date}>
                     <td>{str.date}</td><td>{str.napor1h}</td><td>{str.napor2h}</td><td>{str.napor3h}</td><td>{str.napor4h}</td>
                     <td>{str.napor5h}</td><td>{str.napor6h}</td><td>{str.napor7h}</td><td>{str.napor8h}</td><td>{str.napor9h}</td>
                     <td>{str.napor10h}</td><td>{str.napor11h}</td><td>{str.napor12h}</td><td>{str.napor13h}</td><td>{str.napor14h}</td>
                     <td>{str.napor15h}</td><td>{str.napor16h}</td><td>{str.napor17h}</td><td>{str.napor18h}</td><td>{str.napor19h}</td>
                     <td>{str.napor20h}</td><td>{str.napor21h}</td><td>{str.napor22h}</td><td>{str.napor23h}</td><td>{str.napor24h}</td>
                     <td><img onClick={(e)=>{openModalDeleteRecordNapor(e)}} id={str.date} src={deleteImage} alt="" width={"20px"} height={"20px"}/></td>
                  </tr>
               )
            })}
         </tbody>
         <tfoot></tfoot>
      </table>
         {numberModal===1 &&
         <Modal visible={modal} setVisible={closeModal}>
            <div className={classes.modalAdmin}>
               <span>{textInModal}</span> 
               <button
                  style={{fontSize:"medium",width:"10%",marginLeft:"45%"}}
                  onClick={()=>{
                     closeModal()
                  }}
               >Ок</button>
            </div>
         </Modal>}
         {numberModal===2 &&
         <Modal visible={modal} setVisible={closeModal}>
            <div className={classes.modalAdmin}>
               <span>{textInModal}</span> 
               <div className={classes.modalButtonsAdmin}>
                  <button
                     style={{fontSize:"medium",width:"20%",marginLeft:"25%"}}
                     onClick={()=>{
                        deleteRecordNapor()
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
     </>
   )
}
export default HourZnachNapor;






import React,{useState} from "react";
import apiVSP from "../../API/fetchVSP"
import "./AdminPanelMagazineVSP.css";
import { useSelector,useDispatch } from "react-redux";
import normalizeDate from "../../utils/normalizeDate";
import Modal from "../../components/Modal/Modal";
import calculationVSP from "../../utils/calculationVSP"
import normalizeVspDataRecords from "../../utils/normalizeVspDataRecords"
import editImage from "../../images/edit.png"
import deleteImage from "../../images/delete.png"

function  MagazineVSP() {
   const date = useSelector((state)=>{return  state.sutki.date;});
   const [prolet,setProlet]=useState('');// для ввода пролёта
   const [typeOpen,setTypeOpen]=useState('');// для ввода типа открытия пролёта
   const [openDate,setOpenDate]=useState(date);// для ввода даты открытия 
   const [closeTimeHours,setCloseTimeHours]=useState("24");// для ввода часа закрытия
   const [closeTimeMinutes,setCloseTimeMinutes]=useState("00");// для ввода минут закрытия
   const [openTimeHours,setOpenTimeHours]=useState("00");// для ввода часа открытия
   const [openTimeMinutes,setOpenTimeMinutes]=useState("00");// для ввода минут открытия
   const [textModal,setTextModal]=useState("");// для сообщений об ощибке в модалке

   const [idEmail,setIdEmail]=useState('');                  // буффер для предполагаемой удаляемой записи
   const [placeholder,setPlaceholder]=useState('Введите пароль'); //Надпись для поля ввода пароля
   const [password,setPassword] = useState('');              // для вводимого пароля (для сравнения с соранённым)
   const passw = useSelector((state)=>{return state.maket.passw});//сохранённый пароль (для сравнения с вводимым) 
   const [deleteModalPass,setDeleteModalPass]=useState(false)
   const [editModalPass,setEditModalPass]=useState(false)

   const [modal,setModal]=useState(false);//для открытия модалки c информацией о диапазоне УВБ
   const [modalEditing,setModalEditing]=useState('');//для открытия модалки редактирования записи
   const [infoEditing,setInfoEditing]=useState({});//для информации редактируемой записи (объект записи) 
   const [infoMoreTwoRecords,setInfoMoreTwoRecords]=useState({});//для информации более чем второй записи для даты 
   const [modalMoreTwoRecords,setModalMoreTwoRecords]=useState(false);//для подтверждления модалки более чем второй записи для даты 
   const vspFetch = new apiVSP();

   const vspRecordsArr = useSelector((state)=>{return  state.vspPage.vspRecordsState;});
   const dateBeginDiapasonVspMagazine = useSelector((state)=>{return  state.vspPage.dateBeginDiapasonVspMagazine;});//для даты начала выгрузки из БД
   const dateEndDiapasonVspMagazine = useSelector((state)=>{return  state.vspPage.dateEndDiapasonVspMagazine;});//для для даты окончания выгрузки из БД
   const dispatch = useDispatch();

   function calculateSrUbv(){//при нажатии на кнопку расчёт среднего уровня верхнего бьефа
      const data = {
         date:normalizeDate(openDate)
      }
      vspFetch.getUVBDataForMAgazine(data)
      .then((obj)=>{
         if(typeof(obj)==='string'){
               setTextModal(obj)
               setModal(true);
         }else{
            let ubvObjectArr=[];
            let allUbvArr=[obj[0].uvb_1,obj[0].uvb_2,obj[0].uvb_3,obj[0].uvb_4,obj[0].uvb_5,obj[0].uvb_6,obj[0].uvb_7,
            obj[0].uvb_8,obj[0].uvb_9,obj[0].uvb_10,obj[0].uvb_11,obj[0].uvb_12,
            obj[0].uvb_13,obj[0].uvb_14,obj[0].uvb_15,obj[0].uvb_16,obj[0].uvb_17,
            obj[0].uvb_18,obj[0].uvb_19,obj[0].uvb_20,obj[0].uvb_21,obj[0].uvb_22,obj[0].uvb_23,obj[0].uvb_24];
            let summUBV=0;
            let srDataUbv=0
            for (let i=0;i<=23;i++){
               ubvObjectArr.push({hour:i+1,ubv:allUbvArr[i]});
            }
            //если пролёт работал все сутки
            if(Number(closeTimeHours)===24 && Number(openTimeHours)===0){
               for(let i=0;i<=23;i++){
                     summUBV+=Number((ubvObjectArr[i].ubv).replace(",","."));
               };
               // console.log(24)
               srDataUbv=(summUBV/24).toFixed(2);
            }
            //время не корректно(час закрытия меньше часа открытия)
            else if(Number(closeTimeHours)<Number(openTimeHours)){
               setTextModal('Неверно введено время. Повторите ввод.')
               setModal(true);
               return
            }
            //время не корректно (час закрытия равен часу открытия, минуты закрытия меньше или равны минутам открытия)
            else if((Number(closeTimeHours)===Number(openTimeHours)&&Number(closeTimeMinutes)<=Number(openTimeMinutes))){
               setTextModal('Неверно введено время. Повторите ввод.')
               setModal(true);
               return
            }
            //время корректно (час закрытия равен часу открытия, минуты закрытия больше минут открытия)
            else if((Number(closeTimeHours)===Number(openTimeHours)&&Number(closeTimeMinutes)>Number(openTimeMinutes))){
                srDataUbv=Number((ubvObjectArr[Number(closeTimeHours)].ubv).replace(",","."));
               //  console.log(1)
            }
            else if((Number(closeTimeHours)>Number(openTimeHours)&&Number(closeTimeHours)!==24)){//если время корректно, окончание не в 24 часа
               let start = Number(openTimeHours);
               let end = Number(closeTimeHours);
               let amount = end-start;
               for(let i=start;i<end;i++){
                  summUBV+=Number((ubvObjectArr[i].ubv).replace(",","."));
               };
               srDataUbv=(summUBV/amount).toFixed(2);
               // console.log(amount)
            }
            else if((Number(closeTimeHours)>Number(openTimeHours)&&Number(closeTimeHours)===24)){//если время корректно, окончание в 24 часа
               let start = Number(openTimeHours);
               let end = Number(closeTimeHours);
               let amount = end-start;
               for(let i=start;i<end;i++){
                  summUBV+=Number((ubvObjectArr[i].ubv).replace(",","."));
               };
               srDataUbv=(summUBV/amount).toFixed(2);
               // console.log(amount)
            }
            calculateData(srDataUbv,ubvObjectArr)
         }
      })
    }
   function calculateData(srDataUbv,ubvObjectArr){//при нажатии на кнопку рассчитать и сохранить запись
      if(prolet!==''){
         if(typeOpen!==''){
            const promejut= Math.trunc(Number(srDataUbv)*10)/10
            let ubv_1 = promejut.toFixed(1);
            let ubv_2 = (promejut+0.1).toFixed(1);
            const data ={
               ubv_1: String((promejut).toFixed(1)).replace(".",","),
               ubv_2: String((promejut+0.1).toFixed(1)).replace(".",","),
               prolet 
            };
            vspFetch.getDataForMagazineIntepol(data)
            .then((data)=>{
               if(typeof(data)==='string'){
                  setTextModal(data)
                  setModal(true);
                  return
               }
               const calcData=calculationVSP(data,openTimeHours, openTimeMinutes, closeTimeHours,closeTimeMinutes,
                  typeOpen,prolet,srDataUbv,ubv_1,ubv_2);
               const record = {id:new Date().getTime(), prolet:prolet,typeOpen: typeOpen, 
                  openDate:normalizeDate(openDate), openTimeHours, openTimeMinutes,closeTimeHours, 
                  closeTimeMinutes, workTime:calcData.workTime, ubv:srDataUbv,rashodM:calcData.rashodM, stok:calcData.stok, rashodS:calcData.rashodS,
                  dateBeginWithoutNorm:dateBeginDiapasonVspMagazine,ubvObjectArr,
                  dateEndWithoutNorm:dateEndDiapasonVspMagazine,flag:false} //флаг нужен для определения количества записедля даннго пролёта за данную дату

               return  vspFetch.setDataForMagazine(record);
            }).then((data)=>{
               if(typeof(data)==="string"){
                  setTextModal(data)
                  setModal(true);
               }else{
                  if(data.message){
                     setModalMoreTwoRecords(true);
                     setTextModal(data.message)
                     setInfoMoreTwoRecords(data.record)
                  }else{
                     const normalVspDataRecords = normalizeVspDataRecords(data)
                     dispatch({type:"CHANGE_VSP_RECORDS",payload:normalVspDataRecords}); 
                     setProlet('');
                     setTypeOpen('');
                     setOpenDate(openDate);
                     setCloseTimeHours('24'); 
                     setCloseTimeMinutes('00');
                     setOpenTimeHours('00'); 
                     setOpenTimeMinutes('00');
                  }
               }
            })
         }else{
            setTextModal('Не выбран вид открытия. Выбирете вид открытия из выпадающего списка')
            setModal(true);
         }
      }else{
         setTextModal('Не выбран номер пролёта. Выбирете номер пролёта из выпадающего списка')
         setModal(true);
      }
      
   };
   function closeModal(){ //закрытие любой модалки
      setModal(false); 
      setModalEditing(false);
      setEditModalPass(false);
      setDeleteModalPass(false);
      setModalMoreTwoRecords(false);
   };
   function openModalPassForEditingRecord(e){//открытие модалки с паролем для удаления записи
      setEditModalPass(true);
      setIdEmail(e.nativeEvent.srcElement.parentElement.id)
   }
   function verifyPassModalRecordEditing(e){//проверка пароля в модалке редактирования записи
      if(e.keyCode===13){
         if(e.target.value===passw){
            setPassword('')
            editRecord();
            setPlaceholder('')
            setEditModalPass(false)
         }else{
            setPlaceholder("Неверный пароль, повторите")
            setPassword('')
         }
      };
      if(e.keyCode===27){
         closeModal();
         setPlaceholder('Введите пароль')
      };
   }
   function editRecord(e){ //при нажатии на иконку редактирования записи (открытие модалки с редактированием)
      for(let i=0;i<vspRecordsArr.length;i++){
         if(String(vspRecordsArr[i].id)===idEmail){
            const promejut = `${(vspRecordsArr[i].openDate).slice(6,10)}-${(vspRecordsArr[i].openDate).slice(3,5)}-${(vspRecordsArr[i].openDate).slice(0,2)}`
            setInfoEditing({...vspRecordsArr[i],openDate:promejut})
            break;
         };
      };
      setModalEditing(true)
   };
   function editAndSaveRecord(){//при нажатии на кнопку пересчитать и пересохранить запись (в модалке с редактированием)
      if(Number(infoEditing.ubv)>=82.0&&Number(infoEditing.ubv)<=85.5){
         const promejut= Math.trunc(Number(infoEditing.ubv)*10)/10
         let ubv_1 = promejut.toFixed(1);
         let ubv_2 = (promejut+0.1).toFixed(1);
         const data ={
            ubv_1: String((promejut).toFixed(1)).replace(".",","),
            ubv_2: String((promejut+0.1).toFixed(1)).replace(".",","),
            prolet:infoEditing.prolet
         };
         vspFetch.getDataForMagazineIntepol(data)
         .then((data)=>{
            const calcData=calculationVSP(data,infoEditing.openTimeHours,infoEditing.openTimeMinutes,infoEditing.closeTimeHours,infoEditing.closeTimeMinutes,
               infoEditing.typeOpen, infoEditing.prolet, infoEditing.ubv,ubv_1,ubv_2);

            const dataR = {id:infoEditing.id, prolet:infoEditing.prolet, typeOpen: infoEditing.typeOpen,
               openDate:normalizeDate(infoEditing.openDate), openTimeHours:infoEditing.openTimeHours,
               openTimeMinutes:infoEditing.openTimeMinutes, closeTimeHours:infoEditing.closeTimeHours,
               closeTimeMinutes:infoEditing.closeTimeMinutes, workTime:calcData.workTime, ubv:infoEditing.ubv, 
               rashodM:calcData.rashodM, stok:calcData.stok, rashodS:calcData.rashodS,dateBeginWithoutNorm:dateBeginDiapasonVspMagazine,
               dateEndWithoutNorm:dateEndDiapasonVspMagazine}
               if(infoEditing.closeTimeHours==="24"){
                  dataR.closeTimeMinutes='00'
               }
            return  vspFetch.setEditedRecordDataForMagazine(dataR);
         }).then((data)=>{
            const normalVspDataRecords = normalizeVspDataRecords(data)
            dispatch({type:"CHANGE_VSP_RECORDS",payload:normalVspDataRecords}); 
            closeModal() 
         })
      }
   };
   function openModalPassForDeleteRecord(e){//открытие модалки с паролем для удаления записи
      setDeleteModalPass(true);
      setIdEmail(e.nativeEvent.srcElement.parentElement.id)
   }
   function verifyPassModalRecordDelete(e){//проверка пароля в модалке удаления записи
      if(e.keyCode===13){
         if(e.target.value===passw){
            setPassword('')
            deleteRecord();
            setPlaceholder('')
         }else{
            setPlaceholder("Неверный пароль, повторите")
            setPassword('')
         }
      };
      if(e.keyCode===27){
         closeModal();
         setPlaceholder('Введите пароль')
      };
   }
   function deleteRecord(){//удаление записи (отработает, если пароль в модалке для удаления был верным)
      for(let i=0;i<vspRecordsArr.length;i++){
         if(String(vspRecordsArr[i].id)===idEmail){
            const data = {
               id:vspRecordsArr[i].id,
               dateBeginWithoutNorm:dateBeginDiapasonVspMagazine,
               dateEndWithoutNorm:dateEndDiapasonVspMagazine
            }
            vspFetch.deleteRecordMagazine(data)
            .then((data)=>{
               if(data.length!==0){
                  const normalVspDataRecords = normalizeVspDataRecords(data)
                  dispatch({type:"CHANGE_VSP_RECORDS",payload:normalVspDataRecords});  
                  setDeleteModalPass(false);
               }else{
                  setDeleteModalPass(false);
                  setTextModal('За выбранный диапазон дат отсутствуют записи')
                  setModal(true);
                  dispatch({type:"CHANGE_VSP_RECORDS",payload:[]}); 
               }
            })
         };
      };

   };
   function readBDVSPRecords(){//выгрузка записей за переданный диапазон
      const data = {
         dateBeginWithoutNorm:dateBeginDiapasonVspMagazine,
         dateEndWithoutNorm:dateEndDiapasonVspMagazine
      }
      vspFetch.getDataForMagazineRecords(data)
      .then((data)=>{
         if(data.length!==0){
            const normalVspDataRecords = normalizeVspDataRecords(data)
            dispatch({type:"CHANGE_VSP_RECORDS",payload:normalVspDataRecords});  
         }else{
            setTextModal('За выбранный диапазон дат отсутствуют записи')
            setModal(true);
         }
      })
   };
   function sendMoreTwoRecords(){
      const data = {...infoMoreTwoRecords,flag:true}
      vspFetch.setDataForMagazine(data)
               .then((data)=>{
                  const normalVspDataRecords = normalizeVspDataRecords(data)
                  dispatch({type:"CHANGE_VSP_RECORDS",payload:normalVspDataRecords}); 
                  setProlet('');
                  setTypeOpen('');
                  setOpenDate(openDate);
                  setCloseTimeHours('24'); 
                  setCloseTimeMinutes('00');
                  setOpenTimeHours('00'); 
                  setOpenTimeMinutes('00');
                  closeModal()
               })
   }

   return (
      <div className="vspMagazineCont">
         <div className="vspMagazineContTableInput">
            <span style={{fontSize:"180%"}}>Ввод данных новой записи</span>
           
            <table className="vspMagazineTableInput">{/*Таблица ввода информации для новой записи */}
               <thead>
                  <tr><th style={{width:"50px"}}>Номер пролёта</th><th style={{width:"8%"}}>Вид открытия</th>
                     <th style={{width:"6%"}}>Отчётная дата </th><th style={{width:"6%"}}>Время открытия</th>
                     <th style={{width:"6%"}}>Время закрытия</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td style={{width:"10%"}}>{/*Выбор номер пролёта*/}
                        <select value={prolet} onChange={(e)=>{
                              setProlet(e.target.value)
                           }}>
                           <option style={{display: "none"}} defaultValue="" >Выбирете номер пролёта</option>
                           <option>11</option><option>12</option><option>1</option><option>2</option><option>3</option>
                           <option>4</option><option>5</option><option>6</option><option>7</option><option>8</option>
                           <option>9</option><option>10</option>
                        </select>
                     </td>
                     <td>{/*Выбор типа открытия в зависимости от номера пролёта*/}
                        {
                           (prolet==='11'||prolet==='12')&&                        
                              <select value={typeOpen} onChange={(e)=>{
                                 setTypeOpen(e.target.value)
                              }}>
                              <option style={{display: "none"}} defaultValue="" >Выбирете вид открытия</option>
                              <option>Перелив ниж. секц.</option><option>Полное открытие</option>
                           </select>
                        }
                        {
                           (prolet==='1'||prolet==='2'||prolet==='3'||prolet==='4'||prolet==='5'||prolet==='6'||prolet==='7'||prolet==='8'||prolet==='9'||prolet==='10')&&                        
                           <select value={typeOpen} onChange={(e)=>{
                                 setTypeOpen(e.target.value)
                              }}>
                              <option style={{display: "none"}} defaultValue="" >Выбирете вид открытия</option>
                              <option>1 м</option><option>2 м</option><option>3 м</option><option>Полное открытие</option>
                           </select>
                        }
                        {
                           (prolet==='')&&                        
                           <select value={typeOpen} onChange={(e)=>{
                                 setTypeOpen(e.target.value)
                              }}>
                              <option style={{display: "none"}} defaultValue="" >Выбирете вид открытия</option>
                              <option>1 м</option><option>2 м</option><option>3 м</option>
                              <option>Перелив ниж. секц.</option><option>Полное открытие</option>
                           </select>
                        }

                     </td>
                     <td >{/*Ввод отчётной даты*/}
                        <div className="inputTimeCeilOpenMagazine">
                           <input type={"date"} value={openDate} onChange={(e)=>{
                              setOpenDate(e.target.value)
                           }}/>
                        </div>
                     </td>
                     <td >{/*Ввод часа и минут открытия*/}
                        <div className="inputTimeCeilOpenMagazine">
                        <span>{'час:'}</span>
                        <select value={openTimeHours} onChange={(e)=>{
                                 setOpenTimeHours(e.target.value)
                              }}>
                              <option style={{display: "none"}} defaultValue="" >24</option>
                              <option>00</option><option>01</option><option>02</option><option>03</option>
                              <option>04</option><option>05</option><option>06</option><option>07</option>
                              <option>08</option><option>09</option><option>10</option><option>11</option>
                              <option>12</option><option>13</option><option>14</option><option>15</option>
                              <option>16</option><option>17</option><option>18</option><option>19</option>
                              <option>20</option><option>21</option><option>22</option><option>23</option>
                           </select>
                           <span>{'минуты:'}</span>
                           <select value={openTimeMinutes} onChange={(e)=>{
                                 setOpenTimeMinutes(e.target.value)
                              }}>
                              <option style={{display: "none"}} defaultValue="" >00</option>
                              <option>00</option><option>01</option><option>02</option><option>03</option><option>04</option>
                              <option>05</option><option>06</option><option>07</option><option>08</option>
                              <option>09</option><option>10</option><option>11</option><option>12</option>
                              <option>13</option><option>14</option><option>15</option><option>16</option>
                              <option>17</option><option>18</option><option>19</option><option>20</option>
                              <option>21</option><option>22</option><option>23</option><option>24</option>
                              <option>25</option><option>26</option><option>27</option><option>28</option>
                              <option>29</option><option>30</option><option>31</option><option>32</option>
                              <option>33</option><option>34</option><option>35</option><option>36</option>
                              <option>37</option><option>38</option><option>39</option><option>40</option>
                              <option>41</option><option>42</option><option>43</option><option>44</option>
                              <option>45</option><option>46</option><option>47</option><option>48</option>
                              <option>49</option><option>50</option><option>51</option><option>52</option>
                              <option>53</option><option>54</option><option>55</option><option>56</option>
                              <option>57</option><option>58</option><option>59</option><option>60</option>
                           </select>
                        </div>
                     </td>
                     <td>{/*Ввод часа и минут закрытия*/}
                        <div  className="inputTimeCeilCloseMagazine">
                           <span>{'час:'}</span>
                        <select value={closeTimeHours} onChange={(e)=>{
                                 setCloseTimeHours(e.target.value)
                              }}>
                              <option style={{display: "none"}} defaultValue="" >24</option>
                              <option>00</option><option>01</option><option>02</option><option>03</option><option>04</option>
                              <option>05</option><option>06</option><option>07</option><option>08</option>
                              <option>09</option><option>10</option><option>11</option><option>12</option>
                              <option>13</option><option>14</option><option>15</option><option>16</option>
                              <option>17</option><option>18</option><option>19</option><option>20</option>
                              <option>21</option><option>22</option><option>23</option><option>24</option>
                           </select>
                           <span>{'минуты:'}</span>
                           {closeTimeHours!=="24"&&
                                 <select value={closeTimeMinutes} onChange={(e)=>{
                                       setCloseTimeMinutes(e.target.value)
                                    }}>
                                    <option style={{display: "none"}} defaultValue="" >00</option>
                                    <option>00</option><option>01</option><option>02</option><option>03</option><option>04</option>
                                    <option>05</option><option>06</option><option>07</option><option>08</option>
                                    <option>09</option><option>10</option><option>11</option><option>12</option>
                                    <option>13</option><option>14</option><option>15</option><option>16</option>
                                    <option>17</option><option>18</option><option>19</option><option>20</option>
                                    <option>21</option><option>22</option><option>23</option><option>24</option>
                                    <option>25</option><option>26</option><option>27</option><option>28</option>
                                    <option>29</option><option>30</option><option>31</option><option>32</option>
                                    <option>33</option><option>34</option><option>35</option><option>36</option>
                                    <option>37</option><option>38</option><option>39</option><option>40</option>
                                    <option>41</option><option>42</option><option>43</option><option>44</option>
                                    <option>45</option><option>46</option><option>47</option><option>48</option>
                                    <option>49</option><option>50</option><option>51</option><option>52</option>
                                    <option>53</option><option>54</option><option>55</option><option>56</option>
                                    <option>57</option><option>58</option><option>59</option>
                                 </select>
                           }
                           {closeTimeHours==="24"&&
                                 <select value={closeTimeMinutes} onChange={(e)=>{
                                       setCloseTimeMinutes(e.target.value)
                                    }}>
                                    <option style={{display: "none"}} defaultValue="" >00</option>
                                 </select>
                           }
                          
                        </div>   
                     </td>
                  </tr>
               </tbody>
               <tfoot></tfoot>
            </table>
            {/*Блок ввода 24 напоров*/}
            {/* <div className="inputAllNApors">
               <input
                  type={"text"}
                  style={{width:'90%',textAlign:"center",marginBottom:"1%"}}
                  placeholder={'Поле для ввода всех УВБ за прошлые сутки для расчёта среднего уровня (24 значения)'}
                  value={allUbv}
                  onChange={(e)=>{
                     setAllUbv(e.target.value)
                  }}
               />
            </div> */}
            <div className="blocButtonsSaveAndDate">
               <button onClick={()=>{
                  calculateSrUbv();
               }}>{'Расчитать данные и сохранить запись'}</button>   
               <div>
                  <span style={{fontSize:"large"}}>{"Выгрузить данные с "}</span> 
                  <input type={"date"} value={dateBeginDiapasonVspMagazine} onChange={(e)=>{
                     dispatch({type:"CHANGE_VSP_DATE_BEGIN_MAGAZINE_DIAPAZONE",payload:e.target.value}); 
                  }}/> 
                  <span style={{fontSize:"large"}}>{" по "}</span>
                  <input type={"date"} value={dateEndDiapasonVspMagazine} onChange={(e)=>{
                     dispatch({type:"CHANGE_VSP_DATE_END_MAGAZINE_DIAPAZONE",payload:e.target.value}); 
                  }}/>
                  <span >{" "}</span>
                  <button onClick={()=>{readBDVSPRecords()}}
                  >Прочитать БД</button>
               </div>
            </div>

         </div>

         <span style={{fontSize:"xx-large",marginTop:"1%"}}>{"Журнал учёта открытий и закрытий пролётов ВСП"}</span>
         <table className="vspMagazineTable">
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
            </colgroup>
            <thead>{/*шапка журнала*/}
               <tr>
                  <th style={{width:"5%",borderLeft:"2px solid black",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Отчётная дата</th>
                  <th style={{width:"7%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Номер пролёта</th>
                  <th style={{width:"8%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Вид открытия</th>
                  <th style={{width:"8%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Время открытия</th>
                  <th style={{width:"8%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Время закрытия</th>
                  <th style={{width:"10%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Время работы, сек</th>
                  <th style={{width:"8%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Средний УВБ</th>
                  <th style={{width:"15%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Мгновенный расход , м3/с</th>
                  <th style={{width:"13%",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Среднесуточный расход , м3/с</th>     
                  <th style={{width:"8%",borderRight:"2px solid black",borderTop:"2px solid black",borderBottom:"2px solid black"}}>Сток, млн.м3</th>
                  <th style={{width:"5%",borderTopColor:"white",borderRightColor:"white",borderBottomColor:"white"}}></th>
               </tr>
            </thead>
            <tbody style={{border:"2px solid black"}}>
               {
                  vspRecordsArr.map((str)=>{//вывод записей журнала 
                     let clas='';
                     if(str.flagnewDate){
                        clas='border'
                     }
                     return(
                        <tr className={clas} key={str.id}>
                           <td>{str.openDate}</td>
                           <td>{str.prolet}</td>
                           <td>{str.typeOpen}</td>
                           <td>{`${str.openTimeHours}:${str.openTimeMinutes}`}</td>
                           <td>{`${str.closeTimeHours}:${str.closeTimeMinutes}`}</td>
                           <td>{str.workTime}</td>
                           <td>{str.ubv}</td>
                           <td>{str.rashodM}</td>
                           <td>{str.rashodS}</td>
                           <td>{str.stok}</td>
                           <td style={{borderTopColor:"white",borderRightColor:"white"}}>
                              <div className="buttonsCont" id={str.id}>
                                 <img onClick={(e)=>{openModalPassForEditingRecord(e)}} src={editImage} alt="" width={"24px"} height={"24px"}/>
                                 <img onClick={(e)=>{openModalPassForDeleteRecord(e)}} src={deleteImage} alt="" width={"24px"} height={"24px"}/>
                              </div>
                           </td>
                        </tr>
                     )
                  })          
               }
            </tbody>
            <tfoot></tfoot>
         </table>
         <Modal visible={modal} setVisible={closeModal}>{/*Модалка с выводом ошибки(одна кнопка, без подтверждений)*/}
               <div className="modalMagazine">
                  <span>{textModal}</span> 
                  <button
                     style={{fontSize:"medium",width:"10%",marginLeft:"45%"}}
                     onClick={()=>{
                        closeModal()
                     }}
                  >Ок</button>
               </div>
         </Modal>
         <Modal visible={modalMoreTwoRecords} setVisible={closeModal}>
               <div className="modalMagazine">
                  <span>{textModal}</span> 
                 <div style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                     <span>{`Время открытия: ${infoMoreTwoRecords.openTimeHours}:${infoMoreTwoRecords.openTimeMinutes}`}</span> 
                     <span style={{marginLeft:"1%"}}>{`Время закрытия: ${infoMoreTwoRecords.closeTimeHours}:${infoMoreTwoRecords.closeTimeMinutes}`}</span>  
                 </div>
                  <div style={{display:"flex"}}>
                     <button
                        style={{fontSize:"medium",width:"10%",marginLeft:"35%"}}
                        onClick={()=>{closeModal()}}
                     >Отмена</button>
                     <button style={{fontSize:"medium",width:"20%",marginLeft:"1%"}}
                        onClick={()=>{sendMoreTwoRecords(); }}
                     >Схранить запись</button>
                  </div>   
               </div>
         </Modal>
         <Modal visible={modalEditing} setVisible={closeModal}>{/*модалка редактирования*/}
            <table className="vspMagazineTableEditing">
               <thead>
                  <tr><th style={{width:"50px"}}>Номер пролёта</th><th style={{width:"8%"}}>Вид открытия</th>
                     <th style={{width:"6%"}}>Отчётная дата </th><th style={{width:"6%"}}>Время открытия</th>
                     <th style={{width:"6%"}}>Время закрытия</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td style={{width:"10%"}}>{/*Выбор пролёта в модалке редактирования*/}
                        <select value={infoEditing.prolet} onChange={(e)=>{
                            setInfoEditing({...infoEditing, prolet:e.target.value})
                           }}>
                           <option style={{display: "none"}} defaultValue="" >Выбирете номер пролёта</option>
                           <option>11</option><option>12</option><option>1</option><option>2</option><option>3</option>
                           <option>4</option><option>5</option><option>6</option><option>7</option><option>8</option>
                           <option>9</option><option>10</option>
                        </select>
                     </td>
                     <td>{/*Выбор вида открытия в модалке редактирования в зависимости от номера пролёта*/}
                        {
                           (infoEditing.prolet==='11'||infoEditing.prolet==='12')&&                        
                              <select value={infoEditing.typeOpen} onChange={(e)=>{
                                 setInfoEditing({...infoEditing, typeOpen:e.target.value})
                              }}>
                              <option style={{display: "none"}} defaultValue="" >Выбирете вид открытия</option>
                              <option>Перелив ниж. секц.</option><option>Полное открытие</option>
                           </select>
                        }
                        {
                           (infoEditing.prolet==='1'||infoEditing.prolet==='2'||infoEditing.prolet==='3'||
                            infoEditing.prolet==='4'||infoEditing.prolet==='5'||infoEditing.prolet==='6'||
                            infoEditing.prolet==='7'||infoEditing.prolet==='8'||infoEditing.prolet==='9'||
                            infoEditing.prolet==='10')&&                        
                           <select value={infoEditing.typeOpen} onChange={(e)=>{
                              setInfoEditing({...infoEditing, typeOpen:e.target.value})
                              }}>
                              <option style={{display: "none"}} defaultValue="" >Выбирете вид открытия</option>
                              <option>1 м</option><option>2 м</option><option>3 м</option><option>Полное открытие</option>
                           </select>
                        }
                        {
                           (infoEditing.prolet==='')&&                        
                           <select value={infoEditing.typeOpen} onChange={(e)=>{
                              setInfoEditing({...infoEditing, typeOpen:e.target.value})
                              }}>
                              <option style={{display: "none"}} defaultValue="" >Выбирете вид открытия</option>
                              <option>1 м</option><option>2 м</option><option>3 м</option>
                              <option>Перелив ниж. секц.</option><option>Полное открытие</option>
                           </select>
                        }

                     </td>
                     <td >
                        <div className="inputTimeCeilOpenMagazine">{/*Выбор даты в модалке редактирования*/}
                           <input type={"date"} value={`${infoEditing.openDate}`} onChange={(e)=>{
                                 setInfoEditing({...infoEditing, openDate:e.target.value})
                           }}/>
                        </div>
                     </td>
                     <td >{/*Ввод времени открытия в модалке редактирования*/}
                        <div className="inputTimeCeilOpenMagazine">
                        <span>{'час:'}</span>
                        <select  value={infoEditing.openTimeHours} onChange={(e)=>{
                                 setInfoEditing({...infoEditing, openTimeHours:e.target.value})
                              }}>
                              <option style={{display: "none"}} defaultValue="" >24</option>
                              <option>00</option><option>01</option><option>02</option><option>03</option>
                              <option>04</option><option>05</option><option>06</option><option>07</option>
                              <option>08</option><option>09</option><option>10</option><option>11</option>
                              <option>12</option><option>13</option><option>14</option><option>15</option>
                              <option>16</option><option>17</option><option>18</option><option>19</option>
                              <option>20</option><option>21</option><option>22</option><option>23</option>
                           </select>
                           <span>{'минуты:'}</span>
                           <select value={infoEditing.openTimeMinutes} onChange={(e)=>{
                                 setInfoEditing({...infoEditing, openTimeMinutes:e.target.value})
                              }}>
                              <option style={{display: "none"}} defaultValue="" >00</option>
                              <option>00</option><option>01</option><option>02</option><option>03</option><option>04</option>
                              <option>05</option><option>06</option><option>07</option><option>08</option>
                              <option>09</option><option>10</option><option>11</option><option>12</option>
                              <option>13</option><option>14</option><option>15</option><option>16</option>
                              <option>17</option><option>18</option><option>19</option><option>20</option>
                              <option>21</option><option>22</option><option>23</option><option>24</option>
                              <option>25</option><option>26</option><option>27</option><option>28</option>
                              <option>29</option><option>30</option><option>31</option><option>32</option>
                              <option>33</option><option>34</option><option>35</option><option>36</option>
                              <option>37</option><option>38</option><option>39</option><option>40</option>
                              <option>41</option><option>42</option><option>43</option><option>44</option>
                              <option>45</option><option>46</option><option>47</option><option>48</option>
                              <option>49</option><option>50</option><option>51</option><option>52</option>
                              <option>53</option><option>54</option><option>55</option><option>56</option>
                              <option>57</option><option>58</option><option>59</option>
                           </select>
                        </div>
                     </td>
                     <td>{/*Ввод времени закрытия в модалке редактирования*/}
                        <div  className="inputTimeCeilCloseMagazine">
                           <span>{'час:'}</span>
                        <select value={infoEditing.closeTimeHours} onChange={(e)=>{
                                 setInfoEditing({...infoEditing, closeTimeHours:e.target.value})
                              }}>
                              <option style={{display: "none"}} defaultValue="" >24</option>
                              <option>00</option><option>01</option><option>02</option><option>03</option><option>04</option>
                              <option>05</option><option>06</option><option>07</option><option>08</option>
                              <option>09</option><option>10</option><option>11</option><option>12</option>
                              <option>13</option><option>14</option><option>15</option><option>16</option>
                              <option>17</option><option>18</option><option>19</option><option>20</option>
                              <option>21</option><option>22</option><option>23</option><option>24</option>
                           </select>
                           <span>{'минуты:'}</span>
                           {infoEditing.closeTimeHours!=="24"&&
                                 <select value={infoEditing.closeTimeMinutes} onChange={(e)=>{
                                    setInfoEditing({...infoEditing, closeTimeMinutes:e.target.value})
                                    }}>
                                    <option style={{display: "none"}} defaultValue="" >00</option>
                                    <option>00</option><option>01</option><option>02</option><option>03</option><option>04</option>
                                    <option>05</option><option>06</option><option>07</option><option>08</option>
                                    <option>09</option><option>10</option><option>11</option><option>12</option>
                                    <option>13</option><option>14</option><option>15</option><option>16</option>
                                    <option>17</option><option>18</option><option>19</option><option>20</option>
                                    <option>21</option><option>22</option><option>23</option><option>24</option>
                                    <option>25</option><option>26</option><option>27</option><option>28</option>
                                    <option>29</option><option>30</option><option>31</option><option>32</option>
                                    <option>33</option><option>34</option><option>35</option><option>36</option>
                                    <option>37</option><option>38</option><option>39</option><option>40</option>
                                    <option>41</option><option>42</option><option>43</option><option>44</option>
                                    <option>45</option><option>46</option><option>47</option><option>48</option>
                                    <option>49</option><option>50</option><option>51</option><option>52</option>
                                    <option>53</option><option>54</option><option>55</option><option>56</option>
                                    <option>57</option><option>58</option><option>59</option>
                                 </select>
                           }
                           {infoEditing.closeTimeHours==="24"&&
                                 <select value={infoEditing.closeTimeMinutes} onChange={(e)=>{
                                       setInfoEditing({...infoEditing, closeTimeMinutes:"00"})
                                    }}>
                                    <option style={{display: "none"}} defaultValue="00" ></option>
                                    <option>00</option>
                                 </select>
                           }
                        </div>   
                     </td>
                  </tr>
               </tbody>
               <tfoot></tfoot>
            </table>
            <button onClick={()=>{
                  editAndSaveRecord()
               }}
               style={{marginLeft:"28%"}}>Перерасчитать и сохранить запись</button>
            <button onClick={()=>{
                  closeModal()
               }}
                style={{marginLeft:"2%"}}>Отмена</button>
         </Modal>
         <Modal visible={deleteModalPass} setVisible={closeModal}>
                <div>
                    Для удаления записи введите пароль администратора
                </div>
                <div style={{'textAlign':'center'}}>
                    <input 
                           style={{width:"30%",textAlign:"center"}}
                           type={'password'}
                           value={password}
                           onChange = {(e)=>{setPassword(e.target.value)}}
                           onKeyDown = {(e)=>{verifyPassModalRecordDelete(e)}}
                           placeholder={placeholder}
                   />
                </div>
            </Modal>
         <Modal visible={editModalPass} setVisible={closeModal}>
                <div>
                    Для редактирования записи введите пароль администратора
                </div>
                <div style={{'textAlign':'center'}}>
                    <input 
                           style={{width:"30%",textAlign:"center"}}
                           type={'password'}
                           value={password}
                           onChange = {(e)=>{setPassword(e.target.value)}}
                           onKeyDown = {(e)=>{verifyPassModalRecordEditing(e)}}
                           placeholder={placeholder}
                   />
                </div>
            </Modal>
      </div>
   )
}
export default MagazineVSP;






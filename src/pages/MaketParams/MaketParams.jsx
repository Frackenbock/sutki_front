import React,{useEffect,useState} from "react";
import classes from "./MaketParams.module.css";
import Modal from "../../components/Modal/Modal"
import Maket from "../../API/fetchForMaket17";
import { useNavigate} from "react-router-dom";

function  MaketParams() {
   const navigate = useNavigate();
   const [ipPost,setIpPost] =  useState('')
   const [changedText,setChangedText] =  useState('') 
   const [namePost,setNamePost] =  useState('')
   const [passwPost,setPasswPost] =  useState('')
   const apiMaket = new Maket();
   const [modal,setModal] = useState('');                    // для открытия модалки и передачи стэйта в компонент Modal
   const [numberForModal,setNumberForModal] = useState(0);   // определение какую именно модалку открывать 

   useEffect(()=>{// при первонначальной загрузке подгружаем все
      apiMaket.getAllParams()
      .then((data)=>{
         setIpPost(data.ip)
         setNamePost(data.name)
         setPasswPost(data.passw)
      })
   },[]);

   function closeModal(){// Закрытие любой модалке
      setModal(false);
   };

   function showModalForChangeIp(){
      setNumberForModal(1)
      setModal(true)
   }
   function showModalForChangeName(){
      setNumberForModal(2)
      setModal(true)
   }
   function showModalForChangePassw(){
      setNumberForModal(3)
      setModal(true)
   }

   function saveIp(){
      const data = {
         ip:changedText
      }
      apiMaket.saveNewIp(data)
      .then((data)=>{
         setIpPost(data[0].value)
         setChangedText('')
      })
      setModal(false)
   }

   function saveName(){
      const data = {
         name:changedText
      }
      apiMaket.saveNewName(data)
      .then((data)=>{
         setNamePost(data[0].value)
         setChangedText('')
      })
      setModal(false)
   }

   function savePassw(){
      const data = {
         passw:changedText
      }
      apiMaket.saveNewPassw(data)
      .then((data)=>{
         setPasswPost(data[0].value)
         setChangedText('')
      })
      setModal(false)
   }

   return (
    <div className={classes.contParamsMaket}>
      <div className={classes.buttonReturnBlokAndTitle}>
         <button 
            className={classes.buttonReturn}
            onClick={()=>{navigate("/maket17mail")}}
         > {`Возврат к макету`}</button> 
      </div>
      <div className={classes.contTableParams}>
         < div className={classes.contTitleParams}>
            <span >{"Параметры отправки макета"}</span>
         </div>
         <table className={classes.tableParams}>
            <thead>
               <tr>
                  <th className={classes.tableParamsTh}>{"IP-адрес почтового сервера"}</th>
                  <th className={classes.tableParamsTh}>{ipPost}</th>
                  <th className={classes.tdButton}>
                     <button 
                        className={classes.buttonRD}
                        onClick={(e)=>{
                           showModalForChangeIp()
                        }} 
                     >
                        {"Изменить"}
                     </button>
                  </th>
               </tr>
               <tr>
                  <th className={classes.tableParamsTh}>{"Имя учётной записи отправителя "}</th>
                  <th className={classes.tableParamsTh}>{namePost}</th>
                  <th className={classes.tdButton}>
                     <button 
                        className={classes.buttonRD}
                        onClick={(e)=>{
                           showModalForChangeName()
                        }} 
                     >
                        {"Изменить"}
                     </button>
                  </th>
               </tr>
               <tr>
                  <th className={classes.tableParamsTh}>{"Пароль от учётной записи отправителя"}</th>
                  <th className={classes.tableParamsTh}>{passwPost}</th>
                  <th className={classes.tdButton}>
                     <button 
                        className={classes.buttonRD}
                        onClick={(e)=>{
                           showModalForChangePassw()
                        }} 
                     >
                        {"Изменить"}
                     </button>
                  </th>
               </tr>
            </thead>
            <tbody></tbody>
            <tfoot></tfoot>
         </table>
      </div>

      {  numberForModal===1 &&          
         <Modal visible={modal} setVisible={closeModal}>
            <div style={{textAlign:"center"}}>
                {"Новый IP-адрес почтового сервера"}
            </div>
            <div className={classes.chagedIp}>
              <div className={classes.divNewIp}>
                 <input 
                    style={{width:"100%",textAlign:"center"}}
                    type={'text'}
                    value={changedText}
                    onChange={(e)=>{setChangedText(e.target.value)}}
                 />
              </div>
              <button className={classes.buttonSaveChangedRecord}  onClick={(e)=>{saveIp(e)}}>{"Сохранить"}</button>
            </div>
         </Modal>
      }

      {  numberForModal===2 &&          
         <Modal visible={modal} setVisible={closeModal}>
            <div style={{textAlign:"center"}}>
                {"Новое имя для учётной записи отправителя"}
            </div>
            <div className={classes.chagedIp}>
              <div className={classes.divNewIp}>
                 <input 
                    style={{width:"100%",textAlign:"center"}}
                    type={'text'}
                    value={changedText}
                    onChange={(e)=>{setChangedText(e.target.value)}}
                 />
              </div>
              <button className={classes.buttonSaveChangedRecord} onClick={(e)=>{saveName(e)}}>{"Сохранить"}</button>
            </div>
         </Modal>
      }

      {  numberForModal===3 &&          
         <Modal visible={modal} setVisible={closeModal}>
            <div style={{textAlign:"center"}}>
                {"Новый пароль для учётной записи отправителя"}
            </div>
            <div className={classes.chagedIp}>
              <div className={classes.divNewIp}>
                 <input 
                    style={{width:"100%",textAlign:"center"}}
                    type={'text'}
                    value={changedText}
                    onChange={(e)=>{setChangedText(e.target.value)}}
                 />
              </div>
              <button className={classes.buttonSaveChangedRecord}  onClick={(e)=>{savePassw(e)}}>{"Сохранить"}</button>
            </div>
         </Modal>
      }
    </div>
   )
}
export default MaketParams;

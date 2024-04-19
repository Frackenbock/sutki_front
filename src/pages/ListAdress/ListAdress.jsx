import React,{useEffect,useState} from "react";
import cl from "./ListAdress.module.css";
import { useNavigate} from "react-router-dom";
import Maket from "../../API/fetchForMaket17";
import Modal from "../../components/Modal/Modal"
import Button from "../../components/UI/Button_layout/Button"
import { useSelector } from "react-redux";

function  ListAdress() {
   const navigate = useNavigate();
   const apiMaket = new Maket();
   const [emails,setEmails]=useState([{email:'',description:''}]);//отображение всех email-ов в таблице
   const [placeholder,setPlaceholder]=useState('Введите пароль'); //Надпись для поля ввода пароля
   const [idEmail,setIdEmail]=useState('');                  // буффер для предполагаемой удаляемой записи
   const [modal,setModal] = useState('');                    // для открытия модалки и передачи стэйта в компонент Modal
   const [numberForModal,setNumberForModal] = useState(0);   // определение какую именно модалку открывать 
   const [password,setPassword] = useState('');              // для вводимого пароля (для сравнения с соранённым)
   const [newEmail,setNewEmail] = useState('');              // для нового email
   const [newDescription,setNewDescription] = useState('');  // для нового описания 
   const passw = useSelector((state)=>{return state.admin.passw});//сохранённый пароль (для сравнения с вводимым) 

   useEffect(()=>{// при первонначальной загрузке подгружаем все emails
      apiMaket.getDataEmails()
      .then((data)=>{
         setEmails(data);
      })
   },[]);
   function deleteRecord(e){//На кнопке "Удалить", откроет модалку ввода пароля администратора
      setModal(true);
      setNumberForModal(3);
      setIdEmail(e.target.id)
   };
   function addNewAdress(){//На кнопке "Добавить новый адрес", откроет модалку ввода пароля администратора
      setModal(true);
      setNumberForModal(1);
   };
   function closeModal(){// Закрытие любой модалке
      setModal(false);
      setPlaceholder('')
   };
   function verifyPasswordNewRecord(e){ // при введении верного или неверного пароля для добавления пользователя
      if(e.keyCode===13){
         if(e.target.value===passw){
            setPassword('')
            setNumberForModal(4);
            setPlaceholder('Введите пароль')
         }else{
            setPlaceholder("Неверный пароль, повторите")
            setPassword('')
         }
      };
      if(e.keyCode===27){
         closeModal();
         setPlaceholder('Введите пароль')
      };
   };

   function verifyPasswordDeleteRecord(e){ // при введении верного или неверного пароля для удаления пользователя
      if(e.keyCode===13){
         if(e.target.value===passw){
            setPassword('')
            setNumberForModal(2);
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
   };

   function saveNewRecord(){//на кнопке "Сохранить" при добавлении нового адреса получателя
      const data={
         newEmail,newDescription
      };
      apiMaket.addNewEmail(data)
      .then((data)=>{
         setEmails([...emails,data])
         closeModal();
      })
   };

   function sendNewRecordToServer(){//на кнопке "Да" при подтверждении удаления получателя
      const data={
         email:idEmail
      };
      apiMaket.deleteEmail(data)
      .then((data)=>{
         console.log(data);
         setEmails(data)
         closeModal();
      })
   }

   return (
    <div className={cl.divMainListAdress}>
      <button 
         className={cl.buttonReturnToMaket}
         onClick={()=>{navigate("/maket17mail")}}
      > {`Возврат к макету`}</button> 
      <div className={cl.divTitleListAdresses}>
         <span >{"Список получателей макета"}</span>
      </div>
      <div className={cl.divTableListAdresses}>
         <table className={cl.tableListAdresses}>
            <thead >
               <tr>
                  <th className={cl.thTableListAdresses}>{"Email-адрес получателя"}</th>
                  <th className={cl.thTableListAdresses}>{"Описание"}</th>
                  <th className={cl.tdButton}></th>
               </tr>
            </thead>
            <tbody>
               {
                  emails.map((str)=>{
                     return(
                     <tr key={str.email}>
                        <td >{str.email}</td>
                        <td>{str.description}</td> 
                        <td className={cl.tdButton}>
                           <button 
                              className={cl.buttonRemove}
                              id={str.email}
                              onClick={(e)=>{
                                 deleteRecord(e)
                              }} 
                           >
                              {"Удалить"}
                           </button>
                        </td>
                     </tr>
                     )
                  })
               }
            </tbody>
            <tfoot></tfoot>
         </table>
         <Button
            value={"Добавить новый адрес"}
            onClick = {(e)=>{
               addNewAdress(e);setPassword('')
            }}
         >
         </Button>
      </div>

      {  numberForModal===1 &&          
            <Modal visible={modal} setVisible={closeModal}>
                <div>
                    {"Для возможности добавления нового адреса в рассылку, введите пароль администратора"}
                </div>
                <div style={{'textAlign':'center'}}>
                    <input 
                        style={{width:"22%",textAlign:"center"}}
                        type={'password'}
                        value={password}
                        onChange = {(e)=>{setPassword(e.target.value)}}
                        onKeyDown = {(e)=>{verifyPasswordNewRecord(e)}}
                        placeholder={placeholder}
                   />
                </div>
             </Modal>
      }
      {  numberForModal===2 &&          
            <Modal visible={modal} setVisible={closeModal}>
                <div>
                    Вы действительно хотите удалить запись?
                </div>
                <div style={{'textAlign':'center'}}>
                    <button onClick={(e)=>{
                        sendNewRecordToServer(e)
                    }}>
                        Да
                    </button>
                    <button
                        onClick={()=>{
                           closeModal()
                        }}
                     >
                        Нет
                    </button>
                </div>
             </Modal>
      }
      {  numberForModal===3 &&          
            <Modal visible={modal} setVisible={closeModal}>
                <div>
                    {"Для возможности удаления записи, введите пароль администратора"}
                </div>
                <div style={{'textAlign':'center'}}>
                    <input 
                           style={{width:"30%",textAlign:"center"}}
                           type={'password'}
                           value={password}
                           onChange = {(e)=>{setPassword(e.target.value)}}
                           onKeyDown = {(e)=>{verifyPasswordDeleteRecord(e)}}
                           placeholder={placeholder}
                   />
                </div>
             </Modal>
      }
      {  numberForModal===4 &&          
            <Modal visible={modal} setVisible={closeModal}>
                <div>
                  {"Новый получатель для макета №17"}
                </div>
                <div className={cl.divNewAdress}>
                  <div className={cl.divNewEmail}>
                     <span>{"Введите email:"}</span>
                     <input 
                        style={{width:"350px"}}
                        type={'text'}
                        value={newEmail}
                        onChange={(e)=>{setNewEmail(e.target.value)}}
                     />
                  </div>
                  <div className={cl.divNewDescription}>
                  <span>{"Введите описание:"}</span>
                     <input 
                        style={{width:"350px"}}
                        type={'text'}
                        value={newDescription}
                        onChange={(e)=>{setNewDescription(e.target.value)}}
                     />
                  </div>
                  <button
                     onClick={(e)=>{
                        saveNewRecord(e)
                     }}
                     >
                     {"Сохранить"}
                   </button>
                </div>
             </Modal>
      }
    </div>
   )
}
export default ListAdress;

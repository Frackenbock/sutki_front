import React,{useState} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import cl from "./layout.module.css";
import Button from "../UI/Button_layout/Button";
import { useSelector,useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";

function Layout() {
  let navigate = useNavigate();
  const buttonsLayout = useSelector((state)=>{return  state.buttons.layoutButtonsState;});
  const dispatch = useDispatch();
  const [modal,setModal] = useState(false);
  const [password,setPassword] = useState('');              // для вводимого пароля (для сравнения с соранённым)
  const [placeholder,setPlaceholder]=useState('Введите пароль'); //Надпись для поля ввода пароля
  const passw = useSelector((state)=>{return state.admin.passw});//сохранённый пароль (для сравнения с вводимым) 

  const date = useSelector((state)=>{
    return  state.date
   })

  function closeModal(){// Закрытие любой модалке
    setModal(false);
 };
 function checkPassword(e){
    if(e.keyCode===13){
      if(e.target.value===passw){
        navigate('/gfytkmflvbyf')
        dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'',vspButton:'',pbrAiisButton:'',pbrButton:'',maketButton:'',adminButton:'lightgreen'}});
        setPassword('')
        setPlaceholder('')
        closeModal();
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

 return (
      <div className={cl.bodyFlex}>
        <div className={cl.header}>
          <div className={cl.buttonsResourses}>
            <Button
              style={{backgroundColor:buttonsLayout.sutkiButton}}
              value={"Расход через генераторы"}
              onClick={() => {
                navigate("/sutki");
                dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'lightgreen',vspButton:'',pbrAiisButton:'',pbrButton:'',maketButton:'',adminButton:'',srRashodButton:''}});
                dispatch({type:"CHANGE_BUTTONS_SUTKI",payload:{mainButton:'lightgreen',stokButton:'',rashodButton:'',itogButton:''}});
              }}
            />
            <Button
              style={{backgroundColor:buttonsLayout.vspButton}}
              value={"Расход через ВСП"}
              onClick={() => {
                navigate("/vsp");
                dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'',vspButton:'lightgreen',pbrAiisButton:'',pbrButton:'',maketButton:'',adminButton:'',srRashodButton:''}});
              }}
            />
            <Button
              style={{backgroundColor:buttonsLayout.pbrAiisButton}}
              value={"ПБР АИИСКУЭ"}
              onClick={() => {
                navigate("/pbr_aiiskue");
                dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'',vspButton:'',pbrAiisButton:'lightgreen',pbrButton:'',maketButton:'',adminButton:'',srRashodButton:''}});
              }}
            />
            <Button
              style={{backgroundColor:buttonsLayout.pbrButton}}
              value={"ПБР"}
              onClick={() => {
                navigate("/pbr");
                dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'',vspButton:'',pbrAiisButton:'',pbrButton:'lightgreen',maketButton:'',adminButton:'',srRashodButton:''}});
              }}
            />
            <Button
              style={{backgroundColor:buttonsLayout.maketButton}}
              value={"Maket №17"}
              onClick={() => {
                navigate("/maket17mail");
                dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'',vspButton:'',pbrAiisButton:'',pbrButton:'',maketButton:'lightgreen',adminButton:'',srRashodButton:''}});
              }}
            />
            <Button
              style={{backgroundColor:buttonsLayout.srRashodButton}}
              value={"Расход, сток и выработка"}
              onClick={() => {
                navigate("/srednrashod");
                dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'',vspButton:'',pbrAiisButton:'',pbrButton:'',maketButton:'',adminButton:'',srRashodButton:'lightgreen'}});
              }}
            />
          </div>
          <div className={cl.date}>
             <Button
              style={{marginRight:'20px',backgroundColor:buttonsLayout.adminButton}}
              value={"Панель администратора"}
              onClick={() => {
                setModal(true)
              }}
            />
              <input type="date" value={date} onChange={(e)=>{
                dispatch({type:"CHANGE_DATE",payload:e.target.value})
              }}/>
          </div>
        </div>
        <div className={cl.outlet}>
          <Outlet />
        </div>
        <Modal visible={modal} setVisible={closeModal}>
                <div>
                    Введите пароль администратора
                </div>
                <div style={{'textAlign':'center'}}>
                    <input 
                           style={{width:"100%",textAlign:"center"}}
                           type={'password'}
                           value={password}
                           onChange = {(e)=>{setPassword(e.target.value)}}
                           onKeyDown = {(e)=>{checkPassword(e)}}
                           placeholder={placeholder}
                   />
                </div>
        </Modal>
      </div>

  );
}

export default Layout;

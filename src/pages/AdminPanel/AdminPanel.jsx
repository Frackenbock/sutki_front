import React, {useState} from "react";
import classes from "./AdminPanel.module.css";
import AdminPanelMagazineVSP from "../AdminPanelMagazineVSP/AdminPanelMagazineVSP";
import AdminPanelHourRashodVSP from "../AdminPanelHourRashodVSP/AdminPanelHourRashodVSP";
import AdminPanelHourZnachUVB from "../AdminPanelHourZnachUVB/AdminPanelHourZnachUVB";
import AdminPanelHourZnachNapor from "../AdminPanelHourZnachNapor/AdminPanelHourZnachNapor";
import AdminPanelLogging from "../AdminPanelLogging/AdminPanelLogging";
import AdminPanelMaket17 from "../AdminPanelMaket17/AdminPanelMaket17";

function  AdminPanel() {
   const [numberWindow,setNumberWindow]=useState(2);
   const [colorButtons,setColorButtons]=useState({UvbColor:'',ProletColor:'',HourProletColor:'',naporColor:'lightgreen',logs:''});
   return (
      <div className={classes.adminCont}>
         <div className={classes.blockButtonAdmin}>
            <button 
               className={classes.buttonAdm}
               style={{marginRight:'5px',backgroundColor:colorButtons.ProletColor}} 
               onClick={()=>{
                  setNumberWindow(3); 
                  setColorButtons({UvbColor:'',ProletColor:'lightgreen',HourProletColor:'',naporColor:'',logs:'',maket:''})
               }}>
               {"Журнал открытий и закрытий пролётов"}</button>
            <button 
               className={classes.buttonAdm}
               style={{marginRight:'5px',backgroundColor:colorButtons.HourProletColor}} 
               onClick={()=>{setNumberWindow(4); setColorButtons({UvbColor:'',ProletColor:'',HourProletColor:'lightgreen',naporColor:'',logs:'',maket:''})}}>
                  {"Журнал часовых значений расхода за сутки через ВСП"}</button>
            <button 
               className={classes.buttonAdm}
               style={{marginRight:'5px',backgroundColor:colorButtons.UvbColor}} 
               onClick={()=>{setNumberWindow(1); setColorButtons({UvbColor:'lightgreen',ProletColor:'',HourProletColor:'',naporColor:'',logs:'',maket:''})}}>
                  {"Данные УВБ"}</button>
            <button 
               className={classes.buttonAdm}
               style={{marginRight:'5px',backgroundColor:colorButtons.naporColor}} 
               onClick={()=>{setNumberWindow(2); setColorButtons({UvbColor:'',ProletColor:'',HourProletColor:'',naporColor:'lightgreen',logs:'',maket:''})}}>
                  {"Данные напоров"}</button>
            <button 
               className={classes.buttonAdm}
               style={{marginRight:'5px',backgroundColor:colorButtons.maket}} 
               onClick={()=>{setNumberWindow(6); setColorButtons({UvbColor:'',ProletColor:'',HourProletColor:'',naporColor:'',logs:'',maket:'lightgreen'})}}>
                  {"Данные макета №17"}</button>
            <button 
               className={classes.buttonAdm}
               style={{marginRight:'5px',backgroundColor:colorButtons.logs}} 
               onClick={()=>{setNumberWindow(5); setColorButtons({UvbColor:'',ProletColor:'',HourProletColor:'',naporColor:'',logs:'lightgreen',maket:''})}}>
                  {"Логи выгрузки выработки"}</button>
         </div>
         {numberWindow===1 && <AdminPanelHourZnachUVB/> }
         {numberWindow===2 && <AdminPanelHourZnachNapor/>}
         {numberWindow===3 && <AdminPanelMagazineVSP/> }
         {numberWindow===4 && <AdminPanelHourRashodVSP/> }
         {numberWindow===5 && <AdminPanelLogging/> }
         {numberWindow===6 && <AdminPanelMaket17/> }
      </div>
   )
}
export default AdminPanel;






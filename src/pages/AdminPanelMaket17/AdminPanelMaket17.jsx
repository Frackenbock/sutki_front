import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import classes from"./AdminPanelMaket17.module.css";
import AdminPanelMaket from "../../API/fetchForAdminMaket17";
import Modal from "../../components/Modal/Modal"
import SelectDiapazonDate from "../../components/UI/SelectDiapazonDate/SelectDiapazonDate";

function  AdminPanelMaket17() {
   const apiMaket = new AdminPanelMaket();
   const dispatch = useDispatch();
   const arrMaket17 = useSelector((state)=>{return  state.admin.arrMaket17;});

   const dateBeginForReadMaketData = useSelector((state)=>{return  state.admin.dateBeginForReadMaket17;});
   const dateEndForReadMaketData = useSelector((state)=>{return  state.admin.dateEndForReadMaket17;});

   function readMaketData(){
      const dataToServer={
         dateBeginDiapazone:dateBeginForReadMaketData,
         dateEndDiapazone:dateEndForReadMaketData,
      }
      apiMaket.getMaketData(dataToServer)
      .then((data)=>{
         dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_MAKET17",payload:data})
      })
   }

   return (
    <div className={classes.divMainAdminMaket}>
      <span className={classes.spanTitlePageAdminMaket}>{"Данные Макета №17"}</span>
      <SelectDiapazonDate
         dateBegin = {dateBeginForReadMaketData}
         dateEnd = {dateEndForReadMaketData}
         changeDateBegin={(e)=>{ 
            dispatch({type:"CHANGE_ADMIN_DATE_BEGIN_FOR_READ_MAKET17",payload:e.target.value})}}
         changeDateEnd={(e)=>{
            dispatch({type:"CHANGE_ADMIN_DATE_END_FOR_READ_MAKET17",payload:e.target.value})}}
         readBD={readMaketData}
         text = {"Прочитать БД"}/> 
         <table className={classes.tableAdminMaket}>
            <thead></thead>
            <tbody>
               {
                  arrMaket17.map((dayMaket)=>{
                     return(
                     <tr className={classes.trMainInTableAdminMaket} key={dayMaket.date}>
                        <tr>
                           <td className={classes.tdWithDateInTableAdminMaket} rowSpan={5}>{dayMaket.date}</td>
                        </tr>
                        <tr className={classes.trInTableAdminMaket}>
                           <td>{"Направление ветра"}</td>
                           <td>{"Скорость ветра"}</td>
                           <td>{"Средний верхний бьеф"}</td>
                           <td>{"Нижний бьеф на 8 часов утра"}</td>
                           <td>{"Верхний бьеф на 8 часов утра"}</td>
                           <td>{"Средний нижний бьеф за вчера"}</td>
                           <td>{"Нижний бьеф максимальный"}</td>
                           <td>{"Нижний бьеф минимальный"}</td>
                           <td>{"Средний напор за сутки"}</td>
                           <td>{"Полный приток"}</td>
                           <td>{"Боковой приток"}</td>
                           <td>{"Суммарный расход"}</td>
                           <td>{"Расход через турбины"}</td>
                        </tr>
                        <tr className={classes.trInTableAdminMaket}>
                           <td>{dayMaket.napravlenie_vetra_8_00}</td>
                           <td>{dayMaket.scorost_vetra_8_00}</td>
                           <td>{dayMaket.v_bief_sr}</td>
                           <td>{dayMaket.n_bief_8_00}</td>
                           <td>{dayMaket.v_bief_8_00}</td>
                           <td>{dayMaket.n_bief_sr_old}</td>
                           <td>{dayMaket.n_bief_max}</td>
                           <td>{dayMaket.n_bief_min}</td>
                           <td>{dayMaket.napor_sr_sutki}</td>
                           <td>{dayMaket.polni_pritok}</td>
                           <td>{dayMaket.bokovoi_pritok}</td>
                           <td>{dayMaket.rashod_sum_n_bief}</td>
                           <td>{dayMaket.rashod_turbin}</td>
                        </tr>

                        <tr className={classes.trInTableAdminMaket}>
                           <td>{"Расход через ВСП"}</td>
                           <td>{"Расход на ХХ"}</td>
                           <td>{"Расход на фильтрацию"}</td>
                           <td>{"Расход на шлюзование"}</td>
                           <td>{"Максимальная нагрузка"}</td>
                           <td>{"Минимальная нагрузка"}</td>
                           <td>{"Агрегатов в работе"}</td>
                           <td>{"Агрегатов в ремонте"}</td>
                           <td>{"Суммарная мощность в ремонте"}</td>
                           <td>{"Суммарная выработка"}</td>
                           <td>{"Выработка с начала месяца"}</td>
                           <td>{"Собственное потребление за сутки"}</td>
                           <td>{"Собственное потребление с начала месяца"}</td>
                        </tr>
                        <tr className={classes.trInTableAdminMaket}>
                           <td>{dayMaket.rashod_vodosbros}</td>
                           <td>{dayMaket.rashod_holost_hod}</td>
                           <td>{dayMaket.rashod_filtr}</td>
                           <td>{dayMaket.rashod_shluz}</td>
                           <td>{dayMaket.max_nagr_ges}</td>
                           <td>{dayMaket.min_nagr_ges}</td>
                           <td>{dayMaket.kolvo_rab_agr}</td>
                           <td>{dayMaket.agr_rem}</td>
                           <td>{dayMaket.sum_moshn_v_rem}</td>
                           <td>{dayMaket.sum_virabotka}</td>
                           <td>{dayMaket.virabotka_s_nach_mes}</td>
                           <td>{dayMaket.sobstv_sut_potr}</td>
                           <td>{dayMaket.sobstv_potr_nach_mes}</td>
                        </tr>
                     </tr>
                     )
                  })
               }
            </tbody>
            <tfoot></tfoot>
         </table>         
    </div>
   )
}
export default AdminPanelMaket17;

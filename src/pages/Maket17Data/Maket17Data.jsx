import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from"./Maket17Data.module.css";
import AdminPanelMaket from "../../API/fetchForAdminMaket17";
import SelectDiapazonDate from "../../components/UI/SelectDiapazonDate/SelectDiapazonDate";
import {utils,writeFile} from 'xlsx';

function  Maket17Data() {
   const apiMaket = new AdminPanelMaket();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const arrMaket17 = useSelector((state)=>{return  state.maket.arrMaket17;});

   const dateBeginForReadMaketData = useSelector((state)=>{return  state.maket.dateBeginForReadMaket17;});
   const dateEndForReadMaketData = useSelector((state)=>{return  state.maket.dateEndForReadMaket17;});

   function readMaketData(){
      const dataToServer={
         dateBeginDiapazone:dateBeginForReadMaketData,
         dateEndDiapazone:dateEndForReadMaketData,
      };
      apiMaket.getMaketData(dataToServer)
      .then((data)=>{
         dispatch({type:"CHANGE_ADMIN_ARR_RECORDS_MAKET17",payload:data})
      });
   };

   function exportExel(){
      if(arrMaket17.length!==0){
         var exportArrMaket=[];// массив  данных для 
         var wscolsArrMaket = [
            {wch:12},{wch:18},{wch:16},
            {wch:22},{wch:26},{wch:26},
            {wch:28},{wch:26},{wch:26},
            {wch:25},{wch:16},{wch:16},
            {wch:18},{wch:22},{wch:18},
            {wch:16},{wch:22},{wch:22},
            {wch:22},{wch:22},{wch:21},

            {wch:22},{wch:29},{wch:22},

            {wch:25},{wch:31},{wch:39},


         ];
         for (let i=0;i<arrMaket17.length;i++){
            exportArrMaket.push({
               'Дата':arrMaket17[i].date,     'Направление ветра':arrMaket17[i].napravlenie_vetra_8_00, 'Скорость ветра':arrMaket17[i].scorost_vetra_8_00,  
               'Средний верхний бьеф':arrMaket17[i].v_bief_sr,'Нижний бьеф на 8 часов утра':arrMaket17[i].n_bief_8_00,'Верхний бьеф на 8 часов утра':arrMaket17[i].v_bief_8_00,
               'Средний нижний бьеф за вчера':arrMaket17[i].n_bief_sr_old, 'Нижний бьеф максимальный':arrMaket17[i].n_bief_max,'Нижний бьеф минимальный':arrMaket17[i].n_bief_min, 
               'Средний напор за сутки':arrMaket17[i].napor_sr_sutki,
               'Полный приток':arrMaket17[i].polni_pritok,
               'Боковой приток':arrMaket17[i].bokovoi_pritok, 
               'Суммарный расход':arrMaket17[i].rashod_sum_n_bief,
               'Расход через турбины':arrMaket17[i].rashod_turbin,
               'Расход через ВСП':arrMaket17[i].rashod_vodosbros, 
               'Расход на ХХ':arrMaket17[i].rashod_holost_hod,
               'Расход на фильтрацию':arrMaket17[i].rashod_filtr, 
               'Расход на шлюзование':arrMaket17[i].rashod_shluz,
               'Максимальная нагрузка':arrMaket17[i].max_nagr_ges, 
               'Минимальная нагрузка':arrMaket17[i].min_nagr_ges,
               'Агрегатов в работе':arrMaket17[i].kolvo_rab_agr, 
               'Агрегатов в ремонте':arrMaket17[i].agr_rem,
               'Суммарная мощность в ремонте':arrMaket17[i].sum_moshn_v_rem, 
               'Суммарная выработка':arrMaket17[i].sum_virabotka,
               'Выработка с начала месяца':arrMaket17[i].virabotka_s_nach_mes, 
               'Собственное потребление за сутки':arrMaket17[i].sobstv_sut_potr,
               'Собственное потребление с начала месяца':arrMaket17[i].sobstv_potr_nach_mes, 

            })
         };

         var wb = utils.book_new();
         var wsMaketTable = utils.json_to_sheet(exportArrMaket);
         wsMaketTable['!cols'] = wscolsArrMaket;

         utils.book_append_sheet(wb,wsMaketTable, 'Главная таблица');

         writeFile(wb,`Таблица данных макетов с ${dateBeginForReadMaketData} до ${dateEndForReadMaketData}.xlsx`)
      }else{
         return;
      }  
   }

   return (
    <div className={classes.divMainAdminMaket}>  
      <div className={classes.buttonReturnBlokAndTitle}>
         <button 
            className={classes.buttonReturn}
            onClick={()=>{navigate("/maket17mail")}}
         > {`Возврат к макету`}</button> 
         <button 
            className={classes.buttonReturn}
            onClick={()=>{exportExel()}}
         > {`Выгрузка таблицы в Exel`}</button> 
      </div>
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
export default Maket17Data;

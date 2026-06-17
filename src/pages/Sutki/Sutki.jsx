import React,{useState} from "react";
import { useNavigate, Outlet} from "react-router-dom";
import Button from "../../components/UI/ButtonSutkiLayoutPage/ButtonSutkiLayoutPage";
import cl from "./Sutki.module.css";
import { useSelector,useDispatch } from "react-redux";
import normalizeItogData from '../../utils/normalizeItogData';
import Modal from "../../components/Modal/Modal";
import fetchItog from '../../API/fetchItog';
import normalizeDate from '../../utils/normalizeDate';
import {utils,writeFile} from 'xlsx';

function  Sutki() {

   const calculationDoneFlag = useSelector((state)=>{return  state.sutki.calculationDoneFlag;});
   const buttonsSutki = useSelector((state)=>{return  state.buttons.sutkiButtonsState;});
   const [modal,setModal] = useState(false); 
   const dispatch = useDispatch();
   let navigate = useNavigate();

   const date = useSelector((state)=>{return  state.sutki.date;});

   const arrTimes = useSelector((state)=>{return state.sutki.times});          //массив времён работы генераторов за сутки (192 знач)
   const summTimes = useSelector((state)=>{return state.sutki.summTimes});     //массив сумм времён работы генераторов за сутки (8 знач)
   const napors = useSelector((state)=>{return  state.sutki.napors;});         //массив часовых напоров за сутки (24 знач)
   const sredniyNapor = useSelector((state)=>{return state.sutki.sredniyNapor})//средний напор за сутки
   const totalPower = useSelector((state)=>{return state.sutki.totalPower});                 //суммарная выработка за сутки
   const arrSumPowerForHour = useSelector((state)=>{return state.sutki.arrSumPowerForHour}); //массив сумм часовых значений выработки всех генераторов за сутки(24 знач)
   const powersGenerators = useSelector((state)=>{return state.sutki.powersGenerators});     //массив выработки генераторов за сутки(192 знач)
   const arrSumPowersGenForSutki = useSelector((state)=>{return state.sutki.arrSumPowersGenForSutki});//массив сумм выработки генераторов за сутки (8 знач)
   const rashodData = useSelector((state)=>{return state.rashod.rashodData});     
   const stokData = useSelector((state)=>{return state.stok.stokData});
   const totalRashod = useSelector((state)=>{return state.rashod.totalRashod});   //средний расход за сутки
   const sumGenRashod = useSelector((state)=>{return state.rashod.sumGenRashod})
   const totalStok = useSelector((state)=>{return state.stok.totalStok});
   const udelnRashod = useSelector((state)=>{return state.rashod.udelnRashod});   //удельный расход
   const sumGenStok = useSelector((state)=>{return state.stok.sumGenStok});

   const TimeHH = useSelector((state)=>{return state.itog.TimeHH});
   const StokHH = useSelector((state)=>{return state.itog.StokHH});
   const RashodHH = useSelector((state)=>{return state.itog.RashodHH});;

   const itogApi = new fetchItog();

   function closeModal(){
      setModal(false);
  };

  function OpenModalForSave(){//отрабатывает при нажатии на кнопку сохранить данные
   setModal(true);
  }

//Экспорт в Exel главной таблицы, таблицы расходов и итоговой таблицы
function ExportTable(){
   var exportArrMainTable=[];// массив  данных для листа главной таблицы в Exel
   var exportArrRashod=[];// массив  данных для листа расходов в Exel
   var ArrItogTable=[];
///////////////Настройка столбцов для Exel главной таблицы 
   var wscolsMainTable = [
      {wch:6},{wch:10},{wch:8},
      {wch:8},{wch:8},{wch:8},{wch:8},
      {wch:8},{wch:8},{wch:8},{wch:8},
      {wch:8},{wch:8},{wch:8},{wch:8},
      {wch:8},{wch:8},{wch:8},{wch:8},
      {wch:14},{wch:11},{wch:14},
  ];
///////////////
///////////////Настройка столбцов для Exel таблицы расходов
   var wscolsRashod = [
      {wch:7},{wch:10},{wch:12},
      {wch:12},{wch:12},{wch:12},{wch:12},
      {wch:12},{wch:12},{wch:12},{wch:12},
      {wch:14},
  ];
///////////////
///////////////Настройка столбцов для Exel Итоговой таблицы
   var wscolsItogTable = [
      {wch:12},{wch:15},{wch:12},
      {wch:12},{wch:17},{wch:12},{wch:12},
  ];
///////////////
///////////////Заполнение массива данных для Exel таблицы расходов
   for (let i=0;i<24;i++){
      exportArrRashod.push({
         '№ часа':stokData[i].number,'Интервал':stokData[i].time,
         'ГГ-1(Млн. м3)':rashodData[i].gen1,'ГГ-2(Млн. м3)':rashodData[i].gen2,
         'ГГ-3(Млн. м3)':rashodData[i].gen3,'ГГ-4(Млн. м3)':rashodData[i].gen4,
         'ГГ-5(Млн. м3)':rashodData[i].gen5,'ГГ-6(Млн. м3)':rashodData[i].gen6,
         'ГГ-7(Млн. м3)':rashodData[i].gen7,'ГГ-8(Млн. м3)':rashodData[i].gen8,
         'Сток(Млн. м3)':rashodData[i].summ,})
   };
   exportArrRashod.push({
      '№ часа':'','Интервал':'Итог',
      'ГГ-1(Млн. м3)':sumGenRashod[0],'ГГ-2(Млн. м3)':sumGenRashod[1],
      'ГГ-3(Млн. м3)':sumGenRashod[2],'ГГ-4(Млн. м3)':sumGenRashod[3],
      'ГГ-5(Млн. м3)':sumGenRashod[4],'ГГ-6(Млн. м3)':sumGenRashod[5],
      'ГГ-7(Млн. м3)':sumGenRashod[6],'ГГ-8(Млн. м3)':sumGenRashod[7],
      'Сток(Млн. м3)':totalRashod,});
///////////////
///////////////Заполнение массива данных для Exel главной таблицы 
   for (let i=0;i<24;i++){
      exportArrMainTable.push({
         '№ часа':napors[i].number,'Интервал':napors[i].time,'Напор(м)':napors[i].input,
         'ГГ-1(кВТ)':powersGenerators[i].gen1,'ГГ-1(мин)':arrTimes[i].gen1,'ГГ-2(кВТ)':powersGenerators[i].gen2,'ГГ-2(мин)':arrTimes[i].gen2,
         'ГГ-3(кВТ)':powersGenerators[i].gen3,'ГГ-3(мин)':arrTimes[i].gen3,'ГГ-4(кВТ)':powersGenerators[i].gen4,'ГГ-4(мин)':arrTimes[i].gen4,
         'ГГ-5(кВТ)':powersGenerators[i].gen5,'ГГ-5(мин)':arrTimes[i].gen5,'ГГ-6(кВТ)':powersGenerators[i].gen6,'ГГ-6(мин)':arrTimes[i].gen6,
         'ГГ-7(кВТ)':powersGenerators[i].gen7,'ГГ-7(мин)':arrTimes[i].gen7,'ГГ-8(кВТ)':powersGenerators[i].gen8,'ГГ-8(мин)':arrTimes[i].gen8,
         'Сток(Млн. м3)':stokData[i].summ,'Расход(м3/c)':rashodData[i].summ,'Выработка(МВт)':arrSumPowerForHour[i].power,})
      }
   exportArrMainTable.push({
      '№ часа':'','Интервал':'Итог','Напор(м)':'м','ГГ-1(кВТ)':'МВтч','ГГ-1(мин)':'мин','ГГ-2(кВТ)':'МВтч','ГГ-2(мин)':'мин',
      'ГГ-3(кВТ)':'МВтч','ГГ-3(мин)':'мин','ГГ-4(кВТ)':'МВтч','ГГ-4(мин)':'мин','ГГ-5(кВТ)':'МВтч','ГГ-5(мин)':'мин',
      'ГГ-6(кВТ)':'МВтч','ГГ-6(мин)':'мин','ГГ-7(кВТ)':'МВтч','ГГ-7(мин)':'мин','ГГ-8(кВТ)':'МВтч','ГГ-8(мин)':'мин',
      'Сток(Млн. м3)':"Млн. м3",'Расход(м3/c)':"м3/c",'Выработка(МВт)':"МВт",})
   exportArrMainTable.push({
      '№ часа':'','Интервал':'','Напор(м)':sredniyNapor,
      'ГГ-1(кВТ)':arrSumPowersGenForSutki[0],'ГГ-1(мин)':summTimes[0],'ГГ-2(кВТ)':arrSumPowersGenForSutki[1],'ГГ-2(мин)':summTimes[1],
      'ГГ-3(кВТ)':arrSumPowersGenForSutki[2],'ГГ-3(мин)':summTimes[2],'ГГ-4(кВТ)':arrSumPowersGenForSutki[3],'ГГ-4(мин)':summTimes[3],
      'ГГ-5(кВТ)':arrSumPowersGenForSutki[4],'ГГ-5(мин)':summTimes[4],'ГГ-6(кВТ)':arrSumPowersGenForSutki[5],'ГГ-6(мин)':summTimes[5],
      'ГГ-7(кВТ)':arrSumPowersGenForSutki[6],'ГГ-7(мин)':summTimes[6],'ГГ-8(кВТ)':arrSumPowersGenForSutki[7],'ГГ-8(мин)':summTimes[7],
      'Сток(Млн. м3)':totalStok,'Расход(м3/c)':totalRashod,'Выработка(МВт)':totalPower,})
   exportArrMainTable.push({
      '№ часа':'','Интервал':'','Напор(м)':'',
      'ГГ-1(кВТ)':'','ГГ-1(мин)':'','ГГ-2(кВТ)':'','ГГ-2(мин)':'','ГГ-3(кВТ)':'','ГГ-3(мин)':'','ГГ-4(кВТ)':'','ГГ-4(мин)':'',
      'ГГ-5(кВТ)':'','ГГ-5(мин)':'','ГГ-6(кВТ)':'','ГГ-6(мин)':'','ГГ-7(кВТ)':'','ГГ-7(мин)':'','ГГ-8(кВТ)':'','ГГ-8(мин)':'',
      'Сток(Млн. м3)':'Удельн. расход','Расход(м3/c)':udelnRashod,'Выработка(МВт)':'',})
//////////////////
   const normDate = {
      date: normalizeDate(date),
   };
   itogApi.getDataItog(normDate)//Данных для итоговой таблицы может ещё не быть, делаем запрос в БД за ними
      .then((data)=>{
         const dataPower = normalizeItogData(data);
//////////////////Заполнение массива данных для Exel итоговой таблицы
         let summTimesAll=0;
         for(let i=0;i<=7;i++){
               summTimesAll+=Number((summTimes[i]).replace(',','.'));
         };
         let prot =  String((0.0167 * (192 - summTimesAll)).toFixed(2)).replace('.',',');
         let obStok = String(Number(String(StokHH).replace(',','.'))+Number(totalStok.replace(',','.'))).replace('.',',')

         ArrItogTable.push({'№ фидера':'1','Точка учёта':'Генератор 1','Отдача(МВт)':dataPower.ActivePower.gen1,'Приём(МВт)':dataPower.ReactivePower.gen1,
         'Время работы(мин)':summTimes[0], 'Сток': sumGenStok[0],'Т-хх':TimeHH.gen1})
         ArrItogTable.push({'№ фидера':'2','Точка учёта':'Генератор 2','Отдача(МВт)':dataPower.ActivePower.gen2,'Приём(МВт)':dataPower.ReactivePower.gen2,
         'Время работы(мин)':summTimes[1], 'Сток': sumGenStok[1],'Т-хх':TimeHH.gen2})
         ArrItogTable.push({'№ фидера':'3','Точка учёта':'Генератор 3','Отдача(МВт)':dataPower.ActivePower.gen3,'Приём(МВт)':dataPower.ReactivePower.gen3,
         'Время работы(мин)':summTimes[2], 'Сток': sumGenStok[2],'Т-хх':TimeHH.gen3})
         ArrItogTable.push({'№ фидера':'4','Точка учёта':'Генератор 4','Отдача(МВт)':dataPower.ActivePower.gen4,'Приём(МВт)':dataPower.ReactivePower.gen4,
         'Время работы(мин)':summTimes[3], 'Сток': sumGenStok[3],'Т-хх':TimeHH.gen4})
         ArrItogTable.push({'№ фидера':'5','Точка учёта':'Генератор 5','Отдача(МВт)':dataPower.ActivePower.gen5,'Приём(МВт)':dataPower.ReactivePower.gen5,
         'Время работы(мин)':summTimes[4], 'Сток': sumGenStok[4],'Т-хх':TimeHH.gen5})
         ArrItogTable.push({'№ фидера':'6','Точка учёта':'Генератор 6','Отдача(МВт)':dataPower.ActivePower.gen6,'Приём(МВт)':dataPower.ReactivePower.gen6,
         'Время работы(мин)':summTimes[5], 'Сток': sumGenStok[5],'Т-хх':TimeHH.gen6})
         ArrItogTable.push({'№ фидера':'7','Точка учёта':'Генератор 7','Отдача(МВт)':dataPower.ActivePower.gen7,'Приём(МВт)':dataPower.ReactivePower.gen7,
         'Время работы(мин)':summTimes[6], 'Сток': sumGenStok[6],'Т-хх':TimeHH.gen7})
         ArrItogTable.push({'№ фидера':'8','Точка учёта':'Генератор 8','Отдача(МВт)':dataPower.ActivePower.gen8,'Приём(МВт)':dataPower.ReactivePower.gen8,
         'Время работы(мин)':summTimes[7], 'Сток': sumGenStok[7],'Т-хх':TimeHH.gen8})
         ArrItogTable.push({'№ фидера':'201','Точка учёта':'Вязники','Отдача(МВт)':dataPower.ActivePower.viazn,'Приём(МВт)':dataPower.ReactivePower.viazn,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'202','Точка учёта':'Семёнов','Отдача(МВт)':dataPower.ActivePower.semenov,'Приём(МВт)':dataPower.ReactivePower.semenov,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'301','Точка учёта':'Малаховская 1','Отдача(МВт)':dataPower.ActivePower.malah_1,'Приём(МВт)':dataPower.ReactivePower.malah_1,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'302','Точка учёта':'Левобережная 1','Отдача(МВт)':dataPower.ActivePower.levob_1,'Приём(МВт)':dataPower.ReactivePower.levob_1,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'303','Точка учёта':'Сормовская','Отдача(МВт)':dataPower.ActivePower.sormov,'Приём(МВт)':dataPower.ReactivePower.sormov,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'304','Точка учёта':'ЦБК','Отдача(МВт)':dataPower.ActivePower.cbk,'Приём(МВт)':dataPower.ReactivePower.cbk,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'305','Точка учёта':'ЗМЗ','Отдача(МВт)':dataPower.ActivePower.zmz,'Приём(МВт)':dataPower.ReactivePower.zmz,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'306','Точка учёта':'Малаховская 2','Отдача(МВт)':dataPower.ActivePower.malah_2,'Приём(МВт)':dataPower.ReactivePower.malah_2,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'307','Точка учёта':'Пучеж 1','Отдача(МВт)':dataPower.ActivePower.puchezh_1,'Приём(МВт)':dataPower.ReactivePower.puchezh_1,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'308','Точка учёта':'Западная','Отдача(МВт)':dataPower.ActivePower.zapad,'Приём(МВт)':dataPower.ReactivePower.zapad,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'309','Точка учёта':'Дзержинская','Отдача(МВт)':dataPower.ActivePower.dzer,'Приём(МВт)':dataPower.ReactivePower.dzer,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'310','Точка учёта':'Луч','Отдача(МВт)':dataPower.ActivePower.luch,'Приём(МВт)':dataPower.ReactivePower.luch,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'311','Точка учёта':'Выкл. ОСШ','Отдача(МВт)':dataPower.ActivePower.vikl_OSSH,'Приём(МВт)':dataPower.ReactivePower.vikl_OSSH,
         'Время работы(мин)':'', 'Сток':'','Т-хх':''})
         ArrItogTable.push({'№ фидера':'312','Точка учёта':'Пучеж 2','Отдача(МВт)':'0','Приём(МВт)':'0',
         'Время работы(мин)':'Сток выработки', 'Сток':'(Млн.м3)','Т-хх':totalStok})
         ArrItogTable.push({'№ фидера':'313','Точка учёта':'Левобережная 2','Отдача(МВт)':dataPower.ActivePower.levob_2,'Приём(МВт)':dataPower.ReactivePower.levob_2,
         'Время работы(мин)':'Сток ХХ', 'Сток':'(Млн.м3)','Т-хх':StokHH})
         ArrItogTable.push({'№ фидера':'407','Точка учёта':'32Т','Отдача(МВт)':dataPower.ActivePower.T32,'Приём(МВт)':dataPower.ReactivePower.T32,
         'Время работы(мин)':'Расход', 'Сток':'(м3/сек.)','Т-хх':totalRashod})
         ArrItogTable.push({'№ фидера':'408','Точка учёта':'31Т','Отдача(МВт)':dataPower.ActivePower.T31,'Приём(МВт)':dataPower.ReactivePower.T31,
         'Время работы(мин)':'Общий сток', 'Сток':'(Млн.м3)','Т-хх':obStok})
         ArrItogTable.push({'№ фидера':'','Точка учёта':'Верхний бьеф(м)','Отдача(МВт)':'Нижний бьеф(м)','Приём(МВт)':'Напор(м)',
         'Время работы(мин)':'Расход Х.Х.', 'Сток':'(м3/сек.)','Т-хх':RashodHH})
         ArrItogTable.push({'№ фидера':'MIN','Точка учёта':'','Отдача(МВт)':'','Приём(МВт)':'',
         'Время работы(мин)':'Уд. расход', 'Сток':'(м3/кВт)','Т-хх':udelnRashod})
         ArrItogTable.push({'№ фидера':'MAX','Точка учёта':'','Отдача(МВт)':'','Приём(МВт)':'',
         'Время работы(мин)':'Протечки', 'Сток':'(м3/сек)','Т-хх':prot})
         ArrItogTable.push({'№ фидера':'Среднее','Точка учёта':'','Отдача(МВт)':'','Приём(МВт)':sredniyNapor,
         'Время работы(мин)':'Выработка', 'Сток':'(МВтч)','Т-хх':totalPower})
//////////////////////
///////////Создание новой книги exel и запись в неё трёх страниц
         var wb = utils.book_new();
         var wsMainTable = utils.json_to_sheet(exportArrMainTable);
         var wsRashod = utils.json_to_sheet(exportArrRashod);
         var wsItogTable = utils.json_to_sheet(ArrItogTable);

         wsMainTable['!cols'] = wscolsMainTable;
         wsRashod['!cols'] = wscolsRashod;
         wsItogTable['!cols'] = wscolsItogTable;
         

         utils.book_append_sheet(wb,wsMainTable, 'Главная таблица');
         utils.book_append_sheet(wb,wsRashod, 'Таблица расходов');      
         utils.book_append_sheet(wb,wsItogTable, 'Итоговая таблица');
         writeFile(wb,`Таблица за ${normalizeDate(date)}.xlsx`)
/////////////////////////
   }); 
}

function saveDataItog(){//отрабатывает при нажатии на кнопку "Да" в модалке подтверждения записи
   const dataForSave = {
       date: normalizeDate(date),
       arrTimes,
       napors,
       totalRashod,
       totalStok,
       totalPower,
   };
  itogApi.saveDataItog(dataForSave)
  .then((data)=>{
       console.log(data);
  })
  closeModal()
};

   return (   
    <div className={cl.divMainSutkiPage}>
       <Outlet/>
       <div className={cl.divWithButtonsSutkiPage}>
         <Button 
            style={{backgroundColor:buttonsSutki.mainButton}}
            value = {`Главная таблица`} 
            onClick = {()=>{
               navigate('/sutki/maintable');
               dispatch({type:"CHANGE_BUTTONS_SUTKI",payload:{mainButton:'lightgreen',stokButton:'',rashodButton:'',itogButton:''}});
               dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'lightgreen',pbrAiisButton:'',pbrButton:'',maketButton:''}});
            }
            }
         ></Button> 
         <Button 
            style={{backgroundColor:buttonsSutki.rashodButton}}
            value = {`Расход генераторов`} 
            onClick = {()=>{
               navigate('/sutki/rashod');
               dispatch({type:"CHANGE_BUTTONS_SUTKI",payload:{mainButton:'',stokButton:'',rashodButton:'lightgreen',itogButton:''}});
               dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'lightgreen',pbrAiisButton:'',pbrButton:'',maketButton:''}});
            }
            }
         ></Button> 
         <Button 
            style={{backgroundColor:buttonsSutki.stokButton}}
            value = {`Сток генераторов`} 
            onClick = {()=>{
               navigate('/sutki/stok');
               dispatch({type:"CHANGE_BUTTONS_SUTKI",payload:{mainButton:'',stokButton:'lightgreen',rashodButton:'',itogButton:''}});
               dispatch({type:"CHANGE_BUTTONS_LAYOUT",payload:{sutkiButton:'lightgreen',pbrAiisButton:'',pbrButton:'',maketButton:''}});
            }
            }
         ></Button> 
         {calculationDoneFlag&&
         <>
             <Button 
               style={{backgroundColor:buttonsSutki.itogButton}}
               value = {`Итоговая таблица`} 
               onClick = {()=>{
                  navigate('/sutki/itog');
                  dispatch({type:"CHANGE_BUTTONS_SUTKI",payload:{mainButton:'',stokButton:'',rashodButton:'',itogButton:'lightgreen'}});
               }
            }
            ></Button>  
            <hr style={{width:"100%"}}></hr>
            <Button 
               value = {'Сохранить данные'}
               onClick ={()=>{
                 OpenModalForSave();
               }}
            ></Button>

            <Button 
               value = {'Экспорт таблиц в Exel'}
               onClick ={()=>{
                  ExportTable();
               }}
            ></Button>
         </>  
         }
      </div>
      <Modal visible={modal} setVisible={closeModal}>
            <div className={cl.divSaveInfoModalInSutkiPage}>
               <div>
                     Данные времени работы генераторов, напоры за сутки и среднесуточный расход, сток и выработка будут записаны в БД. Вы уверены?
               </div>
               <div className={cl.divForButtonsModalInSutkiPage}>
                     <button
                        className={cl.buttonModalInSutkiPage}
                        onClick={()=>{
                           saveDataItog();
                        }}>
                        {'Да'}      
                     </button>
                     <button
                        className={cl.buttonModalInSutkiPage}
                        onClick={()=>{
                           closeModal();
                        }}>
                        {'Нет'}      
                     </button>
               </div>
            </div>
         </Modal>
    </div>
   )
}

export default Sutki;

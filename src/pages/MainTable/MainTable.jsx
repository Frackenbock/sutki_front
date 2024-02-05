import React,{useState,useRef} from "react";
import Modal from "../../components/Modal/Modal";
import cl from "./MainTable.module.css";
import Button from "../../components/UI/Button_layout/Button";
import normalizeDate from "../../utils/normalizeDate";
import fetchSutki from "../../API/fetchSutki";
import MainTableLeft from "../../components/MainTableLeft/MainTableLeft";
import MainTableCenter from "../../components/MainTableCenter/MainTableCenter";
import MainTableRight from "../../components/MainTableRight/MainTableRight";
import calculationSutki from "../../utils/calculationSutki";
import normalizeAndCalcRashodStok from "../../utils/normalizeAndCalcRashodStok";//в ф-ии производятся нормализация массивов данных стока и расхода, расчёты их суммарных значений 
import autoCompleteTimes from "../../utils/autoCompleteTimes";//в ф-ии расчёт значений для заполнения таблицы стандартными значениями времени
import calculationRashodStok from "../../utils/calculationRashodStok";// в ф-ии производятся запросы в БД для вычисления расхода на основе расчёта интерполяции 
import { useSelector,useDispatch } from "react-redux";
import initialDataForSutki from "../../data/dataForSutkiTable";
import initialDataForRashod from "../../data/dataForRashod";
import initialDataForStok from "../../data/dataForStok";

import ReactDOM from 'react-dom/client';
import App from '../../App';
import { Provider } from 'react-redux';
import store from '../../store/store';

function  MainTable() {
   const initialDataSutki = new initialDataForSutki();
   const initialDataRashod = new initialDataForRashod();
   const initialDataStok = new initialDataForStok();
   const sutkiApi = new fetchSutki();
   const [loading,setLoading]=useState(false)
   const dispatch = useDispatch();
   const allNapors = useRef(null)

   const date = useSelector((state)=>{return  state.sutki.date;});
   const sutkiTitle = useSelector((state)=>{return  state.sutki.titleForSutkiTable;});

   const napors = useSelector((state)=>{return state.sutki.napors;});
   const sredniyNapor = useSelector((state)=>{return state.sutki.sredniyNapor});

   const times = useSelector((state)=>{return state.sutki.times});
   const summTimes = useSelector((state)=>{return state.sutki.summTimes});
   
   const totalPower = useSelector((state)=>{return state.sutki.totalPower});
   const arrSumPowerForHour = useSelector((state)=>{return state.sutki.arrSumPowerForHour});
   const powersGenerators = useSelector((state)=>{return state.sutki.powersGenerators});
   const arrSumPowersGenForSutki = useSelector((state)=>{return state.sutki.arrSumPowersGenForSutki});

   const rashodData = useSelector((state)=>{return state.rashod.rashodData});
   const totalRashod = useSelector((state)=>{return state.rashod.totalRashod});
   const udelnRashod = useSelector((state)=>{return state.rashod.udelnRashod});

   const stokData = useSelector((state)=>{return state.stok.stokData});
   const totalStok = useSelector((state)=>{return state.stok.totalStok});

   const [modal,setModal] = useState(false);
   const [textForModal,setTextForModal] = useState("")

   function getDataGen(){
      const normDate = {
         date: normalizeDate(date),
      };
      sutkiApi.getDataGen(normDate)
      .then((data)=>{
         dispatch({type:"CHANGE_POWERS_GENERATORS",payload:data});
         dispatch({type:"CHANGE_CLACULATION_FLAG",payload:false});

         for(let i=1; i<=24;i++){
            napors[i-1].input='';
         };
         dispatch({type:"CHANGE_NAPORS",payload:napors});
         dispatch({type:"CHANGE_TITLE_FOR_SUTKI_TABLE",payload:``} );         
         dispatch({type:"CHANGE_SREDNIY_NAPOR",payload:'-'});
         dispatch({type:"CHANGE_UDELNRASHOD",payload:'-'});
         dispatch({type:"CHANGE_ARR_SUM_POWERS_GEN_FOR_SUTKI",payload:['-','-','-','-','-','-','-','-']});
         dispatch({type:"CHANGE_SUMM_TIMES",payload:['-','-','-','-','-','-','-','-']});
         dispatch({type:"CHANGE_TOTAL_STOK",payload:'-'});
         dispatch({type:"CHANGE_TOTAL_RASHOD",payload:'-'});
         dispatch({type:"CHANGE_TOTAL_POWER",payload:'-'});
         dispatch({type:"CHANGE_TIMES",payload:initialDataSutki.arrTimeInputs});
         dispatch({type:"CHANGE_TOTAL_POWER_FOR_HOUR",payload:initialDataSutki.arrGenTotalHour});
         dispatch({type:"CHANGE_RASHOD_TITLE_TABLE",payload:``} );         
         dispatch({type:"CHANGE_STOK_TITLE_TABLE",payload:``} );     
         dispatch({type:"CHANGE_ARR_SUM_GEN_RASHOD",payload:['-','-','-','-','-','-','-','-']});
         dispatch({type:"CHANGE_ARR_SUM_GEN_STOK",payload:['-','-','-','-','-','-','-','-']});
         dispatch({type:"CHANGE_ARR_RASHOD",payload:initialDataRashod.arrGenRashod});
         dispatch({type:"CHANGE_ARR_STOK",payload:initialDataStok.arrGenStok});

         const root = ReactDOM.createRoot(document.getElementById('root'));
         root.render(
            <Provider store={store}>
               <App />
            </Provider>
         );
      });
   };

   function allCalculation(){
      let data,dataForRashodStok,rashhodData;
      data = calculationSutki(napors,times,powersGenerators);
      rashhodData= calculationRashodStok(napors,times,powersGenerators);  
      if (typeof(rashhodData)==='string'){//если пришла ошибка
         setModal(true)
         setTextForModal(rashhodData);
      }else{
         setLoading(true)
         //расчёт расхода в setTimeout по причине того, что в функции calculationRashodStok
         //fetch отрабатывает в цикле for, что создаёт задержки, нужно время чтоб отработали все запросы в БД
            setTimeout(()=>{
               setLoading(false);
               dataForRashodStok  =  normalizeAndCalcRashodStok(rashhodData,data.totalPower);//
               dispatch({type:"CHANGE_ARR_RASHOD",payload:dataForRashodStok.dataRashod});
               dispatch({type:"CHANGE_TOTAL_RASHOD",payload:dataForRashodStok.totalSrednRashod});
               dispatch({type:"CHANGE_ARR_STOK",payload:dataForRashodStok.dataStok});
               dispatch({type:"CHANGE_TOTAL_STOK",payload:dataForRashodStok.totalSumStok});
               dispatch({type:"CHANGE_ARR_SUM_GEN_RASHOD",payload:dataForRashodStok.arrSumGenRashod});
               dispatch({type:"CHANGE_ARR_SUM_GEN_STOK",payload:dataForRashodStok.arrSumGenStok});
               dispatch({type:"CHANGE_UDELNRASHOD",payload:dataForRashodStok.udelnRashod});
               dispatch({type:"CHANGE_TITLE_FOR_SUTKI_TABLE",payload:`Расчёт произведён за ${normalizeDate(date)}`} );         
               dispatch({type:"CHANGE_RASHOD_TITLE_TABLE",payload:`Расход воды через генераторы за ${normalizeDate(date)}`} );         
               dispatch({type:"CHANGE_STOK_TITLE_TABLE",payload:`Сток воды через генераторы за ${normalizeDate(date)}`} );         
            },3500);
            dispatch({type:"CHANGE_SREDNIY_NAPOR",payload:data.srednNapor});
            dispatch({type:"CHANGE_ARR_SUM_POWERS_GEN_FOR_SUTKI",payload:data.arrSumPower});
            dispatch({type:"CHANGE_SUMM_TIMES",payload:data.arrTimePower});
            dispatch({type:"CHANGE_TOTAL_POWER",payload:data.totalPower});
            dispatch({type:"CHANGE_TOTAL_POWER_FOR_HOUR",payload:data.summHourAllGen});
            dispatch({type:"CHANGE_CLACULATION_FLAG",payload:true});
            dispatch({type:"CHANGE_TITLE_ITOG_TABLE",payload:`Итоговая таблица за ${normalizeDate(date)}`});
      }

   };

   function closeModal(){// Закрытие любой модалки
      setModal(false);
   };

   function getTime(){
      const normDate = {
         date: normalizeDate(date),
      };
      sutkiApi.getDataTime(normDate)
      .then((data)=>{
         if(data.dataTimes.length!==0){
            let autoCompleteTimesArr = autoCompleteTimes(powersGenerators,data.dataTimes);
            dispatch({type:"CHANGE_TIMES",payload:autoCompleteTimesArr});
         }else{
            let autoCompleteTimesArr = autoCompleteTimes(powersGenerators,data.dataTimes);
            dispatch({type:"CHANGE_TIMES",payload:autoCompleteTimesArr});
         };

         if(data.dataNapors.length!==0){
            let arrData = data.dataNapors;
            for(let i=1; i<=24;i++){
                  if(arrData[0][`napor${i}h`]){
                     napors[i-1].input=arrData[0][`napor${i}h`];
                  }
                  else{
                     napors[i-1].input='';
                  };
            };
            dispatch({type:"CHANGE_NAPORS",payload:napors});

            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(
               <Provider store={store}>
                  <App />
               </Provider>
            );
         };
      });
   };

   function getNapors(){
      let arrData = allNapors.current.value.split(' ');
      for(let i=0; i<=23;i++){
         if(arrData[i]){
            napors[i].input=arrData[i];
         }else{
            napors[i].input='';
         };
      };
      dispatch({type:"CHANGE_CLACULATION_FLAG",payload:false});
      dispatch({type:"CHANGE_NAPORS",payload:napors});
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
         <Provider store={store}>
            <App />
         </Provider>
      );
   };

   return (
         <div className={cl.divMainForMainTable}>
            <div className={cl.divWithInstructionsAndWarning}>
               <div className={cl.divWithInstructionsAndTitleForIt}>
                  <b>Для расчёта расхода и стока: </b><br/>
                  <div className={cl.divWithInstructions}>
                     <div>
                        <b>1</b> - Выбирете дату<br/>
                        <b>2</b> - Нажмите кнопку 'Выгрузить выработку за {normalizeDate(date)}'<br/>
                     </div>
                     <div style={{"marginLeft":"5px","marginRight":"5px"}}>
                        <b>3</b> - Нажмите кнпку 'Выгрузить время за {normalizeDate(date)}'   <br/>
                        <b>4</b> - При необходимости, измените значения времени;<br/>
                     </div>
                     <div style={{"marginLeft":"5px","marginRight":"5px"}}>
                        <b>5</b> - Введите напоры (после ввода каждого напора ОБЯЗАТЕЛЬНО нажимайте Enter), <br/>
                        либо воспользуйтесь полем для ввода напоров под таблицей(напоры вводятся через пробел)<br/>
                     </div>
                     <div>
                        <b>6</b> - Нажмите кнопку 'Рассчитать за {normalizeDate(date)}'
                     </div>
                  </div> 
               </div>
               <span ><b>Важно!</b> Данные выработки за предыдущий час появляются в программе не ранее чем через
                9 минут после начала нового часа (например данные за 00:00 появятся не раньше чем в 00:09)<br/>
               </span>  
            </div>
            <div className={cl.divWithButtonsAndTextWithDate}>
               <div className={cl.divWithButtons} >
                  <Button 
                     value = {`Выгрузить выработку за ${normalizeDate(date)}`}
                     onClick = {()=>{getDataGen()}}            
                  ></Button>
                  <Button 
                     value = {`Выгрузить время за ${normalizeDate(date)}`}
                     onClick = {()=>getTime()}            
                  ></Button>
                  <Button 
                     value = {`Рассчитать за ${normalizeDate(date)}`}
                     onClick = {allCalculation}>
                  </Button>
               </div>
                <span className={cl.divTextWithDate}>{sutkiTitle}</span>
            </div>
            <div className={cl.divSutkiTable}>
               <MainTableLeft napor = {sredniyNapor} arr = {napors}></MainTableLeft>

               <MainTableCenter 
                  timesArr = {times}
                  data = {powersGenerators} 
                  time={summTimes} 
                  power={arrSumPowersGenForSutki}
               ></MainTableCenter>

               <MainTableRight 
                  summPowers = {arrSumPowerForHour} 
                  totalPower={totalPower}
                  summRashods = {rashodData}
                  totalRashod = {totalRashod}
                  summStoks = {stokData}
                  totalStok = {totalStok}
                  udelnRashod = {udelnRashod}
               ></MainTableRight>
            </div>
            <div className={cl.divInputAllNapors}>
               <input 
                  type="text" 
                  ref={allNapors}
                  className={cl.inputAllNapors}
                  placeholder={'Поле для ввода всех 24-х напоров (значения должны отделяться друг от друга пробелом)'}
               />
               <Button 
                  value = {'Ввод *'}
                  onClick = {getNapors}>
               </Button>
               <span style={{marginLeft:"19vw"}}>* Если ранее напоры сохранялись в итоговой таблице за выбранную дату, <br/> они будут выгружены автоматически 
                       при нажатии на кнопку "Выгрузить время за .."</span>
            </div>
            <Modal visible={modal} setVisible={closeModal}>
               <div>
                  {`${textForModal}`}
               </div>
               <div style={{'textAlign':'center'}}> <button onClick={()=>{
                    closeModal()
                  }}>Ок
               </button></div>
            </Modal>
            {
               loading&&
               <Modal visible={loading} >
                  <div style={{"fontSize":"0.9vw"}}>
                     Я считаю, подождите...
                  </div>
               </Modal>
            }
      </div>
   )
}
export default MainTable;

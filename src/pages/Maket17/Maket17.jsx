import {useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import cl from "./Maket17.module.css";
import Maket from "../../API/fetchForMaket17";
import normalizeDate from "../../utils/normalizeDate";
import Modal from "../../components/Modal/Modal"

function  Maket17() {
   const date = useSelector((state)=>{return  state.sutki.date;});
   const [modal,setModal] = useState(false);
   const [numberModal,setNumberModal] = useState(0);
   const [textForModal,setTextForModal] = useState("")
   const [dataDate,setdataDate] = useState("")
   const apiMaket = new Maket();
   const navigate = useNavigate();
   const passw = useSelector((state)=>{return state.admin.passw});//сохранённый пароль (для сравнения с вводимым) 
   const [password,setPassword] = useState('');              // для вводимого пароля (для сравнения с соранённым)
   const [placeholder,setPlaceholder]=useState('Введите пароль'); //Надпись для поля ввода пароля

   const[windSpeed,setWindSpeed]=useState('');//Направление ветра на 8 часов утра текущих суток
   const[windDirection,setWinddirection]=useState('Штиль');//Скорость ветра на 8 часов утра текущих суток
   const[upPoolAvearageThisDay,setUpPoolAvearageThisDay] = useState('');//Отметка верхнего бьефа средняя по водохранилищу на 8 часов утра текущих суток
   const[upPoolThisDay,setUpPoolThisDay] = useState('');//Отметка верхнего бьефа на 8 часов утра текущих суток
   const[downPoolThisDay,setDownPoolThisDay] = useState('');//Отметка нижнего бьефа на 8 часов утра текущих суток
   const[downPoolAvearageLastDay,setDownPoolAvearageLastDay] = useState('');//Отметка нижнего бьефа (среднее за прошлые сутки)
   const[downPoolMax,setDownPoolMax] = useState('');//Отметка нижнего бьефа (максимальное)
   const[downPoolMin,setDownPoolMin] = useState('');//Отметка верхнего бьефа (минимальное)
   const[rushAverage,setRushAverage] = useState('');//Напор средний за сутки
   const[fullInflow,setFullInflow] = useState('');//Полный приток к створам ГЭС
   const[lateralInflow,setLateralInflow] = useState(''); //Боковой приток
   const[totalFlowInDownPool,setTotalFlowInDownPool] = useState('');//Расход суммарный в нижнем бьефе
   const[flowInTurbines,setTotalFlowInTurbines] = useState('');//Расход через турбины
   const[spillwayFlow,setSpillwayFlow] = useState('');// Расход через водосброс
   const[idlingFlow,setIdlingFlow] = useState('');// Расход на холостой ход
   const[filtrationFlow,setFiltrationFlow] = useState('');//Расход на фильтрацию
   const[lockingFlow,setLockingFlow] = useState('');//Расход на шлюзование
   const[maxLoad,setMaxLoad] = useState('');// Максимальная нагрузка ГЭС 
   const[minLoad,setMinLoad] = useState('');// Минимальная нагрузка ГЭС 
   const[operatingUnits,setOperatingUnits] = useState('');//Количество работающих агрегатов
   const[unitsUnderRepair,setUnitsUnderRepair] = useState('');//Количество агрегатов в ремонте
   const[totalPowerInRepair,setTotalPowerInRepair] = useState('');//Суммарная мощность в ремонте
   const[dailyOutput,setDailyOutput] = useState('');//Суточная выработка
   const[monthOutput,setMonthOutput] = useState('');//Выработка с начала месяца
   const[sobstSutPotr,setSobstSutPotr] = useState('');//Выработка с начала месяца
   const[sobstSutPotrNachMes,setSobstSutPotrNachMes] = useState('');//Выработка с начала месяца

   function toPostServer(){//отправка макета по почтовым адресам
      const normalDate = normalizeDate(date);
      let shifr
      switch (windDirection) {
         case 'Штиль':shifr='0';break;
         case 'Север':shifr='10';break;
         case 'Восток':shifr='20';break;
         case 'Юг':shifr='30';break;
         case 'Запад':shifr='40';break;
         case 'Северо-Восток':shifr='12';break;
         case 'Северо-Запад':shifr='14';break;
         case 'Юго-Восток':shifr='32';break;
         case 'Юго-Запад':shifr='34';break;
         case 'Северо-Северо-Восток':shifr='11';break;
         case 'Северо-Северо-Запад':shifr='13';break;
         case 'Юго-Юго-Восток':shifr='33';break;
         case 'Юго-Юго-Запад':shifr='31';break;
         case 'Восток-Северо-Восток':shifr='23';break;
         case 'Восток-Юго-Восток':shifr='21';break;
         case 'Запад-Северо-Запад':shifr='41';break;
         case 'Запад-Юго-Запад':shifr='43';break;
         default: shifr='999'; break;
      }
      const data={
         normalDate,
         windSpeed:windSpeed.replace(",","."),   
		 shifr:shifr.replace(",","."),  
		 upPoolAvearageThisDay:upPoolAvearageThisDay.replace(",","."),
		 upPoolThisDay:upPoolThisDay.replace(",","."),
		 downPoolThisDay:downPoolThisDay.replace(",","."), 
		 downPoolAvearageLastDay:downPoolAvearageLastDay.replace(",","."),
		 downPoolMax:downPoolMax.replace(",","."), 
		 downPoolMin:downPoolMin.replace(",","."),  
		 rushAverage:rushAverage.replace(",","."),
		 fullInflow:fullInflow.replace(",","."),
		 lateralInflow:lateralInflow.replace(",","."), 
		 totalFlowInDownPool:totalFlowInDownPool.replace(",","."),
		 flowInTurbines:flowInTurbines.replace(",","."), 
		 spillwayFlow:spillwayFlow.replace(",","."), 
		 idlingFlow:idlingFlow.replace(",","."), 
		 filtrationFlow:filtrationFlow.replace(",","."),
		 lockingFlow:lockingFlow.replace(",","."),   
		 maxLoad:maxLoad.replace(",","."), 
		 minLoad:minLoad.replace(",","."),
		 operatingUnits:operatingUnits.replace(",","."),
		 unitsUnderRepair:unitsUnderRepair.replace(",","."),
		 totalPowerInRepair:totalPowerInRepair.replace(",","."),
		 dailyOutput:String(Math.round(Number(dailyOutput.replace(",",".")))/1000),
		 monthOutput:String(Math.round(Number(monthOutput.replace(",",".")))/1000),
		 sobstSutPotr: sobstSutPotr.replace(",","."),
		 sobstSutPotrNachMes: sobstSutPotrNachMes.replace(",",".")};

		 for(let key in data){
			 if (data[key]===''){
				 data[key]='0';
			 };
		 };
		 
         apiMaket.sendMaketDataPost(data)
         .then((data)=>{

			setModal(true);
			setTextForModal(data);
			setNumberModal(2)
            setTimeout(()=>{
				setModal(false);
				setTextForModal('');
				setNumberModal(0)
			},3000)
         });

   };
   function saveDataMaketToBD(){// запись данных макета в БД

      let shifr
      switch (windDirection) {
         case 'Штиль':shifr='0';break;
         case 'Север':shifr='10';break;
         case 'Восток':shifr='20';break;
         case 'Юг':shifr='30';break;
         case 'Запад':shifr='40';break;
         case 'Северо-Восток':shifr='12';break;
         case 'Северо-Запад':shifr='14';break;
         case 'Юго-Восток':shifr='32';break;
         case 'Юго-Запад':shifr='34';break;
         case 'Северо-Северо-Восток':shifr='11';break;
         case 'Северо-Северо-Запад':shifr='13';break;
         case 'Юго-Юго-Восток':shifr='33';break;
         case 'Юго-Юго-Запад':shifr='31';break;
         case 'Восток-Северо-Восток':shifr='23';break;
         case 'Восток-Юго-Восток':shifr='21';break;
         case 'Запад-Северо-Запад':shifr='41';break;
         case 'Запад-Юго-Запад':shifr='43';break;
         default: shifr='999'; break;
      }

      const data={
       date,
       windSpeed:windSpeed.replace(",","."),   
		 shifr:shifr.replace(",","."),  
		 upPoolAvearageThisDay:upPoolAvearageThisDay.replace(",","."),
		 upPoolThisDay:upPoolThisDay.replace(",","."),
		 downPoolThisDay:downPoolThisDay.replace(",","."), 
		 downPoolAvearageLastDay:downPoolAvearageLastDay.replace(",","."),
		 downPoolMax:downPoolMax.replace(",","."), 
		 downPoolMin:downPoolMin.replace(",","."),  
		 rushAverage:rushAverage.replace(",","."),
		 fullInflow:fullInflow.replace(",","."),
		 lateralInflow:lateralInflow.replace(",","."), 
		 totalFlowInDownPool:totalFlowInDownPool.replace(",","."),
		 flowInTurbines:flowInTurbines.replace(",","."), 
		 spillwayFlow:spillwayFlow.replace(",","."), 
		 idlingFlow:idlingFlow.replace(",","."), 
		 filtrationFlow:filtrationFlow.replace(",","."),
		 lockingFlow:lockingFlow.replace(",","."),   
		 maxLoad:maxLoad.replace(",","."), 
		 minLoad:minLoad.replace(",","."),
		 operatingUnits:operatingUnits.replace(",","."),
		 unitsUnderRepair:unitsUnderRepair.replace(",","."),
		 totalPowerInRepair:totalPowerInRepair.replace(",","."),
		 dailyOutput:dailyOutput.replace(",","."),
		 monthOutput:monthOutput.replace(",","."),
		 sobstSutPotr:sobstSutPotr.replace(",","."),
		 sobstSutPotrNachMes:sobstSutPotrNachMes.replace(",",".")};
		 
		 for(let key in data){
			 if (data[key]===''){
				 data[key]='0';
			 };
		 };
		 
         apiMaket.sendMaketDataToBD(data)
         .then((data)=>{
            setModal(true);
			setTextForModal(data);
			setNumberModal(2)
            setTimeout(()=>{
				setModal(false);
				setTextForModal('');
				setNumberModal(0)
			},3000)
         })
   }
   function changeFocus(e){//при нажатии на enter фокус перемещается на на следующее поле ввода
      if(e.keyCode===13){
         let newId=String(Number(e.target.id)+1);
         if(newId==='126'){
            newId='101';
         };
         document.getElementById(newId).focus();

      };
   };
   function dataFromServer(){//чтение данных из БД
      const data = {date}
      apiMaket.getMaketDataFromBD(data)
      .then((data)=>{
         if(data.length===1){// с сервера прихродит массив из одного элемента
			switch(data[0].napravlenie_vetra_8_00){
				case "0":setWinddirection('Штиль');break;
				case "10":setWinddirection('Север');break;
				case "20":setWinddirection('Восток');break;
				case "30":setWinddirection('Юг');break;
				case "40":setWinddirection('Запад');break;
				case "12":setWinddirection('Северо-Восток');break;
				case "14":setWinddirection('Северо-Запад');break;
				case "32":setWinddirection('Юго-Восток');break;
				case "34":setWinddirection('Юго-Запад');break;
				case "11":setWinddirection('Северо-Северо-Восток');break;
				case "13":setWinddirection('Северо-Северо-Запад');break;
				case "33":setWinddirection('Юго-Юго-Восток');break;
				case "31":setWinddirection('Юго-Юго-Запад');break;
				case "23":setWinddirection('Восток-Северо-Восток');break;
				case "21":setWinddirection('Восток-Юго-Восток');break;
				case "41":setWinddirection('Запад-Северо-Запад');break;
				case "43":setWinddirection('Запад-Юго-Запад');break;
				default: setWinddirection('999'); break;
			 }
			 setWindSpeed(data[0].scorost_vetra_8_00);
			 setUpPoolAvearageThisDay(data[0].v_bief_sr);
			 setUpPoolThisDay(data[0].v_bief_8_00);
			 setDownPoolThisDay(data[0].n_bief_8_00);
			 setDownPoolAvearageLastDay(data[0].n_bief_sr_old);
			 setDownPoolMax(data[0].n_bief_max);
			 setDownPoolMin(data[0].n_bief_min);
			 setRushAverage(data[0].napor_sr_sutki);
			 setFullInflow(data[0].polni_pritok);
			 setLateralInflow(data[0].bokovoi_pritok);
			 setTotalFlowInDownPool(data[0].rashod_sum_n_bief);
			 setTotalFlowInTurbines(data[0].rashod_turbin);
			 setSpillwayFlow(data[0].rashod_vodosbros);
			 setIdlingFlow(data[0].rashod_holost_hod);
			 setFiltrationFlow(data[0].rashod_filtr);
			 setLockingFlow(data[0].rashod_shluz);
			 setMaxLoad(data[0].max_nagr_ges);
			 setMinLoad(data[0].min_nagr_ges);
			 setOperatingUnits(data[0].kolvo_rab_agr);
			 setUnitsUnderRepair(data[0].agr_rem);
			 setTotalPowerInRepair(data[0].sum_moshn_v_rem);
			 setDailyOutput(data[0].sum_virabotka);
			 setMonthOutput(data[0].virabotka_s_nach_mes);
			 setSobstSutPotr(data[0].sobstv_sut_potr);
			 setSobstSutPotrNachMes(data[0].sobstv_potr_nach_mes);
          setdataDate(`Дата, за которую выгружены данные: ${normalizeDate(date)}`)
		 }else if(data.length===0){
         setModal(true);
			setTextForModal('За выбранную дату отсутствуют данные');
			setNumberModal(2)
            setTimeout(()=>{
				setModal(false);
				setTextForModal('');
				setNumberModal(0)
			},3000)
       };
      })
   };
   function showModalSendPostAndSaveMaket(){//модалка с подтверждением отправки макета и сохранением данных
         setModal(true);
         setNumberModal(4);
   };
   function closeModal(){// Закрытие любой модалки
      setModal(false);
   };
   function showModalSendPostMaket(){ //модалка с подтверждением отправки макета по адресам
     setModal(true);
	  setNumberModal(1);
   };
   function showModalCommitSaveDataToBD(){//модалка с подтверждением сохранения данных в БД
      setModal(true);
	  setNumberModal(3);
   };
   function getDataTotalPowerTodayAndMonth(){ //получение данных для строк "Суточная выработка, тыс. кВт*час" и "Выработка с начала месяца , тыс. кВт*час"
      const data = {
         date:normalizeDate(date),
         dateWithoutNormalize:date
      };
      apiMaket.getDataPower(data)
         .then((data)=>{
// Расчёт и вывод выработки за сутки
            let summ=0;
            for(let i=0;i<data.dataToday.length;i++){
               summ+=data.dataToday[i][2];};
            summ=(summ/1000).toFixed(3);
            setDailyOutput(String(summ));
////////////////Расчёт и вывод максимальной и минимальной нагрузки ГЭС
            let min=100000
            let max=0
            for (let i=1; i<48;i++){
               let summH=0
               for(let j=0;j<data.dataToday.length;j++){
                  if(i===Number(data.dataToday[j][0])){
                     summH = summH + Number((data.dataToday[j][2])*2/1000)
                  }      
               }
               if (summH>max){max=Math.round(summH)}
               if (summH<min){min=Math.round(summH)}
            }
            setMaxLoad(String(max))
            setMinLoad(String(min))
//////////////////////Если в базе есть посчитанный среднесуточный расход, выводим его, иначе ничего не выводим
            if(data.dataRash.length>0){
               setTotalFlowInTurbines(data.dataRash[0].value_rashod)
            }else{setTotalFlowInTurbines('')}
//////////////////////Расчёт среднего напора за сутки и вывод, если часовые напоры не сохранялись, ничего не выводим
            if(data.dataNapors.length>0){
               var sredneeZnach=0;
               var counter=0
               for(let i=1;i<=24;i++){
                  if(Number(data.dataNapors[0][`napor${i}h`])!==0){
                     sredneeZnach+=Number(data.dataNapors[0][`napor${i}h`])
                     counter++
                  }
               }
               sredneeZnach=(sredneeZnach/counter).toFixed(2)
               setRushAverage(sredneeZnach)
            }else{setRushAverage('')}
            setDailyOutput(String(summ));
//////////////////////Расчёт суммарной выработки за месяц
            let dataMonth = (Number(data.dataMonth)+Number(summ)).toFixed(3);
            setMonthOutput(String(dataMonth));
/////////////////////Занесение данных расхода на холостом ходу и протечек
            setFiltrationFlow('1.3');
            setIdlingFlow('0')
         });
   };

   function checkPassword(e){
      if(e.keyCode===13){
        if(e.target.value===passw){
          navigate('/maketparams')
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

   function showModalPasswAdmin(){
      setNumberModal(5)
      setModal(true)
   }

   return (
    <div className={cl.divMaketContainer}>

      <div className={cl.divTableAndTitleContainer}>
         <span className={cl.spanMaketTitle}>{"Макет №17"}</span>
         <table className={cl.tableMaket}>
            <colgroup>
               <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"1"} style={{backgroundColor:"white"}}></col>
               <col span={"1"} style={{backgroundColor:"lightgreen"}} ></col>
            </colgroup>
            <thead>
               <tr><th className={cl.colOneHead}>{"Параметр"}</th><th className={cl.colTwoHead}>{"Номер"}</th><th className={cl.colThreeHead}>{"Значение"}</th></tr>
            </thead>
            <tbody className={cl.tbodyTableMaket}>
               <tr>
                  <td className={cl.colOneBody}>{"Направление ветра на 8 часов утра текущих суток:"}</td><td>{"3"}</td>
                  <td> 
                     <select className={cl.selectWindDirection} value={windDirection} onChange={(e)=>{setWinddirection(e.target.value)}}>
                        <option>{"Штиль"}</option><option>{"Север"}</option><option>Восток</option><option>Юг</option>
                        <option>{"Запад"}</option><option>{"Северо-Восток"}</option><option>Северо-Запад</option>
                        <option>Юго-Восток</option><option>Юго-Запад</option><option>Северо-Северо-Восток</option>
                        <option>Северо-Северо-Запад</option><option>Юго-Юго-Восток</option><option>Юго-Юго-Запад</option>
                        <option>Восток-Северо-Восток</option><option>Восток-Юго-Восток</option>
                        <option>Запад-Северо-Запад</option><option>Запад-Юго-Запад</option>
                     </select>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Скорость ветра на 8 часов утра текущих суток, м/с:</td><td>4</td>
                  <td>
                     <input 
                        type={"text"} value={windSpeed} className={cl.inputMaket} id={"101"} autoComplete={'off'}
                        onChange={(e)=>{setWindSpeed(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/> 
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Отметка верхнего бьефа средняя по водохранилищу <br/>на 8 часов утра текущих суток, м:</td><td>10</td>
                  <td>
                     <input 
                        type={"text"} value={upPoolAvearageThisDay} className={cl.inputMaket}  id={"102"} autoComplete={'off'}
                        onChange={(e)=>{setUpPoolAvearageThisDay(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Отметка верхнего бьефа на 8 часов утра текущих суток, м:</td><td>14</td>
                  <td>
                     <input 
                        type={"text"} value={upPoolThisDay} className={cl.inputMaket}  id={"103"} autoComplete={'off'}
                        onChange={(e)=>{setUpPoolThisDay(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Отметка нижнего бьефа на 8 часов утра текущих суток, м:</td><td>16</td>
                  <td>
                     <input 
                        type={"text"} value={downPoolThisDay} className={cl.inputMaket}  id={"104"} autoComplete={'off'}
                        onChange={(e)=>{setDownPoolThisDay(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Отметка нижнего бьефа (среднее за прошлые сутки), м:</td><td>18</td>
                  <td>
                     <input 
                        type={"text"} value={downPoolAvearageLastDay} className={cl.inputMaket}  id={"105"} autoComplete={'off'}
                        onChange={(e)=>{setDownPoolAvearageLastDay(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Отметка нижнего бьефа (максимальное), м:</td><td>19</td>
                  <td>
                     <input 
                        type={"text"} value={downPoolMax} className={cl.inputMaket}  id={"106"} autoComplete={'off'}
                        onChange={(e)=>{setDownPoolMax(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Отметка нижнего бьефа (минимальное), м:</td><td>20</td>
                  <td>
                     <input 
                        type={"text"} value={downPoolMin} className={cl.inputMaket}  id={"107"} autoComplete={'off'}
                        onChange={(e)=>{setDownPoolMin(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Напор средний за сутки, м</td><td>30</td>
                  <td>                    
                      <input 
                        type={"text"} value={rushAverage} className={cl.inputMaket} id={"108"}  autoComplete={'off'}
                        onChange={(e)=>{setRushAverage(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Полный приток к створам ГЭС, м</td><td>40</td>
                  <td>
                     <input 
                        type={"text"} value={fullInflow} className={cl.inputMaket}  id={"109"} autoComplete={'off'}
                        onChange={(e)=>{setFullInflow(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Боковой приток, м3/с</td><td>41</td>
                  <td>
                     <input 
                        type={"text"} value={lateralInflow} className={cl.inputMaket}  id={"110"} autoComplete={'off'}
                        onChange={(e)=>{setLateralInflow(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Расход суммарный в нижнем бьефе, м3/с</td><td>45</td>
                  <td>
                     <input 
                        type={"text"} value={totalFlowInDownPool} className={cl.inputMaket} id={"111"} autoComplete={'off'}
                        onChange={(e)=>{setTotalFlowInDownPool(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Расход через турбины, м3/с</td><td>46</td>
                  <td>
                     <input 
                        type={"text"} value={flowInTurbines} className={cl.inputMaket} id={"112"} autoComplete={'off'}
                        onChange={(e)=>{setTotalFlowInTurbines(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Расход через водосброс, м3/с</td><td>47</td>
                  <td>
                     <input 
                        type={"text"} value={spillwayFlow} className={cl.inputMaket} id={"113"} autoComplete={'off'}
                        onChange={(e)=>{setSpillwayFlow(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Расход на холостой ход, м3/с</td><td>48</td>
                  <td>
                     <input 
                        type={"text"} value={idlingFlow} className={cl.inputMaket} id={"114"} autoComplete={'off'}
                        onChange={(e)=>{setIdlingFlow(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Расход на фильтрацию, м3/с</td><td>49</td>
                  <td>
                     <input 
                        type={"text"} value={filtrationFlow} className={cl.inputMaket} id={"115"} autoComplete={'off'}
                        onChange={(e)=>{setFiltrationFlow(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Расход на шлюзование, м3/с</td><td>50</td>
                  <td>
                     <input 
                        type={"text"} value={lockingFlow} className={cl.inputMaket} id={"116"} autoComplete={'off'}
                        onChange={(e)=>{setLockingFlow(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Максимальная нагрузка ГЭС, МВт</td><td>60</td>
                  <td>
                     <input 
                        type={"text"} value={maxLoad} className={cl.inputMaket} id={"117"} autoComplete={'off'}
                        onChange={(e)=>{setMaxLoad(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Минимальная нагрузка ГЭС, МВт</td><td>61</td>
                  <td>
                     <input 
                        type={"text"} value={minLoad} className={cl.inputMaket} id={"118"} autoComplete={'off'}
                        onChange={(e)=>{setMinLoad(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Количество работающих агрегатов, шт</td><td>62</td>
                  <td>
                     <input 
                        type={"text"} value={operatingUnits} className={cl.inputMaket} id={"119"} autoComplete={'off'}
                        onChange={(e)=>{setOperatingUnits(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Количество агрегатов в ремонте, шт</td><td>63</td>
                  <td>
                     <input 
                        type={"text"} value={unitsUnderRepair} className={cl.inputMaket} id={"120"} autoComplete={'off'}
                        onChange={(e)=>{setUnitsUnderRepair(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Суммарная мощность в ремонте, МВт</td><td>64</td>
                  <td>
                     <input 
                        type={"text"} value={totalPowerInRepair} className={cl.inputMaket} id={"121"} autoComplete={'off'}
                        onChange={(e)=>{setTotalPowerInRepair(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Суточная выработка, тыс. кВт*час</td><td>65</td>
                  <td>
                     <input 
                        type={"text"} value={dailyOutput} className={cl.inputMaket} id={"122"} autoComplete={'off'}
                        onChange={(e)=>{setDailyOutput(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Выработка с начала месяца, тыс. кВт*час</td><td>66</td>
                  <td>
                     <input 
                        type={"text"} value={monthOutput} className={cl.inputMaket} id={"123"} autoComplete={'off'}
                        onChange={(e)=>{setMonthOutput(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Собственное суточное потреболение, тыс. кВт*час</td><td></td>
                  <td>
                     <input 
                        type={"text"} value={sobstSutPotr} className={cl.inputMaket} id={"124"} autoComplete={'off'}
                        onChange={(e)=>{setSobstSutPotr(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
               <tr>
                  <td className={cl.colOneBody}>Собственное потреболение с начала месяца, тыс. кВт*час</td><td></td>
                  <td>
                  <input 
                        type={"text"} value={sobstSutPotrNachMes} className={cl.inputMaket} id={"125"} autoComplete={'off'}
                        onChange={(e)=>{setSobstSutPotrNachMes(e.target.value)}} onKeyUp={(e)=>{changeFocus(e)}}/>
                  </td>
               </tr>
            </tbody>
            <tfoot></tfoot>
         </table>

         <span>{dataDate}</span>
      </div>
         
      <div className={cl.contMaketButtons}>
         <button
            className={cl.buttonMaket}
            onClick={()=>{
               dataFromServer()
            }}
         >  {`Прочитать данные макета за ${normalizeDate(date)}` }</button>

         <button
            className={cl.buttonMaket}
            onClick={()=>{
               showModalCommitSaveDataToBD()
            }}
         >{`Записать данные макета за ${normalizeDate(date)}` }</button>

         <button
            className={cl.buttonMaket}
            onClick={()=>{
               showModalSendPostMaket()
            }}
         >{`Отправить макет с данными за ${normalizeDate(date)}` }</button>

         <button
            className={cl.buttonMaket}
            onClick={()=>{
               showModalSendPostAndSaveMaket()
            }}
         >Сохранить данные за {normalizeDate(date)} <br/> и отправить  макет</button>

         <button
            className={cl.buttonMaket}
            onClick={()=>{
               getDataTotalPowerTodayAndMonth()
            }}
         >Рассчитать выработку за  {normalizeDate(date)}</button>

         <div className={cl.divButtonsDown}>
            <button 
            className={cl.buttonMaket}
               onClick={()=>{navigate('/maket17data')}}>
                  {"Выгрузка данных макета за период"}</button>
            <button
            className={cl.buttonMaket}
               onClick={()=>{
                  navigate('/listadress')
               }}
            >{"Список получателей макета"}</button>

            <button
            className={cl.buttonMaket}
               onClick={()=>{
                  showModalPasswAdmin()
               }}
            >{"Параметры отпрвки макета"}</button>
         </div>


      </div>  

      {numberModal===1 && 
		<Modal visible={modal} setVisible={closeModal}>
            <div>
               {`Вы действительно хотите отправить макет с данными за ${normalizeDate(date)}?`}
            </div>
            <div style={{'textAlign':'center'}}>
               <button onClick={()=>{
                     toPostServer();
                     closeModal();
                  }}>Да
               </button>
               <button onClick={()=>{
                    closeModal()
                  }}>Нет
               </button>
            </div>
        </Modal>}
		
		{numberModal===2 && 
		  <Modal visible={modal} setVisible={closeModal}>
			   <div>
               {`${textForModal}`}
            </div>
        </Modal>}

		{numberModal===3 && 
		  <Modal visible={modal} setVisible={closeModal}>
            <div>
            {`Вы действительно хотите сохранить данные для макета за ${normalizeDate(date)}?`}
            </div>
            <div style={{'textAlign':'center'}}>
               <button onClick={(e)=>{
                     saveDataMaketToBD();
                     closeModal();
                  }}>Да
               </button>
               <button onClick={()=>{
                     closeModal()
                  }}>Нет
               </button>
            </div>
        </Modal>}

		{numberModal===4 && 
		  <Modal visible={modal} setVisible={closeModal}>
			<div>
         {`Вы действительно хотите сохранить данные за ${normalizeDate(date)} и отправить макет?`}
            </div>
            <div style={{'textAlign':'center'}}>
               <button onClick={()=>{
                     saveDataMaketToBD();
                     toPostServer()
                     closeModal();
                  }}>Да
               </button>
               <button onClick={()=>{
                     closeModal()
                  }}>Нет
               </button>
            </div>
        </Modal>}
		{numberModal===5 && 
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
      </Modal>}
    </div>
   )
}
export default Maket17;

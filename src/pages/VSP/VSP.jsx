import React, {useState} from "react";
import cl from "./VSP.module.css";
import apiVSP from "../../API/fetchVSP"
import { useSelector,useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";

function  VSP() {
   const vspTimesState = useSelector((state)=>{return state.vspPage.vspTimesState});
   const vspSrUBV = useSelector((state)=>{return state.vspPage.vspSrUBV});
   ///////// объявление переменных для ввода времени работы пролётов 
   const [oneMn1,setOneMn1]=useState(vspTimesState.oneMn1);
   const [twoMn1,setTwoMn1]=useState(vspTimesState.twoMn1);
   const [threeMn1,setThreeMn1]=useState(vspTimesState.threeMn1);
   const [fullN1,setFullnN1]=useState(vspTimesState.fullN1);
   const [oneMn2,setOneMn2]=useState(vspTimesState.oneMn2);
   const [twoMn2,setTwoMn2]=useState(vspTimesState.twoMn2);
   const [threeMn2,setThreeMn2]=useState(vspTimesState.threeMn2);
   const [fullN2,setFullnN2]=useState(vspTimesState.fullN2);
   const [oneMn3,setOneMn3]=useState(vspTimesState.oneMn3);
   const [twoMn3,setTwoMn3]=useState(vspTimesState.twoMn3);
   const [threeMn3,setThreeMn3]=useState(vspTimesState.threeMn3);
   const [fullN3,setFullnN3]=useState(vspTimesState.fullN3);
   const [oneMn4,setOneMn4]=useState(vspTimesState.oneMn4);
   const [twoMn4,setTwoMn4]=useState(vspTimesState.twoMn4);
   const [threeMn4,setThreeMn4]=useState(vspTimesState.threeMn4);
   const [fullN4,setFullnN4]=useState(vspTimesState.fullN4);
   const [oneMn5,setOneMn5]=useState(vspTimesState.oneMn5);
   const [twoMn5,setTwoMn5]=useState(vspTimesState.twoMn5);
   const [threeMn5,setThreeMn5]=useState(vspTimesState.threeMn5);
   const [fullN5,setFullnN5]=useState(vspTimesState.fullN5);
   const [oneMn6,setOneMn6]=useState(vspTimesState.oneMn6);
   const [twoMn6,setTwoMn6]=useState(vspTimesState.twoMn6);
   const [threeMn6,setThreeMn6]=useState(vspTimesState.threeMn6);
   const [fullN6,setFullnN6]=useState(vspTimesState.fullN6);
   const [oneMn7,setOneMn7]=useState(vspTimesState.oneMn7);
   const [twoMn7,setTwoMn7]=useState(vspTimesState.twoMn7);
   const [threeMn7,setThreeMn7]=useState(vspTimesState.threeMn7);
   const [fullN7,setFullnN7]=useState(vspTimesState.fullN7);
   const [oneMn8,setOneMn8]=useState(vspTimesState.oneMn8);
   const [twoMn8,setTwoMn8]=useState(vspTimesState.twoMn8);
   const [threeMn8,setThreeMn8]=useState(vspTimesState.threeMn8);
   const [fullN8,setFullnN8]=useState(vspTimesState.fullN8);
   const [oneMn9,setOneMn9]=useState(vspTimesState.oneMn9);
   const [twoMn9,setTwoMn9]=useState(vspTimesState.twoMn9);
   const [threeMn9,setThreeMn9]=useState(vspTimesState.threeMn9);
   const [fullN9,setFullnN9]=useState(vspTimesState.fullN9);
   const [oneMn10,setOneMn10]=useState(vspTimesState.oneMn10);
   const [twoMn10,setTwoMn10]=useState(vspTimesState.twoMn10);
   const [threeMn10,setThreeMn10]=useState(vspTimesState.threeMn10);
   const [fullMn10,setFulln10]=useState(vspTimesState.fullMn10);
   const [pnsN11,setPnsN11]=useState(vspTimesState.pnsN11); 
   const [fullMn11,setFulln11]=useState(vspTimesState.fullMn11);
   const [pnsN12,setPnsN12]=useState(vspTimesState.pnsN12);
   const [fullMn12,setFulln12]=useState(vspTimesState.fullMn12);

   const [bief,setBief]=useState(vspSrUBV);//стэйт для введённого бьефа
   const [modal,setModal] = useState(false);
   const [textModal,setTextModal] = useState('');
   const vspFetch = new apiVSP();
   const dispatch = useDispatch();
   const vspTotalStok = useSelector((state)=>{return state.vspPage.vspTotalStok});
   const vspSrRashod = useSelector((state)=>{return state.vspPage.vspSrRashod});
   const stoksArr = useSelector((state)=>{return state.vspPage.vspStoksState});
   
   function errorMessageInputTime(prolet){
      setModal(true)
      setTextModal(`Время открытого положения пролёта №${prolet} имеет неверный формат, повторите ввод.`)
      return
   }

   function closeModal(){
      setModal(false);
   }

   function calculateVspRashod(){
      const dataTime={oneMn1,twoMn1,threeMn1,fullN1,oneMn2,twoMn2,threeMn2,fullN2,
                  oneMn3,twoMn3,threeMn3,fullN3,oneMn4,twoMn4,threeMn4,fullN4,
                  oneMn5,twoMn5,threeMn5,fullN5,oneMn6,twoMn6,threeMn6,fullN6,
                  oneMn7,twoMn7,threeMn7,fullN7,oneMn8,twoMn8,threeMn8,fullN8,
                  oneMn9,twoMn9,threeMn9,fullN9,oneMn10,twoMn10,threeMn10,fullMn10,
                  pnsN11,fullMn11,pnsN12,fullMn12};  

      const ubv = Number(bief.replace(",","."))
      const promejut= Math.trunc(Number(bief.replace(",","."))*10)/10
      let ubv_1 = promejut.toFixed(1);
      let ubv_2 = (promejut+0.1).toFixed(1);

       const data ={
         ubv_1: String(ubv_1).replace(".",","),
         ubv_2: String(ubv_2).replace(".",","),
      };
      let result ={};

      for (let key in dataTime){
         if(dataTime[key].length===0){
            continue
         }else {
            if(dataTime[key].length!==5){
               errorMessageInputTime(key.replace(/[^0-9]/g, ''))
            }else{
               if(dataTime[key].slice(2,3)!==":"){
                  errorMessageInputTime(key.replace(/[^0-9]/g, ''))
               }else{
                  let hours = Number(dataTime[key].slice(0,2))
                  let minutes = Number(dataTime[key].slice(3,5))
                  if(isNaN(hours)||isNaN(minutes)){
                     errorMessageInputTime(key.replace(/[^0-9]/g, ''))
                  }else{
                     if(hours===24&&minutes!==0){
                        errorMessageInputTime(key.replace(/[^0-9]/g, ''))
                     }
                     if(hours<0||hours>24||minutes<0||minutes>=60){
                        errorMessageInputTime(key.replace(/[^0-9]/g, ''))
                     }
                  }
                  
               }
            }
         }
      }
      if(ubv>=82&&ubv<85.5){
         vspFetch.getDataForVspRashodSutki(data)
         .then((data)=>{
            for(let key in dataTime){//пробег по всем input для введения времени работы пролётов
               let prolet = key.replace(/[^0-9]/g, ''); // из названия ключа вычленяем цифру - номер пролёта
               let stok=0
               if(dataTime[key]!==''){  //если время работы не вводилось, тогда stok для этого пролёта при данном открытии - 0
                  let begin = key.slice(0,2)// по первым двум буквам ключа определяем тип открытия пролёта
                  if(Number(prolet)>=1&&Number(prolet)<=10){//для пролётов с 1-го по 10-й
                     if(begin==='on'){//открытие на 1 м
                        let rashodInt1 = Number((data.data_nap_1[0].open_1_m).replace(",","."));
                        let rashodInt2 = Number((data.data_nap_2[0].open_1_m).replace(",","."));
                        stok = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                     };
                     if(begin==='tw'){//открытие на 2 м
                        let rashodInt1 = Number((data.data_nap_1[0].open_2_m).replace(",","."));
                        let rashodInt2 = Number((data.data_nap_2[0].open_2_m).replace(",","."));
                        stok = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                     };
                     if(begin==='th'){//открытие на 3 м
                        let rashodInt1 = Number((data.data_nap_1[0].open_3_m).replace(",","."));
                        let rashodInt2 = Number((data.data_nap_2[0].open_3_m).replace(",","."));
                        stok = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                     };
                     if(begin==='fu'){//полное открытие
                        let rashodInt1 = Number((data.data_nap_1[0].full_open).replace(",","."));
                        let rashodInt2 = Number((data.data_nap_2[0].full_open).replace(",","."));
                        stok = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                     };
                  }
                  if(Number(prolet)===11||Number(prolet)===12){//для пролётов 11 и 12
                     if(begin==='pn'){
                        let rashodInt1 = Number((data.data_nap_3[0].overflow_lower_section).replace(",","."));
                        let rashodInt2 = Number((data.data_nap_4[0].overflow_lower_section).replace(",","."));
                        stok = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                     };
                     if(begin==='fu'){
                        let rashodInt1 = Number((data.data_nap_3[0].full_open).replace(",","."));
                        let rashodInt2 = Number((data.data_nap_4[0].full_open).replace(",","."));
                        stok = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                     };
                  };               
               }else{
                  stok=0
                  result[key]=String(stok);
               };
               
               if(dataTime[key].length<=2&&dataTime[key].length>0){//если время ввдена в формате чч или просто ч (например "15"или"08"или"7")
                  stok=stok*Number(dataTime[key])*60*60
                  result[key]=String((stok/1000000).toFixed(2));
               }else if(dataTime[key].length>2&&dataTime[key].length<=5){
                  if((dataTime[key].slice(0,2)).includes('.')){//если время ввдена в формате ч,мм или  ч,м (например "15"или"08"или"7")
                     stok=stok*(((Number(dataTime[key].slice(0,1)))*60*60)+((Number(dataTime[key].slice(2,4)))*60))
                     result[key]=String((stok/1000000).toFixed(2));
                  }else{
                     stok=stok*(((Number(dataTime[key].slice(0,2)))*60*60)+((Number(dataTime[key].slice(3,5)))*60))
                     result[key]=String((stok/1000000).toFixed(2));
                  };
               };
            };

            let totalSum=0;
            for(let key in result){
               totalSum+=Number(result[key]);
            }
            totalSum=totalSum.toFixed(2)
            let srRashod=(totalSum*1000000/86400).toFixed(2);

            dispatch({type:"CHANGE_VSP_STOKS",payload:result});
            dispatch({type:"CHANGE_VSP_TOTAL_STOK",payload:totalSum});
            dispatch({type:"CHANGE_VSP_SR_RASHOD",payload:srRashod});
            dispatch({type:"CHANGE_VSP_TIMES",payload:dataTime});
            dispatch({type:"CHANGE_VSP_SR_UBV",payload:bief});
         })
      }else{
         setModal(true)
         setTextModal('Значение среднего верхнего бьефа должно быть в диапазоне от 82м до 85.5 м')
      }
   };
   return (
      <div className={cl.vspCont}>
         <span className={cl.vspTitle}>{"Расчёт стока воды через ВСП за сутки"}</span>
         <table className={cl.vspTable}>
         <colgroup>
            <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
            <col span={"1"} style={{backgroundColor:"lightblue"}}></col>
            <col span={"1"} style={{backgroundColor:"lightyellow"}} ></col>
            <col span={"1"} style={{backgroundColor:"white"}}></col>
            <col span={"1"} style={{backgroundColor:"lightcyan"}} ></col>

         </colgroup>
            <thead >
               <tr>
                  <th className={cl.vspTh}>{"Средний уровень верхнего бьефа"}</th>
                  <th className={cl.vspTh}>{"Номер пролёта"}</th>
                  <th className={cl.vspTh} style={{width:"10vw"}} >{"Вид открытия пролёта"}</th>
                  <th className={cl.vspTh}>{"Время работы пролёта, формат - 'чч:мм'"}</th>
                  <th className={cl.vspTh}>{"Сток воды через пролёт, млн. м3"}</th>
               </tr>
            </thead>
            <tbody>
               <tr className={cl.vspTrLine} >
                  <td rowSpan={44}>         
                     <input
                        style={{width:"95%"}}
                        type={"text"}
                        placeholder={"Введите средний уровень ВБ за сутки"}
                        value={bief}
                        onChange={(e)=>{
                           setBief(e.target.value);
                        }}
                     />
                  </td>
                  <td rowSpan={4}>{"Пролёт №1"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn1} onChange={(e)=>{setOneMn1(e.target.value)}} placeholder="Пр. №1 при 1 метре" type={"text"}/></td>
                  <td >{stoksArr.oneMn1}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn1} onChange={(e)=>{setTwoMn1(e.target.value)}} placeholder="Пр. №1 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn1}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn1} onChange={(e)=>{setThreeMn1(e.target.value)}} placeholder="Пр. №1 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn1}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN1} onChange={(e)=>{setFullnN1(e.target.value)}} placeholder="Пр. №1 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN1}</td>
               </tr>               

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №2"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn2} onChange={(e)=>{setOneMn2(e.target.value)}} placeholder="Пр. №2 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn2}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn2} onChange={(e)=>{setTwoMn2(e.target.value)}} placeholder="Пр. №2 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn2}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn2} onChange={(e)=>{setThreeMn2(e.target.value)}} placeholder="Пр. №2 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn2}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN2} onChange={(e)=>{setFullnN2(e.target.value)}} placeholder="Пр. №2 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN2}</td>
               </tr>  

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №3"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn3} onChange={(e)=>{setOneMn3(e.target.value)}} placeholder="Пр. №3 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn3}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn3} onChange={(e)=>{setTwoMn3(e.target.value)}} placeholder="Пр. №3 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn3}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn3} onChange={(e)=>{setThreeMn3(e.target.value)}} placeholder="Пр. №3 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn3}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN3} onChange={(e)=>{setFullnN3(e.target.value)}} placeholder="Пр. №3 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN3}</td>
               </tr>      

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №4"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn4} onChange={(e)=>{setOneMn4(e.target.value)}} placeholder="Пр. №4 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn4}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn4} onChange={(e)=>{setTwoMn4(e.target.value)}} placeholder="Пр. №4 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn4}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn4} onChange={(e)=>{setThreeMn4(e.target.value)}} placeholder="Пр. №4 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn4}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN4} onChange={(e)=>{setFullnN4(e.target.value)}} placeholder="Пр. №4 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN4}</td>
               </tr>       

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №5"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn5} onChange={(e)=>{setOneMn5(e.target.value)}} placeholder="Пр. №5 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn5}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn5} onChange={(e)=>{setTwoMn5(e.target.value)}} placeholder="Пр. №5 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn5}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn5} onChange={(e)=>{setThreeMn5(e.target.value)}} placeholder="Пр. №5 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn5}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN5} onChange={(e)=>{setFullnN5(e.target.value)}} placeholder="Пр. №5 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN5}</td>
               </tr>              

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №6"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn6} onChange={(e)=>{setOneMn6(e.target.value)}} placeholder="Пр. №6 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn6}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn6} onChange={(e)=>{setTwoMn6(e.target.value)}} placeholder="Пр. №6 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn6}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn6} onChange={(e)=>{setThreeMn6(e.target.value)}} placeholder="Пр. №6 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn6}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN6} onChange={(e)=>{setFullnN6(e.target.value)}} placeholder="Пр. №6 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN6}</td>
               </tr>     

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №7"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn7} onChange={(e)=>{setOneMn7(e.target.value)}} placeholder="Пр. №7 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn7}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn7} onChange={(e)=>{setTwoMn7(e.target.value)}} placeholder="Пр. №7 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn7}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn7} onChange={(e)=>{setThreeMn7(e.target.value)}} placeholder="Пр. №7 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn7}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN7} onChange={(e)=>{setFullnN7(e.target.value)}} placeholder="Пр. №7 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN7}</td>
               </tr>  

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №8"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn8} onChange={(e)=>{setOneMn8(e.target.value)}} placeholder="Пр. №8 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn8}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn8} onChange={(e)=>{setTwoMn8(e.target.value)}} placeholder="Пр. №8 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn8}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn8} onChange={(e)=>{setThreeMn8(e.target.value)}} placeholder="Пр. №8 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn8}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN8} onChange={(e)=>{setFullnN8(e.target.value)}} placeholder="Пр. №8 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN8}</td>
               </tr>         

               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №9"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn9} onChange={(e)=>{setOneMn9(e.target.value)}} placeholder="Пр. №9 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn9}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn9} onChange={(e)=>{setTwoMn9(e.target.value)}} placeholder="Пр. №9 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn9}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn9} onChange={(e)=>{setThreeMn9(e.target.value)}} placeholder="Пр. №9 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn9}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullN9} onChange={(e)=>{setFullnN9(e.target.value)}} placeholder="Пр. №9 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullN9}</td>
               </tr>               
               <tr className={cl.vspTrLine}>
                  <td rowSpan={4}>{"Пролёт №10"}</td>
                  <td>{"1 м"}</td>
                  <td><input value={oneMn10} onChange={(e)=>{setOneMn10(e.target.value)}} placeholder="Пр. №10 при 1 метре" type={"text"}/></td>
                  <td>{stoksArr.oneMn10}</td>
               </tr>
               <tr>
                  <td>{"2 м"}</td>
                  <td><input value={twoMn10} onChange={(e)=>{setTwoMn10(e.target.value)}} placeholder="Пр. №10 при 2 метрах" type={"text"}/></td>
                  <td>{stoksArr.twoMn10}</td>
               </tr>
               <tr>
                  <td>{"3 м"}</td>
                  <td><input value={threeMn10} onChange={(e)=>{setThreeMn10(e.target.value)}} placeholder="Пр. №10 при 3 метрах" type={"text"}/></td>
                  <td>{stoksArr.threeMn10}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullMn10} onChange={(e)=>{setFulln10(e.target.value)}} placeholder="Пр. №10 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullMn10}</td>
               </tr>    
               <tr className={cl.vspTrLine}>
                  <td rowSpan={2}>{"Пролёт №11"}</td>
                  <td>{"перелив через нижнюю секцию"}</td>
                  <td><input value={pnsN11} onChange={(e)=>{setPnsN11(e.target.value)}} placeholder="Пр. №11 ниж. секц" type={"text"}/></td>
                  <td>{stoksArr.pnsN11}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullMn11} onChange={(e)=>{setFulln11(e.target.value)}} placeholder="Пр. №11 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullMn11}</td>
               </tr>               
               <tr className={cl.vspTrLine}>
                  <td rowSpan={2}>{"Пролёт №12"}</td>
                  <td>{"перелив через нижнюю секцию"}</td>
                  <td><input value={pnsN12} onChange={(e)=>{setPnsN12(e.target.value)}} placeholder="Пр. №12 ниж. секц" type={"text"}/></td>
                  <td>{stoksArr.pnsN12}</td>
               </tr>
               <tr>
                  <td>{"полное открытие"}</td> 
                  <td> <input  value={fullMn12} onChange={(e)=>{setFulln12(e.target.value)}} placeholder="Пр. №12 при полн. откр." type={"text"}/></td>
                  <td>{stoksArr.fullMn12}</td>
               </tr>               
            </tbody>
            <tfoot></tfoot>
         </table>
        
        <div className={cl.divButtonTableCalc}>
         <div className={cl.divWithTips}>
               {"Примеры ввода времени:"}
               <hr/>
               {"00:08  - если пролёт был открыт 8 минут"} <br/> 
               {"00:30  - если пролёт был открыт 30 минут"} <br/>         
               {"02:00  - если пролёт был открыт 2 часа"} <br/>     
               {"05:25  - если пролёт был открыт 5 часов 25 минут"} <br/>     
               {"13:58  - если пролёт был открыт 13 часов 58 минут"} <br/>     
               {"24:00  - если пролёт был открыт 24 часа"} <br/>     
            </div>
            <div >
               <button 
                  className={cl.buttonVsp}
                  onClick={() => {
                        calculateVspRashod()
                     }}>{"Рассчитать сток через ВСП"}
               </button>
            </div>
            <table className={cl.itogVspTable}>
                <thead>
                  <tr>
                     <th>{"Суммарный сток через ВСП"}</th>
                     <th>{"Среднесуточный расход через ВСП"}</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                     <td>{vspTotalStok}</td>
                     <td>{vspSrRashod}</td>
                  </tr>
                </tbody> 
                <tfoot></tfoot>    
            </table>
        </div>

         <Modal visible={modal} setVisible={closeModal}>
            <div className={cl.textModal}>
               <span>{textModal}</span> 
               <button
                  style={{width:"10%"}}
                  onClick={()=>{
                     closeModal();
                     setTextModal('');
                  }}
               >{"Ок"}</button>
            </div>
         </Modal>
      </div>

   )
}
export default VSP;






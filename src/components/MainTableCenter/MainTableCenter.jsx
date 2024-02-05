import React,{ useState,useRef }  from 'react';
import classes from '../MainTableCenter/MainTableCenter.module.css'
import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';

function MainTableCenter({data,time,power,timesArr}){

   const [modal,setModal]=useState(false);
   const [dataForChange,setDataForChange]=useState('');
   const [text,setText]=useState(['','']);
   const [idd,setIdd]=useState('');
   const dispatch = useDispatch();
   const inputNewTime = useRef(null);

   function showModal(e){
      setIdd(e.target.id);
      setModal(true);

      let data,hour,gen 
      data = e.target.id;
      gen = data.slice(3,4)
      if(data.length===7){
          hour = data.slice(5,7)
      }else{
          hour = data.slice(5,6)   
      }
      setText([gen,hour])
   }

   function closeModal(){
      setModal(false)
   };

   function exeptData(e){ //функция отрабатывает при нажатии Enter или Escape в модальном окне 
      if(e.code==='Escape') {
         closeModal();
      };
      if(e.keyCode===13){
         dispatch({type:"CHANGE_CLACULATION_FLAG",payload:false});
        document.getElementById(idd).innerText=dataForChange;
        setDataForChange('')
        dispatch({type:"CHANGE_TIMES",payload:[
            {gen1:document.getElementById('gen1_1').innerText, gen2: document.getElementById('gen2_1').innerText, 
             gen3:document.getElementById('gen3_1').innerText, gen4: document.getElementById('gen4_1').innerText, 
             gen5:document.getElementById('gen5_1').innerText, gen6: document.getElementById('gen6_1').innerText,
             gen7:document.getElementById('gen7_1').innerText, gen8: document.getElementById('gen8_1').innerText},
            {gen1:document.getElementById('gen1_2').innerText, gen2:document.getElementById('gen2_2').innerText, 
             gen3:document.getElementById('gen3_2').innerText, gen4:document.getElementById('gen4_2').innerText, 
             gen5:document.getElementById('gen5_2').innerText, gen6:document.getElementById('gen6_2').innerText,
             gen7:document.getElementById('gen7_2').innerText, gen8:document.getElementById('gen8_2').innerText},
            {gen1:document.getElementById('gen1_3').innerText, gen2:document.getElementById('gen2_3').innerText, 
             gen3:document.getElementById('gen3_3').innerText, gen4:document.getElementById('gen4_3').innerText, 
             gen5:document.getElementById('gen5_3').innerText, gen6:document.getElementById('gen6_3').innerText,
             gen7:document.getElementById('gen7_3').innerText, gen8:document.getElementById('gen8_3').innerText},
            {gen1:document.getElementById('gen1_4').innerText, gen2:document.getElementById('gen2_4').innerText, 
             gen3:document.getElementById('gen3_4').innerText, gen4:document.getElementById('gen4_4').innerText, 
             gen5:document.getElementById('gen5_4').innerText, gen6:document.getElementById('gen6_4').innerText,
             gen7:document.getElementById('gen7_4').innerText, gen8:document.getElementById('gen8_4').innerText},
            {gen1:document.getElementById('gen1_5').innerText, gen2:document.getElementById('gen2_5').innerText, 
             gen3:document.getElementById('gen3_5').innerText, gen4:document.getElementById('gen4_5').innerText, 
             gen5:document.getElementById('gen5_5').innerText, gen6:document.getElementById('gen6_5').innerText,
             gen7:document.getElementById('gen7_5').innerText, gen8:document.getElementById('gen8_5').innerText},
            {gen1:document.getElementById('gen1_6').innerText, gen2:document.getElementById('gen2_6').innerText, 
             gen3:document.getElementById('gen3_6').innerText, gen4:document.getElementById('gen4_6').innerText, 
             gen5:document.getElementById('gen5_6').innerText, gen6:document.getElementById('gen6_6').innerText,
             gen7:document.getElementById('gen7_6').innerText, gen8:document.getElementById('gen8_6').innerText},
            {gen1:document.getElementById('gen1_7').innerText, gen2:document.getElementById('gen2_7').innerText, 
             gen3:document.getElementById('gen3_7').innerText, gen4:document.getElementById('gen4_7').innerText, 
             gen5:document.getElementById('gen5_7').innerText, gen6:document.getElementById('gen6_7').innerText,
             gen7:document.getElementById('gen7_7').innerText, gen8:document.getElementById('gen8_7').innerText},
            {gen1:document.getElementById('gen1_8').innerText, gen2:document.getElementById('gen2_8').innerText, 
             gen3:document.getElementById('gen3_8').innerText, gen4:document.getElementById('gen4_8').innerText, 
             gen5:document.getElementById('gen5_8').innerText, gen6:document.getElementById('gen6_8').innerText,
             gen7:document.getElementById('gen7_8').innerText, gen8:document.getElementById('gen8_8').innerText},
            {gen1:document.getElementById('gen1_9').innerText, gen2:document.getElementById('gen2_9').innerText, 
             gen3:document.getElementById('gen3_9').innerText, gen4:document.getElementById('gen4_9').innerText, 
             gen5:document.getElementById('gen5_9').innerText, gen6:document.getElementById('gen6_9').innerText,
             gen7:document.getElementById('gen7_9').innerText, gen8:document.getElementById('gen8_9').innerText},
            {gen1:document.getElementById('gen1_10').innerText, gen2:document.getElementById('gen2_10').innerText, 
             gen3:document.getElementById('gen3_10').innerText, gen4:document.getElementById('gen4_10').innerText, 
             gen5:document.getElementById('gen5_10').innerText, gen6:document.getElementById('gen6_10').innerText,
             gen7:document.getElementById('gen7_10').innerText, gen8:document.getElementById('gen8_10').innerText},
            {gen1:document.getElementById('gen1_11').innerText, gen2:document.getElementById('gen2_11').innerText, 
             gen3:document.getElementById('gen3_11').innerText, gen4:document.getElementById('gen4_11').innerText, 
             gen5:document.getElementById('gen5_11').innerText, gen6:document.getElementById('gen6_11').innerText,
             gen7:document.getElementById('gen7_11').innerText, gen8:document.getElementById('gen8_11').innerText},
            {gen1:document.getElementById('gen1_12').innerText, gen2:document.getElementById('gen2_12').innerText, 
             gen3:document.getElementById('gen3_12').innerText, gen4:document.getElementById('gen4_12').innerText, 
             gen5:document.getElementById('gen5_12').innerText, gen6:document.getElementById('gen6_12').innerText,
             gen7:document.getElementById('gen7_12').innerText, gen8:document.getElementById('gen8_12').innerText},
            {gen1:document.getElementById('gen1_13').innerText, gen2:document.getElementById('gen2_13').innerText, 
             gen3:document.getElementById('gen3_13').innerText, gen4:document.getElementById('gen4_13').innerText, 
             gen5:document.getElementById('gen5_13').innerText, gen6:document.getElementById('gen6_13').innerText,
             gen7:document.getElementById('gen7_13').innerText, gen8:document.getElementById('gen8_13').innerText},
            {gen1:document.getElementById('gen1_14').innerText, gen2:document.getElementById('gen2_14').innerText, 
             gen3:document.getElementById('gen3_14').innerText, gen4:document.getElementById('gen4_14').innerText, 
             gen5:document.getElementById('gen5_14').innerText, gen6:document.getElementById('gen6_14').innerText,
             gen7:document.getElementById('gen7_14').innerText, gen8:document.getElementById('gen8_14').innerText},
            {gen1:document.getElementById('gen1_15').innerText, gen2:document.getElementById('gen2_15').innerText, 
             gen3:document.getElementById('gen3_15').innerText, gen4:document.getElementById('gen4_15').innerText, 
             gen5:document.getElementById('gen5_15').innerText, gen6:document.getElementById('gen6_15').innerText,
             gen7:document.getElementById('gen7_15').innerText, gen8:document.getElementById('gen8_15').innerText},
            {gen1:document.getElementById('gen1_16').innerText, gen2:document.getElementById('gen2_16').innerText, 
             gen3:document.getElementById('gen3_16').innerText, gen4:document.getElementById('gen4_16').innerText, 
             gen5:document.getElementById('gen5_16').innerText, gen6:document.getElementById('gen6_16').innerText,
             gen7:document.getElementById('gen7_16').innerText, gen8:document.getElementById('gen8_16').innerText},
            {gen1:document.getElementById('gen1_17').innerText, gen2:document.getElementById('gen2_17').innerText, 
             gen3:document.getElementById('gen3_17').innerText, gen4:document.getElementById('gen4_17').innerText, 
             gen5:document.getElementById('gen5_17').innerText, gen6:document.getElementById('gen6_17').innerText,
             gen7:document.getElementById('gen7_17').innerText, gen8:document.getElementById('gen8_17').innerText},
            {gen1:document.getElementById('gen1_18').innerText, gen2:document.getElementById('gen2_18').innerText, 
             gen3:document.getElementById('gen3_18').innerText, gen4:document.getElementById('gen4_18').innerText, 
             gen5:document.getElementById('gen5_18').innerText, gen6:document.getElementById('gen6_18').innerText,
             gen7:document.getElementById('gen7_18').innerText, gen8:document.getElementById('gen8_18').innerText},
            {gen1:document.getElementById('gen1_19').innerText, gen2:document.getElementById('gen2_19').innerText, 
             gen3:document.getElementById('gen3_19').innerText, gen4:document.getElementById('gen4_19').innerText, 
             gen5:document.getElementById('gen5_19').innerText, gen6:document.getElementById('gen6_19').innerText,
             gen7:document.getElementById('gen7_19').innerText, gen8:document.getElementById('gen8_19').innerText},
            {gen1:document.getElementById('gen1_20').innerText, gen2:document.getElementById('gen2_20').innerText, 
             gen3:document.getElementById('gen3_20').innerText, gen4:document.getElementById('gen4_20').innerText, 
             gen5:document.getElementById('gen5_20').innerText, gen6:document.getElementById('gen6_20').innerText,
             gen7:document.getElementById('gen7_20').innerText, gen8:document.getElementById('gen8_20').innerText},
            {gen1:document.getElementById('gen1_21').innerText, gen2:document.getElementById('gen2_21').innerText, 
             gen3:document.getElementById('gen3_21').innerText, gen4:document.getElementById('gen4_21').innerText, 
             gen5:document.getElementById('gen5_21').innerText, gen6:document.getElementById('gen6_21').innerText,
             gen7:document.getElementById('gen7_21').innerText, gen8:document.getElementById('gen8_21').innerText},
            {gen1:document.getElementById('gen1_22').innerText, gen2:document.getElementById('gen2_22').innerText, 
             gen3:document.getElementById('gen3_22').innerText, gen4:document.getElementById('gen4_22').innerText, 
             gen5:document.getElementById('gen5_22').innerText, gen6:document.getElementById('gen6_22').innerText,
             gen7:document.getElementById('gen7_22').innerText, gen8:document.getElementById('gen8_22').innerText},
            {gen1:document.getElementById('gen1_23').innerText, gen2:document.getElementById('gen2_23').innerText, 
             gen3:document.getElementById('gen3_23').innerText, gen4:document.getElementById('gen4_23').innerText, 
             gen5:document.getElementById('gen5_23').innerText, gen6:document.getElementById('gen6_23').innerText,
             gen7:document.getElementById('gen7_23').innerText, gen8:document.getElementById('gen8_23').innerText},
            {gen1:document.getElementById('gen1_24').innerText, gen2:document.getElementById('gen2_24').innerText, 
             gen3:document.getElementById('gen3_24').innerText, gen4:document.getElementById('gen4_24').innerText, 
             gen5:document.getElementById('gen5_24').innerText, gen6:document.getElementById('gen6_24').innerText,
             gen7:document.getElementById('gen7_24').innerText, gen8:document.getElementById('gen8_24').innerText},
           ]});
         setModal(false);
      };  
   };
//функция выставляет фокус на input при открытии модального окна, 
//она передаётся в модальное окно в props и отрабатывает при загрузке
   function inputFocus(){
      setTimeout(()=>{
         inputNewTime.current.focus();
      },10) ;
   };
    return(
   <>
      <table className={classes.tableCenter}>
            <colgroup>
               <col span={"2"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"2"} style={{backgroundColor:"white"}}></col>
               <col span={"2"} style={{backgroundColor:"lightgreen"}} ></col>
               <col span={"2"} style={{backgroundColor:"white"}}></col>
               <col span={"2"} style={{backgroundColor:"lightgreen"}} ></col>
               <col span={"2"} style={{backgroundColor:"white"}}></col>
               <col span={"2"} style={{backgroundColor:"lightgreen"}}></col>
               <col span={"2"} style={{backgroundColor:"white"}}></col>
            </colgroup>
            <thead>
               <tr>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г1</th>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г2</th>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г3</th>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г4</th>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г5</th>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г6</th>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г7</th>
                  <th colSpan={"2"} style ={{textAlign:"center"}}>Г8</th>
               </tr>
               <tr>
                  <td>кВт</td><td>мин</td><td>кВт</td><td>мин</td>
                  <td>кВт</td><td>мин</td><td>кВт</td><td>мин</td><td>кВт</td>
                  <td>мин</td><td>кВт</td><td>мин</td><td>кВт</td><td>мин</td>
                  <td>кВт</td><td>мин</td> 
               </tr>
            </thead>
            <tbody className={classes.borderC}>
                  {data.map((str)=>{
                     let cl = [[classes.tdWithTime],[classes.tdWithTime],[classes.tdWithTime],[classes.tdWithTime],
                     [classes.tdWithTime],[classes.tdWithTime],[classes.tdWithTime],[classes.tdWithTime]]

                     let clVir = [[classes.tdvirab],[classes.tdvirab],[classes.tdvirab],[classes.tdvirab],
                     [classes.tdvirab],[classes.tdvirab],[classes.tdvirab],[classes.tdvirab]]

                     for(let i=1; i<=8;i++){
                        if(timesArr[str.id-1]['gen'+i]!=='-'){
                           if (timesArr[str.id-1]['gen'+i]!=='0'&&timesArr[str.id-1]['gen'+i]!=='60'){//если время не равно 60 или 0, подсвечиваем ячейку синим
                              cl[i-1].push(classes.tdWithChangedTime)
                           }
                        }
                        if(str['gen'+i]==='нет данных'){
                           clVir[i-1].push(classes.tdWithEmptyData)
                        }
                     }

                     return(  
                     <tr key={str.id}>
                        <td className={clVir[0].join(' ')}>{str.gen1}</td>
                        <td
                           className={cl[0].join(' ')}
                           tabIndex={(str.id)}
                           title={'Нажмите для изменения'} 
                           id={`gen1_${str.id}`}
                           onClick={(e)=>{
                              showModal(e)  
                          }}>{timesArr[str.id-1].gen1}</td>

                        <td className={clVir[1].join(' ')}>{str.gen2}</td>
                        <td 
                           tabIndex={str.id+24} 
                           className={cl[1].join(' ')}
                           title={'Нажмите для изменения'} 
                           id={`gen2_${str.id}`}
                           onClick={(e)=>{
                               showModal(e)  
                           }}>{timesArr[str.id-1].gen2}</td>

                        <td className={clVir[2].join(' ')}>{str.gen3}</td>
                        <td 
                           tabIndex={str.id+48} 
                           className={cl[2].join(' ')}
                           title={'Нажмите для изменения'} 
                           id={`gen3_${str.id}`}
                           onClick={(e)=>{
                              showModal(e)  
                           }}>{timesArr[str.id-1].gen3}</td>

                        <td className={clVir[3].join(' ')}>{str.gen4}</td>
                        <td 
                           tabIndex={str.id+72} 
                           className={cl[3].join(' ')}
                           title={'Нажмите для изменения'} 
                           id={`gen4_${str.id}`}
                           onClick={(e)=>{
                              showModal(e)  
                           }}>{timesArr[str.id-1].gen4}</td>

                        <td className={clVir[4].join(' ')}>{str.gen5}</td>
                        <td 
                           tabIndex={str.id+96} 
                           className={cl[4].join(' ')}
                           title={'Нажмите для изменения'} 
                           id={`gen5_${str.id}`}
                           onClick={(e)=>{
                              showModal(e)  
                           }}>{timesArr[str.id-1].gen5}</td>

                        <td className={clVir[5].join(' ')}>{str.gen6}</td>
                        <td 
                           tabIndex={str.id+120} 
                           className={cl[5].join(' ')}
                           title={'Нажмите для изменения'} 
                           id={`gen6_${str.id}`}
                           onClick={(e)=>{
                              showModal(e)  
                           }}>{timesArr[str.id-1].gen6}</td>

                        <td className={clVir[6].join(' ')}>{str.gen7}</td>
                        <td
                           tabIndex={str.id+144} 
                           className={cl[6].join(' ')}
                           title={'Нажмите для изменения'} 
                           id={`gen7_${str.id}`}
                           onClick={(e)=>{
                              showModal(e)  
                           }}>{timesArr[str.id-1].gen7}</td>

                        <td className={clVir[7].join(' ')}>{str.gen8}</td>
                        <td 
                           tabIndex={str.id+168} 
                           className={cl[7].join(' ')}
                           title={'Нажмите для изменения'} 
                           id={`gen8_${str.id}`}
                           onClick={(e)=>{
                              showModal(e)  
                           }}>{timesArr[str.id-1].gen8}</td>
                     </tr>)
                  })}
            </tbody>
            <tfoot >
               <tr>
                  <td>МВтч</td><td>час</td><td>МВтч</td><td>час</td><td>МВтч</td><td>час</td>
                  <td>МВтч</td><td>час</td><td>МВтч</td><td>час</td><td>МВтч</td><td>час</td><td>МВтч</td><td>час</td>
                  <td>МВтч</td><td>час</td>
               </tr>
               <tr>
                  <td>{power[0]}</td><td>{time[0]}</td><td>{power[1]}</td><td>{time[1]}</td>
                  <td>{power[2]}</td><td>{time[2]}</td><td>{power[3]}</td><td>{time[3]}</td>
                  <td>{power[4]}</td><td>{time[4]}</td><td>{power[5]}</td><td>{time[5]}</td>
                  <td>{power[6]}</td><td>{time[6]}</td><td>{power[7]}</td><td>{time[7]}</td>
               </tr>
               <tr>
                  <td>.</td><td></td><td></td><td></td><td></td><td></td>
                  <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                  <td></td><td></td>
               </tr>
            </tfoot>
         </table>
         <Modal visible={modal} setVisible={closeModal} onLoad={inputFocus}>
            <div>
               Введите количество проработанных минут для {text[0]}-го генератора
                  в {text[1]}-м часе
            </div>
            <div style={{'textAlign':'center'}}>
               <input 
                     value={dataForChange}
                     ref={inputNewTime}
                     onChange={(e)=>{setDataForChange(e.target.value)}}
                     onKeyDown={(e)=>{
                        exeptData(e);  
                     }}
                  />
            </div>
         </Modal>
   </>
    )
}

export default MainTableCenter
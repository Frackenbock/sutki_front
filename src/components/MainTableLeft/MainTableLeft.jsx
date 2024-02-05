import React,{useState} from 'react';
import classes from  '../MainTableLeft/MainTableLeft.module.css';
import { useDispatch } from "react-redux";
function MainTableLeft(props){
   const stroks = props.arr;// массив объектов для отрисовки
   const dispatch = useDispatch();
   let redcColor = [classes.leftInutNapor]; // класс с красным цветом
   let clas;// передаётся в className для input-ов
   let placeholderText;// подсказка в input

   const [napor_1,setNapor_1]=useState(stroks[0].input);const [napor_2,setNapor_2]=useState(stroks[1].input);
   const [napor_3,setNapor_3]=useState(stroks[2].input);const [napor_4,setNapor_4]=useState(stroks[3].input);
   const [napor_5,setNapor_5]=useState(stroks[4].input);const [napor_6,setNapor_6]=useState(stroks[5].input);
   const [napor_7,setNapor_7]=useState(stroks[6].input);const [napor_8,setNapor_8]=useState(stroks[7].input);
   const [napor_9,setNapor_9]=useState(stroks[8].input);const [napor_10,setNapor_10] = useState(stroks[9].input);
   const [napor_11,setNapor_11] = useState(stroks[10].input);const [napor_12,setNapor_12] = useState(stroks[11].input);
   const [napor_13,setNapor_13] = useState(stroks[12].input);const [napor_14,setNapor_14] = useState(stroks[13].input);
   const [napor_15,setNapor_15] = useState(stroks[14].input);const [napor_16,setNapor_16] = useState(stroks[15].input);
   const [napor_17,setNapor_17] = useState(stroks[16].input);const [napor_18,setNapor_18] = useState(stroks[17].input);
   const [napor_19,setNapor_19] = useState(stroks[18].input);const [napor_20,setNapor_20] = useState(stroks[19].input);
   const [napor_21,setNapor_21] = useState(stroks[20].input);const [napor_22,setNapor_22] = useState(stroks[21].input);
   const [napor_23,setNapor_23] = useState(stroks[22].input);const [napor_24,setNapor_24] = useState(stroks[23].input);

   const arr = [napor_1,napor_2,napor_3,napor_4,napor_5,napor_6,napor_7,napor_8,napor_9,napor_10,napor_11,napor_12,
      napor_13,napor_14,napor_15,napor_16,napor_17,napor_18,napor_19,napor_20,napor_21,napor_22,napor_23,napor_24,]
  
   function onChangeHandler (e){
      if(Number(String(e.target.value).replace(",","."))<=17.5 &&!isNaN(Number(String(e.target.value).replace(",",".")))){
         switch(e.target.name){
            case'1P':setNapor_1(e.target.value);break;case'2P':setNapor_2(e.target.value);break;
            case'3P':setNapor_3(e.target.value);break;case'4P':setNapor_4(e.target.value);break;
            case'5P':setNapor_5(e.target.value);break;case'6P':setNapor_6(e.target.value);break;
            case'7P':setNapor_7(e.target.value);break;case'8P':setNapor_8(e.target.value);break;
            case'9P':setNapor_9(e.target.value);break;case'10P':setNapor_10(e.target.value);break;
            case'11P':setNapor_11(e.target.value);break;case'12P':setNapor_12(e.target.value);break;
            case'13P':setNapor_13(e.target.value);break;case'14P':setNapor_14(e.target.value);break;
            case'15P':setNapor_15(e.target.value);break;case'16P':setNapor_16(e.target.value);break;
            case'17P':setNapor_17(e.target.value);break;case'18P':setNapor_18(e.target.value);break;
            case'19P':setNapor_19(e.target.value);break;case'20P':setNapor_20(e.target.value);break;
            case'21P':setNapor_21(e.target.value);break;case'22P':setNapor_22(e.target.value);break;
            case'23P':setNapor_23(e.target.value);break;case'24P':setNapor_24(e.target.value);break;

         }
      }
   }

   function isEnter(e){
      if(e.keyCode===13){ //при нажатии на enter курсор переводится на ввод следующего напора
         dispatch({type:"CHANGE_CLACULATION_FLAG",payload:false});
         e.target.blur();
         let newId = Number(e.target.id)+1;
         if (newId===25){
            newId=1;
         };
         document.getElementById(String(newId)).focus();

         dispatch({type:"CHANGE_NAPORS",payload:[     
            {number:'1',time:'0:00-1:00',input:napor_1},{number:'2',time:'1:00-2:00',input:napor_2},
            {number:'3',time:'2:00-3:00',input:napor_3},{number:'4',time:'3:00-4:00',input:napor_4},
            {number:'5',time:'4:00-5:00',input:napor_5},{number:'6',time:'5:00-6:00',input:napor_6},
            {number:'7',time:'6:00-7:00',input:napor_7},{number:'8',time:'7:00-8:00',input:napor_8},
            {number:'9',time:'8:00-09:00',input:napor_9},{number:'10',time:'09:00-10:00',input:napor_10},
            {number:'11',time:'10:00-11:00',input:napor_11},{number:'12',time:'11:00-12:00',input:napor_12},
            {number:'13',time:'12:00-13:00',input:napor_13},{number:'14',time:'13:00-14:00',input:napor_14},
            {number:'15',time:'14:00-15:00',input:napor_15},{number:'16',time:'15:00-16:00',input:napor_16},
            {number:'17',time:'16:00-17:00',input:napor_17},{number:'18',time:'17:00-18:00',input:napor_18},
            {number:'19',time:'18:00-19:00',input:napor_19},{number:'20',time:'19:00-20:00',input:napor_20},
            {number:'21',time:'20:00-21:00',input:napor_21},{number:'22',time:'21:00-22:00',input:napor_22},
            {number:'23',time:'22:00-23:00',input:napor_23},{number:'24',time:'23:00-24:00',input:napor_24}
         ]})
      }
   };   
    return(
        <table className={classes.tableLeft}>
        <colgroup>
           <col span={"1"} style={{backgroundColor:"lightgreen"}}></col>
           <col span={"1"} style={{backgroundColor:"white"}}></col>
           <col span={"1"} style={{width:"30%"}}></col>
        </colgroup>
        <thead>
           <tr>
              <th rowSpan={"2"} className={classes.hourCollumn}>{"№ Часа"}</th>
              <th rowSpan={"2"} className={classes.timeCollumn}>{"Интервал"}</th>
              <th >{"Напор"}</th>
           </tr>
           <tr><td>{"м"}</td></tr>
        </thead>
        <tbody className={classes.tbodyTableLeft}>  
         { 
            stroks.map((str)=>{
               redcColor.push(classes.inputNapor)
               if(arr[str.number-1]){
                  clas=classes.inputNaporNotEmpty;
               }else{
                  clas=classes.inputNaporEmpty;
                  placeholderText='нет данных'
               };

               return(
               <tr key={str.number}>
                  <td >{str.number}</td>
                  <td>{str.time}</td>
                  <td> 
                     <input 
                        className = {clas} 
                        placeholder={placeholderText}
                        autoComplete={'off'}
                        type={"text"} 
                        name={str.number+'P'} 
                        id={str.number}
                        onChange ={(e)=>{onChangeHandler(e)}}
                        onKeyDown = {(e)=>{ isEnter (e) }}
                        value = {String(arr[str.number-1]).replace('.',',')}
                     />  
                  </td>
               </tr>
               )
            })
         }
        </tbody>
        <tfoot >
           <tr style={{backgroundColor:"wheat"}}>
              <td ></td><td>Итог</td><td>м</td>
           </tr>
           <tr style={{backgroundColor:"wheat"}}>
              <td ></td><td></td>
              <td>{props.napor}</td>
           </tr>
           <tr style={{backgroundColor:"white",height:"50%"}}>
              <th>.</th><th></th><th></th>
           </tr>
        </tfoot>
     </table>
    )
}

export default MainTableLeft;
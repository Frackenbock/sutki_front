import {useEffect} from 'react';
import fetchRaport from '../../API/fetchRaport';
import normalizeDate from '../../utils/normalizeDate';
import cl from './Raport.module.css';
import { useSelector,useDispatch } from "react-redux";
import normalizeDateYesterday from '../../utils/normalizeDateYesterday';

function Raport (){
    const getApiRaport = new fetchRaport();
    const dispatch = useDispatch();
    const date = useSelector((state)=>{return  state.sutki.date });
    const raportPbrArr = useSelector((state)=>{return  state.raport.raportPbrArr});
    
    useEffect(()=>{
        const normDate = {
            date: normalizeDate(date),
         };
        getApiRaport.getDataPbr(normDate)
        .then((data)=>{
            // let arrNames=[];
            // let arr=[];
            // for(let i=0;i<data.length;i++){
            //   if(!arrNames.includes(data[i][0])){
            //         arrNames.push(data[i][0])
            //         arr.push(data[i])
            //     }
            // }
            // console.log(normalizeDateYesterday(date),normalizeDate(date))
            // dispatch({type:"CHANGE_PBR_ARR",payload:arr});
            console.log(data)
        })
    },[date]);

    return (
        <div className={cl.mainRaportCont}>
            <span style={{fontSize:"1.8vw",marginTop:"2vh"}}>{'Суточная справка'}</span>
            <div className={cl.raportCont}>  
                <table className={cl.raportFirstTable}>
                    <colgroup>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"20vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"white",width:"18vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"7vw"}} ></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th colSpan={"3"}  className={cl.thPbr}> {` О  состоянии  оборудования и режимах работы филиала ПАО "РусГидро" - "Нижегородская ГЭС" 
                                 отключена от ЦКС АРЧМ с 00:58 23.07.25   подключены к СДПМ с 00:12 17.12.19`} </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{`06:00 ${normalizeDate(date)}`}</td><td colSpan={"2"}></td>
                        </tr>
                        <tr>
                            <td>{`Диспетчерский график (на текущие сутки)`}</td><td></td> <td>{`тыс.  кВт*час.`}</td>
                        </tr>
                        <tr>
                            <td>{`Выработка электроэнергии (за прошедшие сутки)`}</td><td></td> <td>{`тыс.  кВт*час.`}</td>
                        </tr>
                        <tr>
                            <td>{`Выработка с начала месяца`}</td><td></td> <td>{`тыс.  кВт*час.`}</td>
                        </tr>
                        <tr>
                            <td>{`Среднесуточный расход (суммарный)`}</td><td></td> <td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Расход через турбины`}</td><td></td> <td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Расход через водосливную плотину`}</td><td></td> <td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Боковой приток за прошедшие сутки`}</td><td></td> <td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Среднесуточный расход Рыбинской ГЭС `}</td><td></td> <td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Суммарный среднесуточный приток`}</td><td></td> <td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Уровень верхнего бьефа   (на 06:00)`}</td><td></td> <td>{`м`}</td>
                        </tr>
                        <tr>
                            <td>{`Уровень нижнего бьефа   (на 06:00)`}</td><td></td> <td>{`м`}</td>
                        </tr>
                        <tr>
                            <td>{`Минимальная нагрузка (с 6:00 прошлых до 6:00 текущих суток)`}</td><td></td> <td>{`МВт`}</td>
                        </tr>
                        <tr>
                            <td>{`Располагаемая мощность`}</td><td></td> <td>{`МВт`}</td>
                        </tr>
                        <tr>
                            <td>{`Рабочая мощность  (на текущие сутки)`}</td><td></td> <td>{`МВт`}</td>
                        </tr>
                        <tr style={{height:"10vh"}}>
                            <td>{`В ремонте (основное оборудование, оборудование ОРУ-110,220, оборудование 13,8 кВ,обрудование 6 кВ)`}</td><td colSpan={"2"}></td> 
                        </tr>
                        <tr>
                            <td>{`Аварии, инциденты, крупные дефекты за прошедшие сутки 
                            (фиксировать все существенные отклонения в том числе и те по которым не отправлялись уведомления в Центр Мониторинга)`}</td><td colSpan={"2"}></td> 
                        </tr>
                        <tr>
                            <td>{`Начальник смены станции`}</td><td colSpan={"2"}></td> 
                        </tr>
                        <tr>
                            <td  colSpan={"3"}>{`Собственный максимум потребления на собственные нужды (КПЭ):`}</td>
                        </tr>
                        <tr>
                            <td>{`норматив на месяц`} </td> <td></td> <td>{`МВт`}</td> 
                        </tr>
                        <tr>
                            <td>{`за сутки`} </td> <td></td> <td>{`МВт`}</td> 
                        </tr>
                        <tr>
                            <td>{`с начала месяца`} </td> <td></td> <td>{`МВт`}</td> 
                        </tr>
                        <tr>
                            <td>{`Отметка ВБ Рыбинской ГЭС`} </td> <td></td> <td></td> 
                        </tr>
                        <tr>
                            <td>{`Переводы на ОСШ 110 кВ `} </td> <td></td> <td></td> 
                        </tr>
                        <tr>
                            <td>{`Открытие/Закрытие ВСП`} </td> <td></td> <td></td> 
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>


                <table className={cl.raportSecondTable}>
                    <colgroup>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"4vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"white",width:"5vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"5vw"}} ></col>
                        <col span={"1"} style={{backgroundColor:"white",width:"5vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"5vw"}} ></col>
                        <col span={"1"} style={{backgroundColor:"white",width:"5vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"5vw"}} ></col>
                        <col span={"1"} style={{backgroundColor:"white",width:"5vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"6vw"}} ></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th className={cl.thPbr}>{`Время`}</th>
                            <th className={cl.thPbr}>{`ВБ`}</th>
                            <th className={cl.thPbr}>{`НБ`}</th>
                            <th className={cl.thPbr}>{`Напор`}</th>
                            <th className={cl.thPbr}>{`Р гэс ПБР`}</th>
                            <th className={cl.thPbr}>{`УДГ`}</th>
                            <th className={cl.thPbr}>{`Р гэс Факт`}</th>
                            <th className={cl.thPbr}>{`U на шинах 110 кВ`}</th>
                            <th className={cl.thPbr}>{`Отклонение выработки факта от УДГ`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                            <td>06:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>07:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                         <tr> 
                            <td>08:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>09:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>10:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>11:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>12:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>13:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>14:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>15:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>16:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>17:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>18:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>19:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>20:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>21:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>22:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>23:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>24:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>01:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>02:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>03:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>04:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>05:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                        <tr> 
                            <td>06:00</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div>
    )
};

export default Raport;

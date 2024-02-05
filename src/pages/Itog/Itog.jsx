import React,{useEffect,useRef,useState} from 'react';
import cl from './Itog.module.css';
import { useSelector,useDispatch } from "react-redux";
import fetchItog from '../../API/fetchItog';
import normalizeDate from '../../utils/normalizeDate';
import normalizeItogData from '../../utils/normalizeItogData';
import Button from "../../components/UI/Button_layout/Button";
import Modal from '../../components/Modal/Modal';

function Itog (){
    const dispatch = useDispatch();
    const [modal,setModal] = useState(false); //открытие и закрытие модалки для изменения времени работы на холостом ходу
    const [show,setShow] = useState(0); //открытие и закрытие модалки для подтверждения записи данных в БД
    const [dataForChange,setDataForChange] = useState('');//переменная для ввода новых данных в модалке
    const [idd,setIdd]=useState('');
    const inputNewTime = useRef(null);

    const totalRashod = useSelector((state)=>{return state.rashod.totalRashod});
    const sredniyNapor = useSelector((state)=>{return state.sutki.sredniyNapor});
    const totalPower = useSelector((state)=>{return state.sutki.totalPower});
    const udelnRashod = useSelector((state)=>{return state.rashod.udelnRashod});
    const sumGenStok = useSelector((state)=>{return state.stok.sumGenStok});
    const totalStok = useSelector((state)=>{return state.stok.totalStok});
    const summTimes = useSelector((state)=>{return state.sutki.summTimes});
    const date = useSelector((state)=>{return  state.sutki.date;});

    const itogActivePower = useSelector((state)=>{return  state.itog.itogActivePower;});
    const itogReactivePower = useSelector((state)=>{return  state.itog.itogReactivePower;});
    const TimeHH = useSelector((state)=>{return state.itog.TimeHH});
    const StokHH = useSelector((state)=>{return state.itog.StokHH});
    const RashodHH = useSelector((state)=>{return state.itog.RashodHH});
    const Protechki = useSelector((state)=>{return state.itog.Protechki});
    const mainStok = useSelector((state)=>{return state.itog.mainStok});
    const title = useSelector((state)=>{return  state.itog.itogTitleTable;});

    const [summTSN,setSummTSN] = useState(0)

    const itogApi = new fetchItog();

    useEffect(()=>{//при загрузке страницы загружаем с сервера информацию для таблицы
        const normDate = {
            date: normalizeDate(date),
        };
        itogApi.getDataItog(normDate)
        .then((data)=>{
            const dataPower = normalizeItogData(data);
            dispatch({type:"CHANGE_ACTIVE_ITOGARR",payload:dataPower.ActivePower});
            dispatch({type:"CHANGE_REACTIVE_ITOGARR",payload:dataPower.ReactivePower});
            dispatch({type:"CHANGE_RASHODHH",payload:'0'});
            dispatch({type:"CHANGE_STOKHH",payload:'0'});
            dispatch({type:"CHANGE_MAINSTOK",payload:totalStok});
            dispatch({type:"CHANGE_TIMEHH",payload:{gen1:'0',gen2:'0',gen3:'0',gen4:'0',gen5:'0',gen6:'0',gen7:'0',gen8:'0'}}); 
            let summTimesAll=0;
            for(let i=0;i<=7;i++){
                summTimesAll+=Number((summTimes[i]).replace(',','.'));
            };
            let prot =  String((0.0167 * (192 - summTimesAll)).toFixed(2)).replace('.',',');
            dispatch({type:"CHANGE_PROTECHKI",payload:prot});
            setSummTSN(Number((dataPower.ActivePower.T31).replace(',','.'))+Number((dataPower.ActivePower.T32).replace(',','.')))
        });
    },[])

    function holostHod(){//отрабатывает при нажатии на кнопку расчитать на холостом ходу
        const rashodHHForGen= 55 * Math.sqrt(16 / Number(sredniyNapor.replace(",",".")));
        let summStokHH=0;
        for (let i=1;i<=8;i++){
            summStokHH += rashodHHForGen*Number(TimeHH['gen'+i])*3600;
        };
        let rashodAllHH = (summStokHH/86400).toFixed(2);
        let main=(summStokHH/1000000).toFixed(2);
        dispatch({type:"CHANGE_RASHODHH",payload:rashodAllHH.replace('.',',')});
        dispatch({type:"CHANGE_STOKHH",payload:main.replace('.',',')});
        dispatch({type:"CHANGE_MAINSTOK",payload:String(Number(totalStok.replace(",","."))+Number(main)).replace('.',',')}); 
    };

    function closeModal(){//закрытие модалки. Отрабатывает при нажатии Escape в модалном окне и при клике мышкой на сером фоне 
        setModal(false);
    };

    function showModal(e){//отрабатывает при клике на ячейку со значением времени работы генератора на холостом ходу
        setShow(2);
        setModal(true);
        setDataForChange(e.target.innerText);
        setIdd(e.target.id)
    };

    function inputFocus(){//при открытии модального окна фокус автоматически выставляет на поле input в модалке
        setTimeout(()=>{
           inputNewTime.current.focus();
        },10);
    };

    function changeData(e){//обрабатывает нажатие enter и escape в модалке
        if(e.code==='Escape') {
            closeModal();
         };
         if(e.keyCode===13){
            document.getElementById(idd).innerText=dataForChange;
            dispatch({type:"CHANGE_TIMEHH",payload:{
                gen1:document.getElementById('1').innerText, gen2: document.getElementById('2').innerText, 
                gen3:document.getElementById('3').innerText, gen4: document.getElementById('4').innerText, 
                gen5:document.getElementById('5').innerText, gen6: document.getElementById('6').innerText,
                gen7:document.getElementById('7').innerText, gen8: document.getElementById('8').innerText}}); 
            closeModal();
         };   
    };

    function printTable(){ //отрабатывает при нажатии на кнопку печать
        window.print();
    };
    
    return (
        <div className={cl.divMainItogPage}>  
            <div className={[cl.print,cl.divTitleAndTableItog].join(' ')}>
                <span className={cl.spanTitleItog}>{title}</span>
                <table className={cl.tableItogPage}>
                <thead  className={cl.borderBottom}>
                        <tr>
                            <th rowSpan={"2"} className={[cl.borderRight,cl.oneColumn].join(' ')}>{"Номер фидера"}</th>
                            <th rowSpan={"2"} className={[cl.borderRight,cl.oneColumn].join(' ')}>{"Точка учёта"}</th>
                            <th className={[cl.borderRight,cl.oneColumn].join(' ')}>{"Отдача"}</th>
                            <th className={[cl.borderRight,cl.oneColumn].join(' ')}>{"Приём"}</th>
                            <th className={[cl.borderRight,cl.oneColumn].join(' ')}>{"Время работы"}</th>
                            <th className={[cl.borderRight,cl.oneColumn].join(' ')}>{"Сток"}</th>
                            <th className={[cl.borderRight,cl.oneColumn].join(' ')}>{"Т-хх"}</th>
                        </tr>
                        <tr>
                            <td className={cl.borderRight}>{"МВт"}</td>
                            <td className={cl.borderRight}>{"МВт"}</td>
                            <td className={cl.borderRight}>{"мин"}</td>
                            <td className={cl.borderRight}>{"Млн. м3"}</td>
                            <td className={cl.borderRight}>{"час"}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{"1"}</td><td>{"Генератор 1"}</td>
                            <td>{itogActivePower.gen1}</td><td>{itogReactivePower.gen1}</td><td>{summTimes[0]}</td><td>{sumGenStok[0]}</td>
                            <td 
                                className={cl.tdtime}
                                id='1'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen1}
                            </td>
                        </tr>
                        <tr>
                            <td>{"2"}</td><td>{"Генератор 2"}</td>
                            <td>{itogActivePower.gen2}</td><td>{itogReactivePower.gen2}</td><td>{summTimes[1]}</td><td>{sumGenStok[1]}</td>
                            <td 
                                className={cl.tdtime}
                                id='2'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen2}
                            </td>
                        </tr>
                        <tr>
                            <td>{"3"}</td><td>{"Генератор 3"}</td>
                            <td>{itogActivePower.gen3}</td><td>{itogReactivePower.gen3}</td><td>{summTimes[2]}</td><td>{sumGenStok[2]}</td>
                            <td 
                                className={cl.tdtime}
                                id='3'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen3}
                            </td>
                        </tr>
                        <tr>
                            <td>{"4"}</td><td>{"Генератор 4"}</td>
                            <td>{itogActivePower.gen4}</td><td>{itogReactivePower.gen4}</td><td>{summTimes[3]}</td><td>{sumGenStok[3]}</td>
                            <td 
                               className={cl.tdtime}
                                id='4'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen4}
                            </td>
                        </tr>
                        <tr>
                            <td>{"5"}</td><td>{"Генератор 5"}</td>
                            <td>{itogActivePower.gen5}</td><td>{itogReactivePower.gen5}</td><td>{summTimes[4]}</td><td>{sumGenStok[4]}</td>
                            <td 
                                className={cl.tdtime}
                                id='5'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen5}
                            </td>
                        </tr>
                        <tr>
                            <td>{"6"}</td><td>{"Генератор 6"}</td>
                            <td>{itogActivePower.gen6}</td><td>{itogReactivePower.gen6}</td><td>{summTimes[5]}</td><td>{sumGenStok[5]}</td>
                            <td 
                                className={cl.tdtime}
                                id='6'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen6}
                            </td>
                        </tr>
                        <tr>
                            <td>{"7"}</td><td>{"Генератор 7"}</td>
                            <td>{itogActivePower.gen7}</td><td>{itogReactivePower.gen7}</td><td>{summTimes[6]}</td><td>{sumGenStok[6]}</td>
                            <td 
                                className={cl.tdtime}
                                id='7'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen7}
                            </td>
                        </tr>
                        <tr className={cl.borderBottom}>
                            <td>{"8"}</td><td>{"Генератор 8"}</td>
                            <td>{itogActivePower.gen8}</td><td>{itogReactivePower.gen8}</td><td>{summTimes[7]}</td><td>{sumGenStok[7]}</td>
                            <td 
                                className={cl.tdtime}
                                id='8'
                                title={'Нажмите для изменения'} 
                                onClick={(e)=>{
                                    showModal(e);
                                }}
                            >
                                {TimeHH.gen8}
                            </td>
                        </tr>
                        <tr>
                            <td>{"201"}</td><td>{"Вязники"}</td>
                            <td>{itogActivePower.viazn}</td><td className={cl.borderRight}>{itogReactivePower.viazn}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"202"}</td><td>{"Семёнов"}</td>
                            <td>{itogActivePower.semenov}</td><td className={cl.borderRight}>{itogReactivePower.semenov}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"301"}</td><td>{"Малаховская 1"}</td>
                            <td>{itogActivePower.malah_1}</td><td className={cl.borderRight}>{itogReactivePower.malah_1}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"302"}</td><td>{"Левобережная 1"}</td>
                            <td>{itogActivePower.levob_1}</td><td className={cl.borderRight}>{itogReactivePower.levob_1}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"303"}</td><td>{"Сормовская"}</td>
                            <td>{itogActivePower.sormov}</td><td className={cl.borderRight}>{itogReactivePower.sormov}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"304"}</td><td>{"ЦБК"}</td>
                            <td>{itogActivePower.cbk}</td><td className={cl.borderRight}>{itogReactivePower.cbk}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"305"}</td><td>{"ЗМЗ"}</td>
                            <td>{itogActivePower.zmz}</td><td className={cl.borderRight}>{itogReactivePower.zmz}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"306"}</td><td>{"Малаховская 2"}</td>
                            <td>{itogActivePower.malah_2}</td><td className={cl.borderRight}>{itogReactivePower.malah_2}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"307"}</td><td>{"Пучеж 1"}</td>
                            <td>{itogActivePower.puchezh_1}</td><td className={cl.borderRight}>{itogReactivePower.puchezh_1}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"308"}</td><td>{"Западная"}</td>
                            <td>{itogActivePower.zapad}</td><td className={cl.borderRight}>{itogReactivePower.zapad}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"309"}</td><td>{"Дзержинская"}</td>
                            <td>{itogActivePower.dzer}</td><td className={cl.borderRight}>{itogReactivePower.dzer}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>{"310"}</td><td>{"Луч"}</td>
                            <td>{itogActivePower.luch}</td><td className={cl.borderRight}>{itogReactivePower.luch}</td>
                            <td></td><td></td><td></td> 
                        </tr>
                        <tr>
                            <td>{"311"}</td><td>{"Выкл. ОСШ"}</td>
                            <td>{itogActivePower.vikl_OSSH}</td><td className={cl.borderRight}>{itogReactivePower.vikl_OSSH}</td>
                            <td className={cl.borderBottom}></td><td className={cl.borderBottom}></td>
                            <td className={cl.borderBottom}></td>
                        </tr>
                        <tr>
                            <td>{"312"}</td><td>{"Пучеж 2"}</td>
                            <td>{"0"}</td><td className={cl.borderRight}>{"0"}</td>
                            <td>{"Сток выработки"}</td><td>{"(Млн.м3)"}</td><td>{totalStok}</td>
                        </tr>
                        <tr>
                            <td>{"313"}</td><td>{"Левобережная 2"}</td>
                            <td>{itogActivePower.levob_2}</td><td className={cl.borderRight}>{itogReactivePower.levob_2}</td>
                            <td>{"Сток Х.Х."}</td><td>{"(Млн.м3)"}</td><td>{StokHH}</td>
                        </tr>
                        <tr>
                            <td>{"408"}</td><td>{"ТСН-1"}</td>
                            <td>{itogActivePower.T31}</td><td className={cl.borderRight}>{itogReactivePower.T31}</td>
                            <td >{"Общий сток"}</td><td >{"(Млн.м3)"}</td><td>{mainStok}</td>
                        </tr>
                        <tr>
                            <td>{"407"}</td><td>{"ТСН-2"}</td>
                            <td>{itogActivePower.T32}</td><td className={cl.borderRight}>{itogReactivePower.T32}</td>
                            <td>{"Расход"}</td><td>{"(м3/сек.)"}</td><td>{totalRashod}</td>
                        </tr>
                        <tr>
                            <td></td><td>{"Сумма активных мощностей ТСН-1 и ТСН-2"}</td>
                            <td>{summTSN}</td><td className={cl.borderRight}>{}</td>
                            <td></td><td></td><td></td>
                        </tr>
                        <tr >
                            <td className={[cl.borderBottom,cl.borderTop].join(' ')}></td>
                            <td className={[cl.borderBottom,cl.borderTop].join(' ')}>{"Верхний бьеф (м)"}</td>
                            <td className={[cl.borderBottom,cl.borderTop].join(' ')}>{"Нижний бьеф (м)"}</td>
                            <td className={[cl.borderBottom,cl.borderTop,cl.borderRight].join(' ')}>{"Напор (м)"}</td>
                            <td >{"Расход Х.Х. "}</td>
                            <td >{"(м3/сек.)"}</td>
                            <td>{RashodHH}</td>
                        </tr>
                        <tr>
                            <td>{"MIN"}</td><td></td><td></td><td className={cl.borderRight}></td>
                            <td >{"Уд. расход"}</td><td >{"(м3/кВт.)"}</td><td>{udelnRashod}</td>
                        </tr>
                        <tr>
                            <td>{"MAX"}</td><td></td><td></td><td className={cl.borderRight}></td>
                            <td>{"Протечки"}</td><td>{"(м3/сек.)"}</td><td>{Protechki}</td>
                        </tr>
                        <tr>
                            <td>{"Среднее"}</td><td></td><td></td><td className={cl.borderRight}>{sredniyNapor}</td>
                            <td >{"Выработка "}</td><td >{" (МВтч)"}</td><td>{totalPower}</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
           <div className={cl.divWithButtons}> 
                <Button 
                value = {'Расчитать работу на холостом ходу'}
                onClick ={()=>{
                    holostHod();
                }}
                ></Button>
                <Button 
                value = {'Печать'}
                onClick ={()=>{
                    printTable();
                }}
                ></Button>
           </div>
            {  show===2 &&          
            <Modal visible={modal} setVisible={closeModal} onLoad={inputFocus}>
                <div>
                    {`Введите количество проработанных минут для генератора № ${idd}`}
                </div>
                <div style={{'textAlign':'center'}}>
                    <input 
                        type={'text'}
                        ref={inputNewTime} 
                        value={dataForChange}
                        onChange={(e)=>{setDataForChange(e.target.value)}}
                        onKeyDown={(e)=>{
                            changeData(e);
                        }}
                   />
                </div>
             </Modal>
             }


        </div>
    )
};

export default Itog;

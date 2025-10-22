import {useState} from 'react';
import fetchRaport from '../../API/fetchRaport';
import normalizeDate from '../../utils/normalizeDate';
import cl from './Raport.module.css';
import { useSelector,useDispatch } from "react-redux";
import {createUdgArrRaport,createOtklUdgFactArrRaport,createRenderTableData} from '../../utils/pageRaportUtils';
import Modal from '../../components/Modal/Modal';  
import emptyRaport from '../../data/dataRaport'

function Raport (){
    const emptyDataRaport = new emptyRaport()
    const apiRaport = new fetchRaport();
    const dispatch = useDispatch();
    const date = useSelector((state)=>{return  state.raport.dateRaport });
    const raportPbrArr = useSelector((state)=>{return  state.raport.raportPbrArr});
    const raportAIISArr = useSelector((state)=>{return  state.raport.raportAIISArr});
    const naporsRaport = useSelector((state)=>{return  state.raport.naporsRaport});
    const raportUDGArr = useSelector((state)=>{return  state.raport.raportUDGArr});
    const maketRaportData = useSelector((state)=>{return  state.raport.maketRaportData});
    const otklonRAportData = useSelector((state)=>{return  state.raport.otklonRAportData});
    const naprRaportData = useSelector((state)=>{return  state.raport.naprRaportData});
    const uvbRaportData = useSelector((state)=>{return  state.raport.uvbRaportData});
    const unbRaportData = useSelector((state)=>{return  state.raport.unbRaportData});
    const dataTodayNapors = useSelector((state)=>{return  state.raport.dataTodayNapors});
    const titleTableRaport = useSelector((state)=>{return  state.raport.titleRaportTable}); 
    const dataFirstTable = useSelector((state)=>{return  state.raport.dataFirstTable}); 

    const [modalError,setModalError] = useState(false);
    const [modaMessage,setModalMessage] = useState('');
    const [minNagruzka,setMinNagruzka] = useState('');

    let dataForRender = createRenderTableData(uvbRaportData,naprRaportData,unbRaportData,naporsRaport,
                                            raportUDGArr,raportPbrArr,raportAIISArr,otklonRAportData,dataTodayNapors);
       

    function saveInputDataRaport(){
        const dataToServer={
            uvbRaportData,dataTodayNapors,unbRaportData,dataFirstTable,date: normalizeDate(date),
        }
        apiRaport.saveAllDataRaport(dataToServer)
        .then((data)=>{
            console.log(data)
        })

    }

    function closeModal(){
        setModalError(false);
        setModalMessage('');
    };

    function isEnter(e,begin,end){
        if(e.keyCode===13){
           e.target.blur();
          let newId = Number(e.target.id)+1;
          if (newId===end){newId=begin;};
         document.getElementById(String(newId)).focus();
        };
    };

    function downloadRaportData(){
            const normDate = {date: normalizeDate(date),};
            apiRaport.getAllDataRaport(normDate)
            .then((data)=>{
                console.log(data)
                dispatch({type:"CHANGE_RAPORT_PBR_ARR",payload:data.itogPBRarr});
                dispatch({type:"CHANGE_RAPORT_NAPORS_ARR",payload:data.itogArrNapors});
                dispatch({type:"CHANGE_RAPORT_AIIS_ARR",payload:data.arrItogVirab});
                dispatch({type:"CHANGE_RAPORT_MAKET_ARR",payload:data.raportMaketData});

                if(!data.uvbRaport.err){dispatch({type:"CHANGE_RAPORT_UVB_ARR",payload:data.uvbRaport});                    
                }else{dispatch({type:"CHANGE_RAPORT_UVB_ARR",payload:emptyDataRaport.dataUVB})};

                if(!data.firstTable.err){dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:data.firstTable});                    
                }else{dispatch({type:"CHANGE_RAPORT_UVB_ARR",payload:emptyDataRaport.dataFirstTable})};

                if(!data.unbRaport.err){dispatch({type:"CHANGE_RAPORT_UNB_ARR",payload:data.unbRaport});                    
                }else{dispatch({type:"CHANGE_RAPORT_UNB_ARR",payload:emptyDataRaport.dataUNB})};

                dispatch({type:"CHANGE_RAPORT_OTKLON_ARR",payload:createOtklUdgFactArrRaport(createUdgArrRaport(data.itogPBRarr), data.arrItogVirab)});
                dispatch({type:"CHANGE_RAPORT_UDG_ARR",payload:createUdgArrRaport(data.itogPBRarr)});
                setMinNagruzka(Math.min(...(data.arrItogVirab.map((el)=>{
                    return (Number(el[0])/1000).toFixed(0)
                }))));
            });
               dispatch({type:"CHANGE_RAPORT_TITLE_TABLE",payload:`Данные выгружены за ${date}`});
    };
    

    return (
        <div className={cl.mainRaportCont}>
            <span style={{fontSize:"1.8vw",marginTop:"2vh"}}>{'Суточная справка (страница в стадии разработки)'}</span>
            <div className={cl.raportCont}>  
                <table className={cl.raportFirstTable}>
                    <colgroup>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"20vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"white",width:"18vw"}}></col>
                        <col span={"1"} style={{backgroundColor:"lightgreen",width:"7vw"}} ></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th colSpan={"3"}  className={cl.thPbr}>{` О  состоянии  оборудования и режимах работы филиала ПАО "РусГидро" - "Нижегородская ГЭС" 
                                 отключена от ЦКС АРЧМ с 00:58 23.07.25   подключены к СДПМ с 00:12 17.12.19`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{`06:00 ${normalizeDate(date)}`}</td><td colSpan={"2"}></td>
                        </tr>
                        <tr>
                            <td>{`Диспетчерский график (на текущие сутки)`}</td><td></td><td>{`тыс.  кВт*час.`}</td>
                        </tr>
                        <tr>
                            <td>{`Выработка электроэнергии (за прошедшие сутки)`}</td><td>{Number(maketRaportData.sum_virabotka).toFixed(0)}</td><td>{`тыс.  кВт*час.`}</td>
                        </tr>
                        <tr>
                            <td>{`Выработка с начала месяца`}</td><td>{Number(maketRaportData.virabotka_s_nach_mes).toFixed(0)}</td><td>{`тыс.  кВт*час.`}</td>
                        </tr>
                        <tr>
                            <td>{`Среднесуточный расход (суммарный)`}</td><td>{maketRaportData.rashod_sum_n_bief}</td><td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Расход через турбины`}</td><td>{maketRaportData.rashod_turbin}</td><td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Расход через водосливную плотину`}</td><td>{maketRaportData.rashod_vodosbros}</td><td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Боковой приток за прошедшие сутки`}</td><td>{maketRaportData.bokovoi_pritok}</td><td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Среднесуточный расход Рыбинской ГЭС `}</td>
                            <td>
                                <input type='text' 
                                    value={dataFirstTable.rash_rybinsk_ges}
                                    onChange={(e)=>{
                                        dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,rash_rybinsk_ges:e.target.value}});}} 
                                    className={cl.inputInLeftTable}/>
                            </td>
                            <td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Суммарный среднесуточный приток`}</td><td></td><td>{`м³/сек.`}</td>
                        </tr>
                        <tr>
                            <td>{`Уровень верхнего бьефа (на 06:00)`}</td>
                            <td>
                                <input type='text' 
                                    value={dataFirstTable.uvb_06}
                                    onChange={(e)=>{
                                        dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,uvb_06:e.target.value}});}} 
                                    className={cl.inputInLeftTable}/>
                            </td>
                            <td>{`м`}</td>
                        </tr>
                        <tr>
                            <td>{`Уровень нижнего бьефа (на 06:00)`}</td>
                            <td>
                                <input type='text' 
                                    autoComplete={'off'}
                                    value={dataFirstTable.unb_06}
                                    onChange={(e)=>{
                                        dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,unb_06:e.target.value}});}} 
                                    className={cl.inputInLeftTable}/>
                            </td>
                            <td>{`м`}</td>
                        </tr>
                        <tr>
                            <td>{`Минимальная нагрузка (с 6:00 прошлых до 6:00 текущих суток)`}</td><td>{minNagruzka}</td><td>{`МВт`}</td>
                        </tr>
                        <tr>
                            <td>{`Располагаемая мощность`}</td><td></td><td>{`МВт`}</td>
                        </tr>
                        <tr>
                            <td>{`Рабочая мощность  (на текущие сутки)`}</td><td></td><td>{`МВт`}</td>
                        </tr>
                        <tr style={{height:"10vh"}}>
                            <td>{`В ремонте (основное оборудование, оборудование ОРУ-110,220, оборудование 13,8 кВ,обрудование 6 кВ)`}</td>
                            <td colSpan={"2"}>
                                <textarea value={dataFirstTable.remont} onChange={(e)=>{
                                     dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,remont:e.target.value}});
                                }} className={cl.remontTextarea}></textarea>
                            </td> 
                        </tr>
                        <tr>
                            <td>{`Аварии, инциденты, крупные дефекты за прошедшие сутки 
                            (фиксировать все существенные отклонения в том числе и те по которым не отправлялись уведомления в Центр Мониторинга)`}</td>
                            <td colSpan={"2"}>
                                <textarea value={dataFirstTable.incident}onChange={(e)=>{
                                     dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,incident:e.target.value}});
                                }} className={cl.avarijaTextarea}></textarea>
                            </td> 
                        </tr>
                        <tr>
                            <td>{`Начальник смены станции`}</td><td colSpan={"2"}>
                                <input type='text' 
                                    value={dataFirstTable.nss}
                                    onChange={(e)=>{
                                        dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,nss:e.target.value}});}} 
                                    className={cl.inputInLeftTable}/></td>
                        </tr>
                        <tr>
                            <td  colSpan={"3"}>{`Собственный максимум потребления на собственные нужды (КПЭ):`}</td>
                        </tr>
                        <tr>
                            <td>{`норматив на месяц`}</td><td> 
                                <input type='text' 
                                    value={dataFirstTable.sn_normativ_month}
                                    onChange={(e)=>{
                                        dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,sn_normativ_month:e.target.value}});}} 
                                    className={cl.inputInLeftTable}/></td>
                            <td>{`МВт`} </td> 
                        </tr>
                        <tr>
                            <td>{`за сутки`}</td><td>
                                <input type='text' 
                                    value={dataFirstTable.sn_sutki}
                                    onChange={(e)=>{
                                        dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,sn_sutki:e.target.value}});}} 
                                    className={cl.inputInLeftTable}/></td>
                            <td>{`МВт`}</td> 
                        </tr>
                        <tr>
                            <td>{`с начала месяца`}</td><td>
                                <input type='text' 
                                    value={dataFirstTable.sn_month}
                                    onChange={(e)=>{
                                        dispatch({type:"CHANGE_RAPORT_DATA_FIRST_TABLE",payload:{...dataFirstTable,sn_month:e.target.value}});}} 
                                    className={cl.inputInLeftTable}/></td>
                            <td>{`МВт`}</td> 
                        </tr>
                        <tr>
                            <td>{`Отметка ВБ Рыбинской ГЭС`}</td><td></td><td></td> 
                        </tr>
                        <tr>
                            <td>{`Переводы на ОСШ 110 кВ `}</td><td></td><td></td> 
                        </tr>
                        <tr>
                            <td>{`Открытие/Закрытие ВСП`}</td><td></td><td></td> 
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>

                <div>
                    <div className={cl.divWithInputDateAndTitle}>
                        <div className={cl.divWithInputDateTitle}>
                            <label htmlFor="inputRaportDate">Выбирете дату:</label>
                            <input name='inputRaportDate' type="date" value={date} onChange={(e)=>{
                                if((Date.now()-new Date(e.target.value).getTime())<0){
                                    setModalError(true);
                                    setModalMessage('Нельзя выбрать более позднюю дату чем текущая')
                                    setTimeout(()=>{closeModal()},2500)

                                }else{
                                    dispatch({type:"CHANGE_RAPORT_DATE",payload:e.target.value});}}
                                }  
                            />
                            <button onClick={()=>{downloadRaportData()}}>
                                Выгрузить имеющиеся данные
                            </button>
                        </div>
                        <div>
                            {titleTableRaport}
                        </div> 
                    </div>

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

                            {dataForRender.map((str)=>{
                                return (
                                    <tr key={str.numb}>
                                        <td>{str.chas}</td>
                                        <td>
                                            <input type='text'
                                                autoComplete={'off'} 
                                                id={str.idUVB}
                                                onKeyDown={(e)=>isEnter(e,1,26)}
                                                value={str.uvb}
                                                onChange={(e)=>{
                                                    uvbRaportData[str.numb]= String(e.target.value).replace(",",".")
                                                    dispatch({type:"CHANGE_RAPORT_UVB_ARR",payload:{...uvbRaportData}});}} 
                                                className={cl.inputInRightTable}/>
                                        </td>
                                        <td>
                                            <input type='text' 
                                                id={str.idUNB}
                                                autoComplete={'off'}
                                                onKeyDown={(e)=>isEnter(e,26,51)}
                                                value={str.unb}
                                                onChange={(e)=>{
                                                    unbRaportData[str.numb]= String(e.target.value).replace(",",".")
                                                    dispatch({type:"CHANGE_RAPORT_UNB_ARR",payload:{...unbRaportData}});}} 
                                                className={cl.inputInRightTable}/>
                                        </td>
                                        <td>
                                            {str.napor===''?  
                                                 <input 
                                                    id={str.idNAP}
                                                    autoComplete={'off'}
                                                    value={str.todayNapor}
                                                    onChange={(e)=>{
                                                        dataTodayNapors[str.numb]= String(e.target.value).replace(",",".")
                                                        dispatch({type:"CHANGE_RAPORT_TODAY_NAPORS_ARR",payload:{...dataTodayNapors}});}} 
                                                    onKeyDown={(e)=>isEnter(e,51,57)}
                                                    className={cl.inputInRightTable}/>
                                                 :
                                                 str.napor
                                            }
                                        </td>
                                        <td>{str.pbr}</td>
                                        <td>{str.udg}</td>
                                        <td>{str.aiiskue}</td>
                                        <td>
                                            <input type='text' value={str.naprjag}
                                                autoComplete={'off'}
                                                onChange={(e)=>{
                                                    naprRaportData[str.numb]= e.target.value
                                                    dispatch({type:"CHANGE_RAPORT_NAPR_ARR",payload:{...naprRaportData,p1:e.target.value}});}} 
                                                className={cl.inputInRightTable}/>
                                        </td>
                                        <td>{str.otklon}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                    <button onClick={()=>{saveInputDataRaport()}}>
                        Сохранить введённые данные
                    </button>
                </div>
                
            </div>
            <Modal visible={modalError} setVisible={closeModal}>
                {modaMessage}
            </Modal>
        </div>
    )
};

export default Raport;

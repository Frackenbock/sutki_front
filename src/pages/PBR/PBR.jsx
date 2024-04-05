import React,{useEffect} from 'react';
import fetchPbr from '../../API/fetchPbr';
import normalizeDate from '../../utils/normalizeDate';
import cl from './PBR.module.css';
import { useSelector,useDispatch } from "react-redux";

function PBR (){
    const getApiPbr = new fetchPbr();
    const dispatch = useDispatch();
    const date = useSelector((state)=>{return  state.sutki.date });
    const pbrArr = useSelector((state)=>{return  state.pbr.pbrArr });
    
    useEffect(()=>{
        const normDate = {
            date: normalizeDate(date),
         };
        getApiPbr.getDataPbr(normDate)
        .then((data)=>{
            dispatch({type:"CHANGE_PBR_ARR",payload:data});
        })
    },[date]);

    return (
        <div className={cl.pbrCont}>  
            <span style={{fontSize:"1.8vw"}}>{'Данные файлов ПБР'}</span>
            <table className={cl.pbrTable}>
                <colgroup>
                    <col span={"1"} style={{backgroundColor:"lightgreen",width:"15%"}}></col>
                    <col span={"1"} style={{backgroundColor:"white",width:"30%"}}></col>
                    <col span={"1"} style={{backgroundColor:"lightgreen",width:"30%"}} ></col>
                </colgroup>
                <thead>
                    <tr>
                        <th className={cl.thPbr}>Номер часа</th>
                        <th className={cl.thPbr}>Значение мощности по графику ПБР за {normalizeDate(date)}</th>
                        <th className={cl.thPbr}>Файлы ПБР за {normalizeDate(date)}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pbrArr.map((str)=>{
                            if(str[0]!==0){
                                return(
                                    <tr key={str[0]}> 
                                        <td>{`${str[0]}:00`}</td><td>{(Number(str[2])).toFixed(3)}</td><td>{str[3]}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
                <tfoot></tfoot>
            </table>

        </div>


    )
};

export default PBR;

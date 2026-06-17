import React from 'react';
import cl from './TRPBR.module.css'

function TRPBR({...props}){
    let clasBeforeDiff,clasAfterDiff,clasBeforeNeb,clasAfterNeb;
    if(props.flagPowerData===true){
        if (Number(props.data.differenceAiisAndPbrBefore)!==0){
            if (Number(props.data.differenceAiisAndPbrBefore)>0.2||Number(props.data.differenceAiisAndPbrBefore)<-0.4){
                clasBeforeDiff = cl.redCeil;
            };
        }
        if (Number(props.data.differenceAiisAndPbrAfter)!==0){
            if (Number(props.data.differenceAiisAndPbrAfter)>0.2||Number(props.data.differenceAiisAndPbrAfter)<-0.4){
                clasAfterDiff = cl.redCeil;
            };
        }
        if (Number(props.data.nebalanceBefore)!==0){
            if (Math.abs(Number(props.data.nebalanceBefore))>2){
                clasBeforeNeb = cl.redCeil;
            };
        }
        if (Number(props.data.nebalanceAfter)!==0){
            if (Math.abs(Number(props.data.nebalanceAfter))>2){
                clasAfterNeb = cl.redCeil;
            };
        }
    }
  
    return(
        <>
            <tr>
                <td>{props.data.timeBefore}</td>
                <td>{props.data.pbrBefore}</td>
                <td>{props.data.AIISBefore}</td>
                <td className={`${clasBeforeDiff}`}>{props.data.differenceAiisAndPbrBefore}</td>
                <td className={`${clasBeforeNeb}`}>{props.data.nebalanceBefore}</td>
                <td className={cl.middleLine}>{props.data.timeAfter}</td>
                <td>{props.data.pbrAfter}</td>
                <td>{props.data.AIISAfter}</td>
                <td className={`${clasAfterDiff}`}>{props.data.differenceAiisAndPbrAfter}</td>
                <td className={`${clasAfterNeb}`}>{props.data.nebalanceAfter}</td>
            </tr>
        </>

    )
}

export default TRPBR;